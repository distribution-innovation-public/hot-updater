import type { AppUpdateInfo, GetBundlesArgs } from "@hot-updater/core";
export type UpdateSource = string | (() => Promise<AppUpdateInfo | null>);
export declare const fetchUpdateInfo: (source: UpdateSource, { appVersion, bundleId, platform, minBundleId, channel }: GetBundlesArgs, requestHeaders?: Record<string, string>, onError?: (error: Error) => void, requestTimeout?: number) => Promise<AppUpdateInfo | null>;
//# sourceMappingURL=fetchUpdateInfo.d.ts.map