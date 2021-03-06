import { action, observable, makeObservable } from 'mobx';
import BaseStore from 'stores/BaseStore';

const INITIAL_STATE = {
  number: 100,
};

class NumberStore extends BaseStore<typeof INITIAL_STATE> {
  @observable
  number!: number;

  constructor(initialState = INITIAL_STATE) {
    super();
    this.init(initialState);
    makeObservable(this);
  }

  init = (initialState: typeof INITIAL_STATE): void => {
    const { number } = initialState;
    number && (this.number = number);
  };

  @action
  upNumber = (): void => {
    this.number += 1;
  };
}

export default NumberStore;
