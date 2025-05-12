"use strict";

import { NativeEventEmitter } from "react-native";
import HotUpdaterNative from "./specs/NativeHotUpdater.js";
const NIL_UUID = "00000000-0000-0000-0000-000000000000";
const HotUpdater = {
  HOT_UPDATER_BUNDLE_ID: __HOT_UPDATER_BUNDLE_ID || NIL_UUID,
  CHANNEL: __HOT_UPDATER_CHANNEL || (!__DEV__ ? "production" : null)
};
export const addListener = (eventName, listener) => {
  const eventEmitter = new NativeEventEmitter(HotUpdaterNative);
  const subscription = eventEmitter.addListener(eventName, listener);
  return () => {
    subscription.remove();
  };
};

/**
 * Downloads files and applies them to the app.
 *
 * @param {UpdateParams} params - Parameters object required for bundle update
 * @returns {Promise<boolean>} Resolves with true if download was successful, otherwise rejects with an error.
 */

/**
 * @deprecated Use updateBundle(params: UpdateBundleParamsWithStatus) instead
 */

export async function updateBundle(paramsOrBundleId, fileUrl) {
  const updateBundleId = typeof paramsOrBundleId === "string" ? paramsOrBundleId : paramsOrBundleId.bundleId;
  const status = typeof paramsOrBundleId === "string" ? "UPDATE" : paramsOrBundleId.status;
  const currentBundleId = getBundleId();

  // updateBundleId <= currentBundleId
  if (status === "UPDATE" && updateBundleId.localeCompare(currentBundleId) <= 0) {
    throw new Error("Update bundle id is the same as the current bundle id. Preventing infinite update loop.");
  }
  if (typeof paramsOrBundleId === "string") {
    return HotUpdaterNative.updateBundle({
      bundleId: updateBundleId,
      fileUrl: fileUrl || null
    });
  }
  return HotUpdaterNative.updateBundle({
    bundleId: updateBundleId,
    fileUrl: paramsOrBundleId.fileUrl
  });
}

/**
 * Fetches the current app version.
 */
export const getAppVersion = () => {
  const constants = HotUpdaterNative.getConstants();
  return constants?.APP_VERSION ?? null;
};

/**
 * Reloads the app.
 */
export const reload = () => {
  requestAnimationFrame(() => {
    HotUpdaterNative.reload();
  });
};

/**
 * Fetches the minimum bundle id, which represents the initial bundle of the app
 * since it is created at build time.
 *
 * @returns {string} Resolves with the minimum bundle id or null if not available.
 */
export const getMinBundleId = () => {
  const constants = HotUpdaterNative.getConstants();
  return constants.MIN_BUNDLE_ID;
};

/**
 * Fetches the current bundle version id.
 *
 * @async
 * @returns {Promise<string>} Resolves with the current version id or null if not available.
 */
export const getBundleId = () => {
  return HotUpdater.HOT_UPDATER_BUNDLE_ID === NIL_UUID ? getMinBundleId() : HotUpdater.HOT_UPDATER_BUNDLE_ID;
};

/**
 * Sets the channel for the app.
 */
export const setChannel = async channel => {
  return HotUpdaterNative.setChannel(channel);
};
export const getChannel = () => {
  const constants = HotUpdaterNative.getConstants();
  return constants?.CHANNEL ?? HotUpdater.CHANNEL ?? null;
};
//# sourceMappingURL=native.js.map