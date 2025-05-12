import type { TurboModule } from "react-native";
export interface UpdateBundleParams {
    bundleId: string;
    fileUrl: string | null;
}
export interface Spec extends TurboModule {
    reload(): void;
    updateBundle(params: UpdateBundleParams): Promise<boolean>;
    setChannel(channel: string): Promise<void>;
    addListener(eventName: string): void;
    removeListeners(count: number): void;
    readonly getConstants: () => {
        MIN_BUNDLE_ID: string;
        APP_VERSION: string | null;
        CHANNEL: string | null;
    };
}
declare const _default: Spec;
export default _default;
//# sourceMappingURL=NativeHotUpdater.d.ts.map