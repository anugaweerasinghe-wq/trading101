-- Drafts and private generation settings cannot be read or changed through browser database access.
CREATE TABLE public.course_drafts (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 status text NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','published','rejected')),
 revision integer NOT NULL DEFAULT 1, published_revision integer NOT NULL DEFAULT 0,
 document jsonb NOT NULL, research jsonb NOT NULL DEFAULT '{}'::jsonb,
 generation_period text, generation_slot integer CHECK(generation_slot IN (1,2)),
 created_at timestamptz NOT NULL DEFAULT clock_timestamp(), updated_at timestamptz NOT NULL DEFAULT clock_timestamp(),
 reviewed_at timestamptz, UNIQUE(generation_period,generation_slot),
 CHECK(octet_length(document::text)<=250000), CHECK(octet_length(research::text)<=40000)
);
ALTER TABLE public.course_drafts ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.course_drafts FROM PUBLIC,anon,authenticated;
GRANT ALL ON public.course_drafts TO service_role;

CREATE TABLE public.published_courses (
 slug text PRIMARY KEY, draft_id uuid NOT NULL UNIQUE REFERENCES public.course_drafts(id),
 document jsonb NOT NULL, revision integer NOT NULL,
 published_at timestamptz NOT NULL DEFAULT clock_timestamp()
);
ALTER TABLE public.published_courses ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.published_courses FROM PUBLIC,anon,authenticated;
GRANT SELECT ON public.published_courses TO anon,authenticated;
GRANT ALL ON public.published_courses TO service_role;
CREATE POLICY "Only approved course snapshots are publicly readable"
 ON public.published_courses FOR SELECT TO anon,authenticated USING(true);

-- Listings do not download every lesson body and quiz.
CREATE FUNCTION public.get_published_course_catalog() RETURNS SETOF jsonb
LANGUAGE sql STABLE SECURITY INVOKER SET search_path='' AS $$
 SELECT p.document-'lessons'||jsonb_build_object('lessons',coalesce((
 SELECT jsonb_agg(jsonb_build_object('slug',l->>'slug','title',l->>'title','summary',l->>'summary',
 'readingMinutes',(l->>'readingMinutes')::integer,'body','[]'::jsonb,'keyTakeaways','[]'::jsonb,
 'sources','[]'::jsonb,'quiz','[]'::jsonb)) FROM jsonb_array_elements(p.document->'lessons') l),'[]'::jsonb))
 FROM public.published_courses p ORDER BY p.published_at DESC LIMIT 200;
$$;
REVOKE ALL ON FUNCTION public.get_published_course_catalog() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_published_course_catalog() TO anon,authenticated,service_role;

