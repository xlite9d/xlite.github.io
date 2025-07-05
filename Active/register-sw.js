"use strict";

const stockSW = "/active/uv-sw.js";
const swAllowedHostnames = ["localhost", "127.0.0.1"];

async function registerSW() {
  if (!("serviceWorker" in navigator)) return;

  const isLocal =
    location.protocol === "https:" ||
    swAllowedHostnames.includes(location.hostname);
  if (!isLocal) return;

  try {
    await navigator.serviceWorker.register(stockSW, {
      scope: __uv$config.prefix,
    });
  } catch (e) {
    console.error("Service worker registration failed:", e);
  }
}
