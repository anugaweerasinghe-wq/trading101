-- Require more than 550 words of prose in every new or approved lesson.
-- Headings do not count toward the minimum. Draft saving remains flexible.
CREATE OR REPLACE FUNCTION tradehq_private.course_document_valid(doc jsonb, publication boolean DEFAULT false) RETURNS boolean
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
   coalesce(array_length(regexp_split_to_array(trim((SELECT string_agg(value,' ') FROM jsonb_array_elements_text(lesson->'body') WHERE btrim(value) NOT LIKE '## %')),'\s+'),1),0)<551
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

