CREATE TABLE public.api_rate_limits (
  subject TEXT NOT NULL,
  bucket TEXT NOT NULL,
  window_start TIMESTAMPTZ NOT NULL,
  request_count INT NOT NULL DEFAULT 0,
  expires_at TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (subject, bucket, window_start)
);
GRANT ALL ON public.api_rate_limits TO service_role;
ALTER TABLE public.api_rate_limits ENABLE ROW LEVEL SECURITY;
CREATE INDEX api_rate_limits_expires_idx ON public.api_rate_limits (expires_at);

CREATE OR REPLACE FUNCTION public.hit_rate_limit(_subject TEXT, _bucket TEXT, _window_seconds INT, _max INT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  ws TIMESTAMPTZ := to_timestamp(floor(extract(epoch FROM now()) / _window_seconds) * _window_seconds);
  c INT;
BEGIN
  INSERT INTO public.api_rate_limits (subject, bucket, window_start, request_count, expires_at)
  VALUES (_subject, _bucket, ws, 1, ws + make_interval(secs => _window_seconds * 2))
  ON CONFLICT (subject, bucket, window_start)
  DO UPDATE SET request_count = public.api_rate_limits.request_count + 1
  RETURNING request_count INTO c;
  IF random() < 0.01 THEN
    DELETE FROM public.api_rate_limits WHERE expires_at < now();
  END IF;
  RETURN c <= _max;
END;
$$;
REVOKE ALL ON FUNCTION public.hit_rate_limit(TEXT, TEXT, INT, INT) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.hit_rate_limit(TEXT, TEXT, INT, INT) TO service_role;