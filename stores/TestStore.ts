import { flow, action, observable, makeObservable } from 'mobx';
import axios from 'axios';
import BaseStore from 'stores/BaseStore';

const INITIAL_STATE = {
  test: 123456888,
  testNumer: -6,
};

class TestStore extends BaseStore<typeof INITIAL_STATE> {
  @observable
  test!: number;

  @observable
  testNumer!: number;

  constructor(initialState = INITIAL_STATE) {
    super();
    this.init(initialState);
    makeObservable(this);
  }

  init = (initialState: typeof INITIAL_STATE): void => {
    const { test, testNumer } = initialState;
    test && (this.test = test);
    testNumer && (this.testNumer = testNumer);
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

  @action
  upTestNumber = (): void => {
    this.testNumer += 1;
  };
}

export default TestStore;
