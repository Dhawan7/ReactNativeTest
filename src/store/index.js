
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

const configureStore = (initialState) => {
  const middleware = [thunk];
  return createStore(reducers, initialState, applyMiddleware(...middleware));
};

export default configureStore;
