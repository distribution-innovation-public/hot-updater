"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkForUpdate = checkForUpdate;
var _reactNative = require("react-native");
var _error = require("./error.js");
var _fetchUpdateInfo = require("./fetchUpdateInfo.js");
var _native = require("./native.js");
async function checkForUpdate(options) {
  if (__DEV__) {
    return null;
  }
  if (!["ios", "android"].includes(_reactNative.Platform.OS)) {
    options.onError?.(new _error.HotUpdaterError("HotUpdater is only supported on iOS and Android"));
    return null;
  }
  const currentAppVersion = (0, _native.getAppVersion)();
  const platform = _reactNative.Platform.OS;
  const currentBundleId = (0, _native.getBundleId)();
  const minBundleId = (0, _native.getMinBundleId)();
  const channel = (0, _native.getChannel)();
  if (!currentAppVersion) {
    options.onError?.(new _error.HotUpdaterError("Failed to get app version"));
    return null;
  }
  return (0, _fetchUpdateInfo.fetchUpdateInfo)(options.source, {
    appVersion: currentAppVersion,
    bundleId: currentBundleId,
    platform,
    minBundleId,
    channel: channel ?? undefined
  }, options.requestHeaders, options.onError, options.requestTimeout).then(updateInfo => {
    if (!updateInfo) {
      return null;
    }
    return {
      ...updateInfo,
      updateBundle: async () => {
        return (0, _native.updateBundle)({
          bundleId: updateInfo.id,
          fileUrl: updateInfo.fileUrl,
          status: updateInfo.status
        });
      }
    };
  });
}
//# sourceMappingURL=checkForUpdate.js.map