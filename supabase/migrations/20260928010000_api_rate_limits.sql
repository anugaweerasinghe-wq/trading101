create table if not exists public.api_rate_limit_windows (
  scope text not null,
  subject_hash text not null,
  window_start timestamptz not null,
  request_count integer not null default 0 check (request_count >= 0),
  updated_at timestamptz not null default now(),
  primary key (scope, subject_hash, window_start)
);

alter table public.api_rate_limit_windows enable row level security;

revoke all on public.api_rate_limit_windows from anon, authenticated;
grant select, insert, update, delete on public.api_rate_limit_windows to service_role;

create or replace function public.consume_api_rate_limit(
  p_scope text,
  p_subject_hash text,
  p_window_seconds integer,
  p_limit integer
)
returns table (
  is_allowed boolean,
  remaining_requests integer,
  retry_after_seconds integer
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_now timestamptz := now();
  v_window_start timestamptz;
  v_count integer;
  v_retry integer;
begin
  if p_scope is null or length(p_scope) = 0 or length(p_scope) > 80 then
    raise exception 'invalid rate-limit scope';
  end if;
  if p_subject_hash is null or length(p_subject_hash) < 32 or length(p_subject_hash) > 128 then
    raise exception 'invalid rate-limit subject';
  end if;
  if p_window_seconds < 1 or p_window_seconds > 86400 then
    raise exception 'invalid rate-limit window';
  end if;
  if p_limit < 1 or p_limit > 100000 then
    raise exception 'invalid rate-limit limit';
  end if;

  v_window_start := to_timestamp(
    floor(extract(epoch from v_now) / p_window_seconds) * p_window_seconds
  );

  insert into public.api_rate_limit_windows (
    scope, subject_hash, window_start, request_count, updated_at
  )
  values (
    p_scope, p_subject_hash, v_window_start, 1, v_now
  )
  on conflict (scope, subject_hash, window_start)
  do update set
    request_count = public.api_rate_limit_windows.request_count + 1,
    updated_at = excluded.updated_at
  returning request_count into v_count;

  v_retry := greatest(
    1,
    ceil(
      extract(
        epoch from (
          v_window_start + make_interval(secs => p_window_seconds) - v_now
        )
      )
    )::integer
  );

  return query
  select
    v_count <= p_limit,
    greatest(p_limit - v_count, 0),
    v_retry;
end;
$$;

revoke all on function public.consume_api_rate_limit(text, text, integer, integer) from public, anon, authenticated;
grant execute on function public.consume_api_rate_limit(text, text, integer, integer) to service_role;
