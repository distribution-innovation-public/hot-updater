"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setChannel = exports.reload = exports.getMinBundleId = exports.getChannel = exports.getBundleId = exports.getAppVersion = exports.addListener = void 0;
exports.updateBundle = updateBundle;
var _reactNative = require("react-native");
var _NativeHotUpdater = _interopRequireDefault(require("./specs/NativeHotUpdater.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const NIL_UUID = "00000000-0000-0000-0000-000000000000";
const HotUpdater = {
  HOT_UPDATER_BUNDLE_ID: __HOT_UPDATER_BUNDLE_ID || NIL_UUID,
  CHANNEL: __HOT_UPDATER_CHANNEL || (!__DEV__ ? "production" : null)
};
const addListener = (eventName, listener) => {
  const eventEmitter = new _reactNative.NativeEventEmitter(_NativeHotUpdater.default);
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
exports.addListener = addListener;
async function updateBundle(paramsOrBundleId, fileUrl) {
  const updateBundleId = typeof paramsOrBundleId === "string" ? paramsOrBundleId : paramsOrBundleId.bundleId;
  const status = typeof paramsOrBundleId === "string" ? "UPDATE" : paramsOrBundleId.status;
  const currentBundleId = getBundleId();

  // updateBundleId <= currentBundleId
  if (status === "UPDATE" && updateBundleId.localeCompare(currentBundleId) <= 0) {
    throw new Error("Update bundle id is the same as the current bundle id. Preventing infinite update loop.");
  }
  if (typeof paramsOrBundleId === "string") {
    return _NativeHotUpdater.default.updateBundle({
      bundleId: updateBundleId,
      fileUrl: fileUrl || null
    });
  }
  return _NativeHotUpdater.default.updateBundle({
    bundleId: updateBundleId,
    fileUrl: paramsOrBundleId.fileUrl
  });
}

/**
 * Fetches the current app version.
 */
const getAppVersion = () => {
  const constants = _NativeHotUpdater.default.getConstants();
  return constants?.APP_VERSION ?? null;
};

/**
 * Reloads the app.
 */
exports.getAppVersion = getAppVersion;
const reload = () => {
  requestAnimationFrame(() => {
    _NativeHotUpdater.default.reload();
  });
};

/**
 * Fetches the minimum bundle id, which represents the initial bundle of the app
 * since it is created at build time.
 *
 * @returns {string} Resolves with the minimum bundle id or null if not available.
 */
exports.reload = reload;
const getMinBundleId = () => {
  const constants = _NativeHotUpdater.default.getConstants();
  return constants.MIN_BUNDLE_ID;
};

/**
 * Fetches the current bundle version id.
 *
 * @async
 * @returns {Promise<string>} Resolves with the current version id or null if not available.
 */
exports.getMinBundleId = getMinBundleId;
const getBundleId = () => {
  return HotUpdater.HOT_UPDATER_BUNDLE_ID === NIL_UUID ? getMinBundleId() : HotUpdater.HOT_UPDATER_BUNDLE_ID;
};

/**
 * Sets the channel for the app.
 */
exports.getBundleId = getBundleId;
const setChannel = async channel => {
  return _NativeHotUpdater.default.setChannel(channel);
};
exports.setChannel = setChannel;
const getChannel = () => {
  const constants = _NativeHotUpdater.default.getConstants();
  return constants?.CHANNEL ?? HotUpdater.CHANNEL ?? null;
};
exports.getChannel = getChannel;
//# sourceMappingURL=native.js.map