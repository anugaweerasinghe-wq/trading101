# AdSense remediation checkpoint — 2026-10-04

Branch: `adsense-fixes-20261004`

## Log
- C13 — FIXED-IN-PRODUCTION at merge `da7a40f31a452bc435803eca77dfa0611f25f0c0`: privacy/data-flow disclosures rewritten; contradictory no-ad/no-profiling copy removed where previously confirmed.
- M16 — FIXED-ON-BRANCH / production code deployed at `da7a40f31a452bc435803eca77dfa0611f25f0c0`: optional Amplitude/AdSense scripts are consent-gated. AdSense remains disabled until `[CONFIRM_ADSENSE_PUBLISHER_ID]` and a Google-certified CMP are configured.
- META-01 — FIXED-ON-BRANCH at `66b4703382080525a8d448cf285a0773c83dff2f`: glossary definitions/meta no longer cut mid-sentence.

## Production verification note
- Vercel reports production deployment `dpl_ERYsgBA6esWFTyJmMsGoGBn82BUP` READY for merge `da7a40f31a452bc435803eca77dfa0611f25f0c0`, aliased to both apex and www.
- Direct live-page content fetch is UNVERIFIED in this environment: web fetch returned cache-miss/stale results and raw HTTP access returned no connection. Do not claim rendered live content was inspected.

## Previously confirmed still-present findings to handle in priority order
- Sitewide meta keywords in `index.html`.
- Generated title/label defects in route generation.
- Comparison heading/paragraph mismatch and duplicated summary/verdict presentation.
- Directive glossary practical-tip copy.
- H02 internal Fear & Greed naming.
- H05 unsupported root schema/features.
- H17 unsupported expert-curated/expert-level claims.
- H22 deterministic journal analysis labelled AI.
- H24 stale/inconsistent roadmap claims.
- H34 cross-device persistence overstatement.
- H09 unsupported country-guide audience/regulatory/tax claims.

Pending means not proof of defect; re-open source at edit time and mark ALREADY FIXED if the current branch already contains a correction.

## Checkpoint after items 4–6
- META-02 — FIXED-ON-BRANCH at `cef3487bf15e45e55c0d70e01d1305d444edcccf`: description fitting now prefers any complete sentence instead of emitting a dangling ellipsis fragment.
- META-03 — FIXED-ON-BRANCH at `73eb0aac7b71c9c5096879efc14a6af0425b0017`: sitewide meta keywords removed from `index.html`.
- META-04 — FIXED-ON-BRANCH at `1e2fc641052bf97c89f16125baeb56fddd60ae46`: generated comparison/strategy titles use humanized labels and real strategy names (e.g. MACD), avoiding “Vs”, “Macd Strategy” and “strategy strategy”.
