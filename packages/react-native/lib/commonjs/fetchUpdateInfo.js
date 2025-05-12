"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchUpdateInfo = void 0;
const fetchUpdateInfo = async (source, {
  appVersion,
  bundleId,
  platform,
  minBundleId,
  channel
}, requestHeaders, onError, requestTimeout = 5000) => {
  if (typeof source === "function") {
    return source();
  }
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, requestTimeout);
  try {
    const response = await fetch(source, {
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        "x-app-platform": platform,
        "x-app-version": appVersion,
        "x-bundle-id": bundleId,
        ...(minBundleId ? {
          "x-min-bundle-id": minBundleId
        } : {}),
        ...(channel ? {
          "x-channel": channel
        } : {}),
        ...requestHeaders
      }
    });
    clearTimeout(timeoutId);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      onError?.(new Error("Request timed out"));
      return null;
    }
    onError?.(error);
    return null;
  }
};
exports.fetchUpdateInfo = fetchUpdateInfo;
//# sourceMappingURL=fetchUpdateInfo.js.map