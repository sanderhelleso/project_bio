import { createStore, applyMiddelware, compose } from 'redux';
import rootReducer from '../reducers';
import { loadState, saveState } from '../lib/localStorageHelpers';

export const store = createStore(
    rootReducer,
    loadState(),
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

store.subscribe(() => saveState(store.getState()))