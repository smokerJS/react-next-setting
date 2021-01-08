import { makeAutoObservable } from 'mobx';
import { enableStaticRendering, MobXProviderContext } from 'mobx-react';
import React from 'react';
import TestStore from './TestStore';

export interface GetStores {
  <Stores extends any[]>(stores: Stores): Stores;
}

const getStores: GetStores = stores => stores;

const stores = [TestStore];

const isServer = typeof window === 'undefined';

enableStaticRendering(isServer);

let store = null;

const initialRoot = {
  TestStore: {
    Store: TestStore,
  },
};

class RootStore {
  stores = {
    TestStore,
  };

  constructor(initialData = initialRoot) {
    Object.keys(initialData).forEach((key: string) => {
      this.stores[key] = new initialRoot[key].Store(initialData[key]);
    });
    makeAutoObservable(this);
  }

  hydrate(initialData) {
    for (const key of Object.keys(this.stores)) {
      initialData[key] && this.stores[key].hydrate(initialData[key]);
    }
  }
}

function initializeStore(initialData): RootStore {
  const _store = store || new RootStore(initialData);
  if (isServer) {
    return _store;
  }

  if (initialData) {
    _store.hydrate(initialData);
  }

  if (!store) store = _store;

  return _store;
}

export function createStores<T>(initialState: T): RootStore {
  return React.useMemo(() => initializeStore(initialState), [initialState]);
}

export const useStore = (storeName: string): Record<string, any> => {
  return React.useContext(MobXProviderContext)[storeName];
};
