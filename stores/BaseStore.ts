type State<T> = {
  [P in keyof T]: T[P];
};

abstract class BaseStore<InitialState> {
  abstract init: (initialState: State<InitialState>) => void;

  public hydrate = (hydrateState: State<InitialState>): void =>
    this.init(hydrateState);
}

export default BaseStore;
