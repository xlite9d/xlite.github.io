"use strict";

/**
 * Convert input to a URL or search query.
 * @param {string} input
 * @param {string} template Template for a search query.
 * @returns {string} Fully qualified URL
 */
function search(input, template) {
  if (!input) return template.replace("%s", "");

  try {
    return new URL(input).toString();
  } catch {}

  if (!input.includes(" ")) {
    try {
      const url = new URL("http://" + input);
      if (url.hostname.includes(".")) return url.toString();
    } catch {}
  }

  return template.replace("%s", encodeURIComponent(input));
}
