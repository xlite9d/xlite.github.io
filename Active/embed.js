"use strict";

(async () => {
  const url = new URLSearchParams(location.search).get("url");
  if (!url) return console.error("❌ No URL provided");

  try {
    const destination = new URL(url).toString(); // Validates and normalizes
    await registerSW();
    location.href = __uv$config.prefix + __uv$config.encodeUrl(destination);
  } catch (err) {
    console.error("❌ Invalid URL or error occurred:", err);
  }
})();
