import { flow, action, observable } from 'mobx';
import axios from 'axios';
import BaseStore from './BaseStore';

export interface InitialState {
  test: number;
}

export const initialState: InitialState = {
  test: 123456888,
};

class TestStore extends BaseStore<InitialState> {
  @observable
  test!: number;

  constructor(initialData: InitialState) {
    super();
    this.init(initialData);
  }

  init = (initialData: InitialState): void => {
    this.test = initialData.test;
  };

  @action.bound
  action = flow(function* generator(this: TestStore) {
    const data = yield axios.get(
      'https://api.ping2g.com/sp/showrooms?from=home&home_YN=true&_sort=id:desc&_limit=10&id_lte=92'
    );
    this.test = data.data;
  });

  upTest = (): void => {
    this.test += 1;
  };
}

export default TestStore;
