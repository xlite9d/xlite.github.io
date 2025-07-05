"use strict";

const form = document.getElementById("uv-form");
const address = document.getElementById("uv-address");
const searchEngine = document.getElementById("uv-search-engine");
const error = document.getElementById("uv-error");
const errorCode = document.getElementById("uv-error-code");

form.addEventListener("submit", onSubmit);

async function onSubmit(e) {
  e.preventDefault();

  try {
    if (!navigator.serviceWorker.controller)
      await registerSW();
  } catch (err) {
    error.textContent = "Failed to register service worker.";
    errorCode.textContent = String(err);
    return;
  }

  const input = address.value.trim();
  if (!input) return;

  const url = search(input, searchEngine.value);
  location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
}

function autofill(url) {
  address.value = url;
  form.requestSubmit();
}
