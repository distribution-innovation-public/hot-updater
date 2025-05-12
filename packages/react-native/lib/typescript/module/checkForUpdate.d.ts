import type { AppUpdateInfo } from "@hot-updater/core";
import { type UpdateSource } from "./fetchUpdateInfo";
export interface CheckForUpdateOptions {
    source: UpdateSource;
    requestHeaders?: Record<string, string>;
    onError?: (error: Error) => void;
    /**
     * The timeout duration for the request.
     * @default 5000
     */
    requestTimeout?: number;
}
export type CheckForUpdateResult = AppUpdateInfo & {
    /**
     * Updates the bundle.
     * This method is equivalent to `HotUpdater.updateBundle()` but with all required arguments pre-filled.
     */
    updateBundle: () => Promise<boolean>;
};
export declare function checkForUpdate(options: CheckForUpdateOptions): Promise<CheckForUpdateResult | null>;
//# sourceMappingURL=checkForUpdate.d.ts.map