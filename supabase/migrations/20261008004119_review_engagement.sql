-- Public counts and owner replies; individual likes stay private.
ALTER TABLE public.reviews
 ADD COLUMN owner_reply text,
 ADD COLUMN owner_reply_updated_at timestamptz,
 ADD COLUMN deleted_at timestamptz,
 ADD CONSTRAINT review_owner_reply_length CHECK (owner_reply IS NULL OR char_length(owner_reply) BETWEEN 1 AND 2000);
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER POLICY "Public can read visible reviews" ON public.reviews USING (is_visible AND deleted_at IS NULL);
REVOKE INSERT,UPDATE,DELETE,TRUNCATE,REFERENCES,TRIGGER ON public.reviews FROM PUBLIC,anon,authenticated;
GRANT SELECT ON public.reviews TO anon,authenticated;
GRANT SELECT,INSERT,UPDATE,DELETE ON public.reviews TO service_role;
CREATE TABLE public.review_likes (
 review_id uuid NOT NULL REFERENCES public.reviews(id) ON DELETE CASCADE,
 user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
 created_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(review_id,user_id)
);
CREATE INDEX review_likes_user_id_idx ON public.review_likes(user_id);
ALTER TABLE public.review_likes ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.review_likes FROM PUBLIC,anon,authenticated;
GRANT SELECT,INSERT,DELETE ON public.review_likes TO authenticated;
GRANT ALL ON public.review_likes TO service_role;
CREATE POLICY "Read own visible review likes" ON public.review_likes FOR SELECT TO authenticated
 USING ((SELECT auth.uid())=user_id AND EXISTS(SELECT 1 FROM public.reviews r WHERE r.id=review_id AND r.is_visible AND r.deleted_at IS NULL));
CREATE POLICY "Like visible reviews as yourself" ON public.review_likes FOR INSERT TO authenticated
 WITH CHECK ((SELECT auth.uid())=user_id AND EXISTS(SELECT 1 FROM public.reviews r WHERE r.id=review_id AND r.is_visible AND r.deleted_at IS NULL));
CREATE POLICY "Remove your own review likes" ON public.review_likes FOR DELETE TO authenticated USING ((SELECT auth.uid())=user_id);
CREATE FUNCTION tradehq_private.review_engagement(p_review_ids uuid[])
RETURNS TABLE(review_id uuid,like_count bigint,liked_by_me boolean)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path='' AS $$
BEGIN
 IF p_review_ids IS NOT NULL AND cardinality(p_review_ids)>100 THEN RAISE EXCEPTION 'At most 100 review IDs' USING ERRCODE='22023'; END IF;
 RETURN QUERY WITH visible AS (
 SELECT r.id FROM public.reviews r WHERE r.is_visible AND r.deleted_at IS NULL
 AND (p_review_ids IS NULL OR r.id=ANY(p_review_ids))
 ORDER BY r.is_featured DESC,r.created_at DESC,r.id LIMIT 100
 ) SELECT v.id,count(l.user_id),coalesce(bool_or(l.user_id=auth.uid()),false)
 FROM visible v LEFT JOIN public.review_likes l ON l.review_id=v.id GROUP BY v.id;
END; $$;
REVOKE ALL ON FUNCTION tradehq_private.review_engagement(uuid[]) FROM PUBLIC;
GRANT USAGE ON SCHEMA tradehq_private TO anon,authenticated;
GRANT EXECUTE ON FUNCTION tradehq_private.review_engagement(uuid[]) TO anon,authenticated;
CREATE FUNCTION public.get_review_engagement(p_review_ids uuid[] DEFAULT NULL)
RETURNS TABLE(review_id uuid,like_count bigint,liked_by_me boolean)
LANGUAGE sql STABLE SECURITY INVOKER SET search_path='' AS $$ SELECT * FROM tradehq_private.review_engagement(p_review_ids); $$;
REVOKE ALL ON FUNCTION public.get_review_engagement(uuid[]) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_review_engagement(uuid[]) TO anon,authenticated;
CREATE FUNCTION public.set_review_like(p_review_id uuid,p_liked boolean)
RETURNS TABLE(review_id uuid,like_count bigint,liked_by_me boolean)
LANGUAGE plpgsql SECURITY INVOKER SET search_path='' AS $$
BEGIN
 IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Sign in to like reviews' USING ERRCODE='42501'; END IF;
 IF p_review_id IS NULL OR p_liked IS NULL THEN RAISE EXCEPTION 'Review and like state are required' USING ERRCODE='22023'; END IF;
 IF NOT EXISTS(SELECT 1 FROM public.reviews r WHERE r.id=p_review_id AND r.is_visible AND r.deleted_at IS NULL) THEN RAISE EXCEPTION 'Review is unavailable' USING ERRCODE='22023'; END IF;
 IF p_liked THEN INSERT INTO public.review_likes(review_id,user_id) VALUES(p_review_id,auth.uid()) ON CONFLICT DO NOTHING;
 ELSE DELETE FROM public.review_likes l WHERE l.review_id=p_review_id AND l.user_id=auth.uid(); END IF;
 RETURN QUERY SELECT * FROM public.get_review_engagement(ARRAY[p_review_id]);
END; $$;
REVOKE ALL ON FUNCTION public.set_review_like(uuid,boolean) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.set_review_like(uuid,boolean) TO authenticated;
