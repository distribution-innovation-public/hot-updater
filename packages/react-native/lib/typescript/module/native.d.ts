import type { UpdateStatus } from "@hot-updater/core";
import { type UpdateBundleParams } from "./specs/NativeHotUpdater";
export type HotUpdaterEvent = {
    onProgress: {
        progress: number;
    };
};
export declare const addListener: <T extends keyof HotUpdaterEvent>(eventName: T, listener: (event: HotUpdaterEvent[T]) => void) => () => void;
export type UpdateParams = UpdateBundleParams & {
    status: UpdateStatus;
};
/**
 * Downloads files and applies them to the app.
 *
 * @param {UpdateParams} params - Parameters object required for bundle update
 * @returns {Promise<boolean>} Resolves with true if download was successful, otherwise rejects with an error.
 */
export declare function updateBundle(params: UpdateParams): Promise<boolean>;
/**
 * @deprecated Use updateBundle(params: UpdateBundleParamsWithStatus) instead
 */
export declare function updateBundle(bundleId: string, fileUrl: string | null): Promise<boolean>;
/**
 * Fetches the current app version.
 */
export declare const getAppVersion: () => string | null;
/**
 * Reloads the app.
 */
export declare const reload: () => void;
/**
 * Fetches the minimum bundle id, which represents the initial bundle of the app
 * since it is created at build time.
 *
 * @returns {string} Resolves with the minimum bundle id or null if not available.
 */
export declare const getMinBundleId: () => string;
/**
 * Fetches the current bundle version id.
 *
 * @async
 * @returns {Promise<string>} Resolves with the current version id or null if not available.
 */
export declare const getBundleId: () => string;
/**
 * Sets the channel for the app.
 */
export declare const setChannel: (channel: string) => Promise<void>;
export declare const getChannel: () => string | null;
//# sourceMappingURL=native.d.ts.map