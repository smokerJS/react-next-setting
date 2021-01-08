import { makeAutoObservable } from 'mobx';
import { enableStaticRendering, MobXProviderContext } from 'mobx-react';
import React from 'react';
import TestStore from 'stores/TestStore';
import NumberStore from 'stores/NumberStore';

const isServer = typeof window === 'undefined';

enableStaticRendering(isServer);
class RootStore {
  stores = {
    TestStore: new TestStore(),
    NumberStore: new NumberStore(),
  };

  constructor(initialState: any) {
    this.hydrate(initialState);
    makeAutoObservable(this);
  }

  hydrate = (hydrateState: any) => {
    if (!hydrateState) {
      return;
    }
    hydrateState.TestStore &&
      this.stores.TestStore.hydrate(hydrateState.TestStore);
    hydrateState.NumberStore &&
      this.stores.NumberStore.hydrate(hydrateState.NumberStore);
  };
}

let rootStore: RootStore | null = null;

function initializeStore(initialState: any): RootStore {
  const _store = rootStore || new RootStore(initialState);
  if (isServer) {
    return _store;
  }

  if (initialState) {
    _store.hydrate(initialState);
  }

  if (!rootStore) rootStore = _store;

  return _store;
}

export function createStores<T>(initialState: T): RootStore {
  return React.useMemo(() => initializeStore(initialState), [initialState]);
}

export const useStore = (storeName: string): Record<string, any> => {
  return React.useContext(MobXProviderContext)[storeName];
};
