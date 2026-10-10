# PR #51 reconciliation — 10 October 2026

Reviewed against main `27bf154772067ed5cfc31031adb571f942244dfb` and PR #51 head `9c13f2e2f4611676406abf74f6488f2cdc10ef6d`. The old PR conflicts with later work and must not replace current files wholesale.

| Original scope | Current outcome |
| --- | --- |
| `coursesData.ts`: spreads, DXY and cognitive biases | Later main lessons already correct the claims, include fuller worksheets and sources, and distinguish conceptual exercises from simulator capabilities. Retained. |
| `lessonData.ts`: order mechanics | Main already explains price/execution trade-offs and market-order-only simulation. Retained. |
| `learnArticles.ts`: strategy marketing and ETF assumptions | Main already uses virtual-money language and qualifies practice outcomes. Retained. |
| `Index.tsx`, `LearnTradingGuide.tsx`, `TradeAsset.tsx` | Main already corrected the specified marketing and structured-data claims. Retained. |
| `assetContent.ts`: metadata and previously corrected FAQs | Current main corrections retained. |
| `assetContent.ts`: remaining FAQs | Removed permanent volatility rankings, guaranteed news-pattern implications and unsupported beginner suitability. Clarified spot-only SPY practice and kept sourced real-market research separate from simulated charts. |
| `dailyChallenge.ts`: stop question | Main answer already explains the market-order trigger, slippage and conceptual-only support. Clarified the question to match that answer. Scoring unchanged. |

Validation: existing course-workflow and Daily Practice tests passed. Vite build, prerendering, sitemap and SEO verification, Cloudflare preparation, staging/production SEO tests and course-root Function tests passed locally. The sandbox blocks the `tsx` CLI IPC socket, so the same build stages were invoked with `node --import tsx`; GitHub must still run the normal npm command.

Release remains conditional on current-head GitHub validation, external Cloudflare Pages preview, reviewed diff and production verification. A separate failed Worker check is not evidence that the successful Pages release failed; its live role remains unverified.

No simulator calculations, account data, auth, permissions, dependencies, advertising activation or provider settings changed. No model requests or paid services introduced. AdSense approval and Search Console indexing are not established by these source/build checks. Audience/age treatment remains an owner policy decision before ads activation.
