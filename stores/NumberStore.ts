import { flow, action, observable, makeObservable } from 'mobx';
import axios from 'axios';
import BaseStore from './BaseStore';

export interface InitialState {
  number: number;
}

export const initialState: InitialState = {
  number: 100,
};

class NumberStore extends BaseStore<InitialState> {
  @observable
  number!: number;

  constructor(initialData: InitialState) {
    super();
    this.init(initialData);
    makeObservable(this);
  }

  init = (initialData: InitialState): void => {
    const { number } = initialData;
    this.number = number || initialState.number;
  };

  @action
  upNumber = (): void => {
    this.number += 1;
  };
}

export default NumberStore;
