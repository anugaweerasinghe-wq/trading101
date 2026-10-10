/**
 * Gemini free-tier-eligible model selection for TradeHQ scheduled workflows.
 * Quota / auth / billing errors are fatal; fallback is ONLY for unavailable (404) models.
 * Models in this allowlist are currently documented with a free tier, but Google controls
 * whether the key's project is actually billed; configure a non-billed/free project.
 */
export const FREE_FLASH_LITE_MODELS = Object.freeze([
  "gemini-3.5-flash-lite",
  "gemini-3.1-flash-lite",
]);

export async function requestGeminiJson({
  apiKey, prompt, preferredModel = FREE_FLASH_LITE_MODELS[0],
  temperature = 0.25, maxOutputTokens = 4096, timeoutMs = 45000,
  fetchImpl = globalThis.fetch,
}) {
  if (!apiKey) throw Error("GEMINI_API_KEY is not configured.");
  if (!FREE_FLASH_LITE_MODELS.includes(preferredModel)) {
    throw Error("Requested Gemini model is not in TradeHQ's free-tier Flash-Lite allowlist: " + String(preferredModel).slice(0, 80));
  }
  const available = [preferredModel, ...FREE_FLASH_LITE_MODELS.filter(model => model !== preferredModel)];
  const unavailable = [];
  for (const model of available) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    let response;
    try {
      response = await fetchImpl(
        "https://generativelanguage.googleapis.com/v1beta/models/" + encodeURIComponent(model) + ":generateContent",
        {
          method: "POST", signal: controller.signal,
          headers: { "x-goog-api-key": apiKey, "content-type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json", temperature, maxOutputTokens },
          }),
        },
      );
    } catch (error) {
      if (error?.name === "AbortError") throw Error("Gemini request timed out for " + model + ". No other model was charged.");
      throw Error("Gemini request failed for " + model + ": " + (error?.message || "Network error"));
    } finally {
      clearTimeout(timer);
    }
    if (response.status === 404) {
      unavailable.push(model);
      console.warn("Gemini model unavailable for this project: " + model + "; checking allowed Flash-Lite fallback.");
      continue;
    }
    if (!response.ok) {
      if (response.status === 429) throw Error("Gemini free-tier quota/rate limit (429) for " + model + ". No fallback or paid call.");
      if (response.status === 403 || response.status === 401) throw Error("Gemini key/project authorization failed (" + response.status + ") for " + model + ". No fallback.");
      throw Error("Gemini HTTP " + response.status + " for " + model + ". Workflow stopped safely.");
    }
    const payload = await response.json();
    const candidate = payload.candidates?.[0];
    if (candidate?.finishReason === "MAX_TOKENS") throw Error("Gemini hit output token limit for " + model + "; no changes were published.");
    const raw = candidate?.content?.parts?.map(part => part.text || "").join("").trim() || "";
    if (!raw) throw Error("Gemini returned empty JSON for " + model + ".");
    let value;
    try { value = JSON.parse(raw); } catch { throw Error("Gemini returned invalid JSON for " + model + ". No changes were published."); }
    console.log("Gemini response generated using " + model + ".");
    return { value, model };
  }
  throw Error("Gemini HTTP 404 for all approved Flash-Lite models (" + unavailable.join(", ") +
    "). Check model availability in the same Google AI Studio project as this key.");
}
