# Permission-based weekly newsletter feasibility — 10 October 2026

Conditional $0 feasibility exists for a small list, but the current implementation is not activation-ready. No account created, sender/domain configured, schedule added or message sent.

## Actual current state

- Production `subscribers` contains two rows. Only the aggregate count was read; no email addresses exported. Columns are id, email, subscribed_at and source, without confirmation/unsubscribe or delivery/deduplication state. A stored email address alone is not proof of permission for a new campaign.
- `NewsletterSignup` currently renders a contact card, not an opt-in form.
- The old `send-newsletter` source is not deployed and has no mailing cron. It calls a Lovable connector gateway using two server secrets and an onboarding sender; gateway billing, sender eligibility and provider quota were not verified.
- Its template contains stale asset-count, institutional and risk-free wording, no unsubscribe link/headers, and no campaign delivery ledger. Retrying can send duplicate messages. Do not activate this source as-is.

## Provider feasibility, not account verification

The [Resend pricing page](https://resend.com/pricing), checked today, lists a $0 transactional plan with 3,000 emails/month and 100/day. Its FAQ allows newsletters through the emails API when recipients consent and each message has a visible unsubscribe link plus List-Unsubscribe and List-Unsubscribe-Post headers. Broadcasts have different contact-based limits and built-in unsubscribe handling; do not treat the two quotas as interchangeable. Actual account eligibility, remaining quota, sending domain and no-card/no-overage configuration remain unverified. No upgrade, pay-as-you-go or paid add-on should be enabled.

For two confirmed recipients, four weekly editions would be eight recipient deliveries before confirmations, tests or retries. This is arithmetic for the observed list size, not authorization to send to those two legacy rows or proof of provider access. Stop rather than upgrade when a configured free quota is reached.

## Concrete implementation requiring owner approval

1. Approve provider/domain choice and the consent, retention and unsubscribe data design. These require schema/consent and possibly DNS changes outside the autonomous low-risk boundary.
2. Restore explicit newsletter opt-in with a specific frequency and purpose. Confirm permission rather than importing old rows automatically. Store confirmation/version evidence and a revocable preference; do not expose addresses publicly.
3. Provide signed opaque unsubscribe tokens, a public visible unsubscribe page and the provider-required one-click headers. Do not put raw email addresses in unsubscribe URLs. Suppress opted-out, bounced and complaint recipients before sending.
4. Add an administrator-reviewed weekly campaign snapshot with links to actual published lessons/courses. No invented market narrative, returns, testimonials or live prices. Drafting can be deterministic from published content without an extra model request.
5. Record a unique campaign/recipient delivery key. Bound the daily/monthly send budget, record provider message IDs, retry only known recoverable failures and prevent concurrent runs from duplicating delivery. Treat ambiguous provider outcomes as investigation cases.
6. Report aggregate delivered/failed/deferred counts privately in the admin desk, avoiding email addresses in public GitHub issues. Preserve failed campaigns for review.
7. Test opt-in, unsubscribe-before-send, duplicate scheduling, concurrent claims, provider 429/timeouts, quota exhaustion and privacy before a single owner-approved test delivery. Add a weekly schedule only after the account and full permission/delivery flow are independently verified.

Supabase's actual cycle usage is also a dependency: today's log aggregates include 8,083 live-market-data HTTP 429 responses. The connected organization reports a free plan, but the usage dashboard requires sign-in. Do not assume database headroom implies function/egress headroom. Leave bulk mailing inactive until these evidence and approval gates are satisfied.
