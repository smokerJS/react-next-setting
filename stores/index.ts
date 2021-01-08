import { makeAutoObservable } from 'mobx';
import { enableStaticRendering, MobXProviderContext } from 'mobx-react';
import React from 'react';
import TestStore from './TestStore';
import NumberStore from './NumberStore';

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

  hydrate = (initialState: any) => {
    initialState.TestStore &&
      this.stores.TestStore.hydrate(initialState.TestStore);
    initialState.NumberStore &&
      this.stores.NumberStore.hydrate(initialState.NumberStore);
  };
}

let rootStore: RootStore | null = null;

function initializeStore(initialData: any): RootStore {
  const _store = rootStore || new RootStore(initialData);
  if (isServer) {
    return _store;
  }

  if (initialData) {
    _store.hydrate(initialData);
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
