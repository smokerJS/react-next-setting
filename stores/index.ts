import { makeAutoObservable } from 'mobx';
import { enableStaticRendering, MobXProviderContext } from 'mobx-react';
import React from 'react';
import TestStore from './TestStore';
import NumberStore from './NumberStore';

const isServer = typeof window === 'undefined';

enableStaticRendering(isServer);

const initialRoot = {
  TestStore,
  NumberStore,
};

class RootStore {
  stores = {};

  constructor(initialData: any) {
    Object.keys(initialData).forEach((key: string) => {
      this.stores[key] = new initialRoot[key](initialData[key]);
    });
    makeAutoObservable(this);
  }

  hydrate(initialData) {
    for (const key of Object.keys(this.stores)) {
      initialData[key] && this.stores[key].hydrate(initialData[key]);
    }
  }
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
