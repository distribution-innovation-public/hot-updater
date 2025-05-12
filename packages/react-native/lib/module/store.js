"use strict";

import useSyncExternalStoreExports from "use-sync-external-store/shim/with-selector";
const {
  useSyncExternalStoreWithSelector
} = useSyncExternalStoreExports;
const createHotUpdaterStore = () => {
  let state = {
    progress: 0,
    isBundleUpdated: false
  };
  const getSnapshot = () => {
    return state;
  };
  const listeners = new Set();
  const emitChange = () => {
    for (const listener of listeners) {
      listener();
    }
  };
  const setState = newState => {
    state = {
      ...state,
      ...newState
    };
    emitChange();
  };
  const subscribe = listener => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  return {
    getSnapshot,
    setState,
    subscribe
  };
};
export const hotUpdaterStore = createHotUpdaterStore();
export const useHotUpdaterStore = (selector = snapshot => snapshot) => {
  return useSyncExternalStoreWithSelector(hotUpdaterStore.subscribe, hotUpdaterStore.getSnapshot, hotUpdaterStore.getSnapshot, selector);
};
//# sourceMappingURL=store.js.map