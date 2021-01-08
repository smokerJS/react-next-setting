import { flow, action, observable, makeObservable } from 'mobx';
import axios from 'axios';
import BaseStore from './BaseStore';

const INITIAL_STATE = {
  test: 123456888,
};

class TestStore extends BaseStore<typeof INITIAL_STATE> {
  @observable
  test!: number;

  constructor(initialState = INITIAL_STATE) {
    super();
    this.init(initialState);
    makeObservable(this);
  }

  init = (initialState = INITIAL_STATE): void => {
    const { test } = initialState;
    this.test = test || INITIAL_STATE.test;
  };

  @action.bound
  action = flow(function* generator(this: TestStore) {
    const data = yield axios.get(
      'https://api.ping2g.com/sp/showrooms?from=home&home_YN=true&_sort=id:desc&_limit=10&id_lte=92'
    );
    this.test = data.data;
  });

  @action
  upTest = (): void => {
    this.test += 1;
  };
}

export default TestStore;
