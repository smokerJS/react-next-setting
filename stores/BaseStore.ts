type Data<T> = {
  [P in keyof T]: T[P];
};

abstract class BaseStore<T> {
  abstract init: (initialData: Data<T>) => void;

  public hydrate = (hydrateData: Data<T>): void => this.init(hydrateData);
}

export default BaseStore;
