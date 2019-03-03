import { combineReducers, createStore, applyMiddleware, compose, Reducer, Store } from 'redux';
import { createBrowserHistory, createMemoryHistory, History } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import appState from 'App/state';
import appReducer from 'App/reducer';


export type action = { type: string; payload?: any; };
export const isServer = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);
export const defaultState = {
  router: {},
  app: appState,
};

export default function(initialState = defaultState, url = '/'): [Store, History] {
  const composeEnhancers = !isServer && process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  const history = !isServer ? createBrowserHistory() : createMemoryHistory({
    initialEntries: [url]
  });
  const enhancer = composeEnhancers(applyMiddleware(routerMiddleware(history), thunk));
  const rootReducer = combineReducers<typeof initialState>({
    router: connectRouter(history) as any,
    app: appReducer,
  });
  const store = createStore<typeof initialState, action, any, any>(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('App/reducer', () => {
      store.replaceReducer(appReducer)
    });
  }

  return [store, history];
}
