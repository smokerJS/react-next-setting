import { makeAutoObservable } from 'mobx';
import { enableStaticRendering } from 'mobx-react';
import React from 'react';
import TestStore from './TestStore';
import TestStore2 from './TestStore2';

export interface GetStores {
  <Stores extends any[]>(stores: Stores): Stores;
}

const getStores: GetStores = stores => stores;

const stores = [TestStore, TestStore2];

const isServer = typeof window === 'undefined';

enableStaticRendering(isServer);

let store = null;

const initialRoot = {
  TestStore: {
    Store: TestStore,
  },
  TestStore2: {
    Store: TestStore2,
  },
};

class RootStore {
  stores = {};

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

function initializeStore(initialData) {
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

export function useStore<T>(initialState: T) {
  return React.useMemo(() => initializeStore(initialState), [initialState])
    .stores;
}
