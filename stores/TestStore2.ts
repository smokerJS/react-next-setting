import { flow, action, makeAutoObservable } from 'mobx';
import axios from 'axios';

export const initialTest = {
  test: 123456888,
};

class TestStore2 {
  test;

  constructor(initialData = initialTest) {
    this.test = initialData.test;
    makeAutoObservable(this, {
      action: action.bound,
    });
  }

  hydrate = initialData => {
    this.test = initialData.test;
  };

  action = flow(function* () {
    const data = yield axios.get(
      'https://api.ping2g.com/sp/showrooms?from=home&home_YN=true&_sort=id:desc&_limit=10&id_lte=92'
    );
    this.test = data.data;
  });

  upTest = () => {
    this.test++;
  };
}

export default TestStore2;
