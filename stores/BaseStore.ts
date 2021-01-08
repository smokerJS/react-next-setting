type State<T> = {
  [P in keyof T]: T[P]
}

class BaseStore<T> {
  constructor(initialData: T) {
    this.init(initialData);
  }

  private init = (initialData: T): void => {
    for (const key of Object.keys(initialData)) {
      this[key in keyof T] = initialData[key];
    }
  };

  protected hydrate = (initialData: T): void => this.init(initialData);
}

export default BaseStore;
