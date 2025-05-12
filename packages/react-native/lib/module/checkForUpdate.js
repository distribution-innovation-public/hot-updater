"use strict";

import { Platform } from "react-native";
import { HotUpdaterError } from "./error.js";
import { fetchUpdateInfo } from "./fetchUpdateInfo.js";
import { getAppVersion, getBundleId, getChannel, getMinBundleId, updateBundle } from "./native.js";
export async function checkForUpdate(options) {
  if (__DEV__) {
    return null;
  }
  if (!["ios", "android"].includes(Platform.OS)) {
    options.onError?.(new HotUpdaterError("HotUpdater is only supported on iOS and Android"));
    return null;
  }
  const currentAppVersion = getAppVersion();
  const platform = Platform.OS;
  const currentBundleId = getBundleId();
  const minBundleId = getMinBundleId();
  const channel = getChannel();
  if (!currentAppVersion) {
    options.onError?.(new HotUpdaterError("Failed to get app version"));
    return null;
  }
  return fetchUpdateInfo(options.source, {
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
        return updateBundle({
          bundleId: updateInfo.id,
          fileUrl: updateInfo.fileUrl,
          status: updateInfo.status
        });
      }
    };
  });
}
//# sourceMappingURL=checkForUpdate.js.map