import assert from "node:assert/strict";
import { requestGeminiJson, FREE_FLASH_LITE_MODELS } from "./gemini-free-models.mjs";

const testKey = "local-mock-key-not-a-real-secret";
const response = (status, value = {}) => ({
  status, ok: status >= 200 && status < 300,
  json: async () => value,
});
const success = response(200, {
  candidates: [{ content: { parts: [{ text: JSON.stringify({ ideas: [{ title: "One" }, { title: "Two" }] }) }] }, finishReason: "STOP" }],
});
assert.deepEqual(FREE_FLASH_LITE_MODELS, ["gemini-3.5-flash-lite", "gemini-3.1-flash-lite"]);
{
  const calls = [];
  const result = await requestGeminiJson({
    apiKey: testKey, prompt: "Mock", fetchImpl: async (url, options) => {
      calls.push({ url, options });
      return calls.length === 1 ? response(404) : success;
    },
  });
  assert.equal(result.model, "gemini-3.1-flash-lite");
  assert.equal(result.value.ideas.length, 2);
  assert.equal(calls.length, 2);
  assert.ok(calls[0].url.includes("gemini-3.5-flash-lite"));
  assert.ok(calls[1].url.includes("gemini-3.1-flash-lite"));
  assert.equal(calls[0].options.headers["x-goog-api-key"], testKey);
  assert.ok(!calls[0].url.includes(testKey), "never put API keys in Gemini request URLs");
}
for (const status of [401, 403, 429, 500]) {
  let count = 0;
  await assert.rejects(requestGeminiJson({
    apiKey: testKey, prompt: "Mock", fetchImpl: async () => { count++; return response(status); },
  }), new RegExp(String(status)));
  assert.equal(count, 1, "do not fall back after auth/quota/server errors");
}
{
  let count = 0;
  await assert.rejects(requestGeminiJson({
    apiKey: testKey, prompt: "Mock", fetchImpl: async () => { count++; return response(404); },
  }), /404 for all approved/);
  assert.equal(count, FREE_FLASH_LITE_MODELS.length);
}
{
  let count = 0;
  await assert.rejects(requestGeminiJson({
    apiKey: testKey, prompt: "Mock", preferredModel: "gemini-3.8-pro",
    fetchImpl: async () => { count++; return success; },
  }), /not in TradeHQ/);
  assert.equal(count, 0, "never invoke a model not in the allowlist");
}
console.log("Gemini free-tier model fallback, request safety and no-paid-fallback tests passed.");