CREATE FUNCTION tradehq_private.course_document_valid(doc jsonb, publication boolean DEFAULT false) RETURNS boolean
LANGUAGE plpgsql IMMUTABLE SET search_path='' AS $$
DECLARE lesson jsonb; q jsonb; source jsonb; para jsonb; field text; slugs text[]:='{}';
BEGIN
 IF jsonb_typeof(doc) IS DISTINCT FROM 'object' OR octet_length(doc::text)>250000
 OR coalesce(doc->>'slug','') !~ '^[a-z0-9]+(-[a-z0-9]+)*$' OR length(doc->>'slug')>80
 OR doc->>'slug' IN ('options-trading-fundamentals','futures-and-derivatives','macro-reading-for-traders','trading-psychology-mastery')
 OR coalesce(doc->>'level','') NOT IN ('Beginner','Intermediate','Advanced')
 OR coalesce(doc->>'hero','') !~ '^/[a-zA-Z0-9_./-]+[.](png|jpg|jpeg|webp|svg)$' THEN RETURN false; END IF;
 FOREACH field IN ARRAY ARRAY['title','tagline','description','prerequisites','progression','notFor'] LOOP
  IF jsonb_typeof(doc->field) IS DISTINCT FROM 'string' OR length(doc->>field)>5000
  OR (publication AND length(trim(doc->>field))=0) THEN RETURN false; END IF;
 END LOOP;
 IF jsonb_typeof(doc->'outcomes') IS DISTINCT FROM 'array'
 OR jsonb_typeof(doc->'badge') IS DISTINCT FROM 'object'
 OR jsonb_typeof(doc#>'{badge,name}') IS DISTINCT FROM 'string'
 OR jsonb_typeof(doc#>'{badge,description}') IS DISTINCT FROM 'string'
 OR jsonb_typeof(doc->'lessons') IS DISTINCT FROM 'array' THEN RETURN false; END IF;
 IF jsonb_array_length(doc->'lessons')>12 OR (publication AND (jsonb_array_length(doc->'lessons')<3 OR jsonb_array_length(doc->'outcomes')<3)) THEN RETURN false; END IF;
 FOR lesson IN SELECT value FROM jsonb_array_elements(doc->'lessons') LOOP
  IF jsonb_typeof(lesson) IS DISTINCT FROM 'object'
  OR coalesce(lesson->>'slug','') !~ '^[a-z0-9]+(-[a-z0-9]+)*$' OR length(lesson->>'slug')>80
  OR lesson->>'slug'=ANY(slugs)
  OR jsonb_typeof(lesson->'title') IS DISTINCT FROM 'string'
  OR jsonb_typeof(lesson->'summary') IS DISTINCT FROM 'string'
  OR coalesce(lesson->>'readingMinutes','') !~ '^[0-9]+$'
  OR (lesson->>'readingMinutes')::integer NOT BETWEEN 1 AND 90 THEN RETURN false; END IF;
  slugs:=array_append(slugs,lesson->>'slug');
  IF jsonb_typeof(lesson->'body') IS DISTINCT FROM 'array'
  OR jsonb_typeof(lesson->'keyTakeaways') IS DISTINCT FROM 'array'
  OR jsonb_typeof(lesson->'sources') IS DISTINCT FROM 'array'
  OR jsonb_typeof(lesson->'quiz') IS DISTINCT FROM 'array' THEN RETURN false; END IF;
  IF jsonb_array_length(lesson->'body')>100 OR jsonb_array_length(lesson->'sources')>15 OR jsonb_array_length(lesson->'quiz')>12 THEN RETURN false; END IF;
  FOR para IN SELECT value FROM jsonb_array_elements(lesson->'body') LOOP
   IF jsonb_typeof(para) IS DISTINCT FROM 'string' OR length(para#>>'{}')>12000 THEN RETURN false; END IF;
  END LOOP;
  IF publication AND (
   coalesce(array_length(regexp_split_to_array(trim((SELECT string_agg(value,' ') FROM jsonb_array_elements_text(lesson->'body'))),'\s+'),1),0)<500
   OR jsonb_array_length(lesson->'keyTakeaways')<3 OR jsonb_array_length(lesson->'sources')<2
   OR jsonb_array_length(lesson->'quiz')<3) THEN RETURN false; END IF;
  FOR source IN SELECT value FROM jsonb_array_elements(lesson->'sources') LOOP
   IF jsonb_typeof(source->'label') IS DISTINCT FROM 'string' OR coalesce(source->>'url','') !~ '^https://[^ /@]+/' THEN RETURN false; END IF;
  END LOOP;
  FOR q IN SELECT value FROM jsonb_array_elements(lesson->'quiz') LOOP
   IF jsonb_typeof(q->'question') IS DISTINCT FROM 'string' OR jsonb_typeof(q->'explanation') IS DISTINCT FROM 'string'
   OR jsonb_typeof(q->'options') IS DISTINCT FROM 'array' THEN RETURN false; END IF;
   IF jsonb_array_length(q->'options') NOT BETWEEN 2 AND 6 OR coalesce(q->>'correctAnswer','') !~ '^[0-9]+$'
   OR (q->>'correctAnswer')::integer>=jsonb_array_length(q->'options') THEN RETURN false; END IF;
  END LOOP;
 END LOOP;
 RETURN true;
EXCEPTION WHEN OTHERS THEN RETURN false;
END; $$;
REVOKE ALL ON FUNCTION tradehq_private.course_document_valid(jsonb,boolean) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION tradehq_private.course_document_valid(jsonb,boolean) TO service_role;

CREATE FUNCTION tradehq_private.save_course(p_id uuid,p_revision integer,p_document jsonb) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
DECLARE row public.course_drafts; live public.published_courses;
BEGIN
 IF NOT tradehq_private.course_document_valid(p_document) THEN RAISE EXCEPTION 'Course is incomplete or invalid'; END IF;
 IF p_id IS NULL THEN
  INSERT INTO public.course_drafts(document) VALUES(p_document-'editorial') RETURNING * INTO row;
 ELSE
  SELECT * INTO row FROM public.course_drafts WHERE id=p_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Course not found'; END IF;
  IF row.revision IS DISTINCT FROM p_revision THEN RAISE EXCEPTION 'Course changed. Reload before saving.'; END IF;
  SELECT * INTO live FROM public.published_courses WHERE draft_id=p_id;
  IF FOUND THEN
   IF live.slug IS DISTINCT FROM p_document->>'slug' THEN RAISE EXCEPTION 'Course URL cannot change after publication'; END IF;
   IF EXISTS(SELECT 1 FROM jsonb_array_elements(live.document->'lessons') old
    WHERE NOT EXISTS(SELECT 1 FROM jsonb_array_elements(p_document->'lessons') new WHERE new->>'slug'=old->>'slug'))
    THEN RAISE EXCEPTION 'Published lesson URLs must be preserved'; END IF;
  END IF;
  UPDATE public.course_drafts SET document=p_document-'editorial',revision=revision+1,status='draft',updated_at=clock_timestamp()
   WHERE id=p_id RETURNING * INTO row;
 END IF;
 RETURN to_jsonb(row);
END; $$;

CREATE FUNCTION tradehq_private.publish_course(p_id uuid,p_revision integer,p_reviewer text) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
DECLARE row public.course_drafts; doc jsonb; reviewed timestamptz:=clock_timestamp();
BEGIN
 SELECT * INTO row FROM public.course_drafts WHERE id=p_id FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Course not found'; END IF;
 IF row.revision IS DISTINCT FROM p_revision THEN RAISE EXCEPTION 'Course changed. Reload before approval.'; END IF;
 IF row.status='rejected' OR length(trim(p_reviewer)) NOT BETWEEN 2 AND 80
 OR NOT tradehq_private.course_document_valid(row.document,true) THEN RAISE EXCEPTION 'Course is incomplete. Check lessons, sources and quizzes.'; END IF;
 doc:=row.document||jsonb_build_object('editorial',jsonb_build_object('assisted',true,'reviewer',p_reviewer,'reviewedAt',reviewed));
 INSERT INTO public.published_courses(slug,draft_id,document,revision,published_at)
 VALUES(doc->>'slug',row.id,doc,row.revision,reviewed)
 ON CONFLICT(slug) DO UPDATE SET document=excluded.document,revision=excluded.revision,published_at=excluded.published_at
 WHERE published_courses.draft_id=excluded.draft_id;
 IF NOT FOUND THEN RAISE EXCEPTION 'Course URL is already in use'; END IF;
 UPDATE public.course_drafts SET status='published',published_revision=revision,reviewed_at=reviewed,updated_at=reviewed WHERE id=p_id;
 RETURN jsonb_build_object('ok',true,'slug',doc->>'slug');
END; $$;

CREATE FUNCTION tradehq_private.reject_course(p_id uuid,p_revision integer) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
BEGIN
 UPDATE public.course_drafts SET status='rejected',revision=revision+1,updated_at=clock_timestamp()
 WHERE id=p_id AND revision=p_revision;
 IF NOT FOUND THEN RAISE EXCEPTION 'Course changed. Reload before rejecting.'; END IF;
 RETURN jsonb_build_object('ok',true);
END; $$;

CREATE FUNCTION tradehq_private.ingest_course(p_period text,p_slot integer,p_document jsonb,p_research jsonb) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
DECLARE draft uuid;
BEGIN
 IF p_period !~ '^[0-9]{4}-(0[1-9]|1[0-2])$' OR p_slot NOT IN (1,2)
 OR NOT tradehq_private.course_document_valid(p_document,true) THEN RAISE EXCEPTION 'Course is incomplete or invalid'; END IF;
 INSERT INTO public.course_drafts(document,research,generation_period,generation_slot)
 VALUES(p_document-'editorial',coalesce(p_research,'{}'::jsonb),p_period,p_slot)
 ON CONFLICT(generation_period,generation_slot) DO NOTHING RETURNING id INTO draft;
 IF draft IS NULL THEN SELECT id INTO draft FROM public.course_drafts WHERE generation_period=p_period AND generation_slot=p_slot; END IF;
 RETURN draft;
END; $$;
REVOKE ALL ON FUNCTION tradehq_private.save_course(uuid,integer,jsonb),tradehq_private.publish_course(uuid,integer,text),
 tradehq_private.reject_course(uuid,integer),tradehq_private.ingest_course(text,integer,jsonb,jsonb) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION tradehq_private.save_course(uuid,integer,jsonb),tradehq_private.publish_course(uuid,integer,text),
 tradehq_private.reject_course(uuid,integer),tradehq_private.ingest_course(text,integer,jsonb,jsonb) TO service_role;

CREATE FUNCTION public.save_course_draft(p_id uuid,p_revision integer,p_document jsonb) RETURNS jsonb
 LANGUAGE sql SECURITY INVOKER SET search_path='' AS $$ SELECT tradehq_private.save_course(p_id,p_revision,p_document); $$;
CREATE FUNCTION public.publish_course_draft(p_id uuid,p_revision integer,p_reviewer text) RETURNS jsonb
 LANGUAGE sql SECURITY INVOKER SET search_path='' AS $$ SELECT tradehq_private.publish_course(p_id,p_revision,p_reviewer); $$;
CREATE FUNCTION public.reject_course_draft(p_id uuid,p_revision integer) RETURNS jsonb
 LANGUAGE sql SECURITY INVOKER SET search_path='' AS $$ SELECT tradehq_private.reject_course(p_id,p_revision); $$;
CREATE FUNCTION public.ingest_course_draft(p_period text,p_slot integer,p_document jsonb,p_research jsonb) RETURNS uuid
 LANGUAGE sql SECURITY INVOKER SET search_path='' AS $$ SELECT tradehq_private.ingest_course(p_period,p_slot,p_document,p_research); $$;
REVOKE ALL ON FUNCTION public.save_course_draft(uuid,integer,jsonb),public.publish_course_draft(uuid,integer,text),
 public.reject_course_draft(uuid,integer),public.ingest_course_draft(text,integer,jsonb,jsonb) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.save_course_draft(uuid,integer,jsonb),public.publish_course_draft(uuid,integer,text),
 public.reject_course_draft(uuid,integer),public.ingest_course_draft(text,integer,jsonb,jsonb) TO service_role;
