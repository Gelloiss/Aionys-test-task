import React from 'react';
import ReactDOM from 'react-dom';
import {combineReducers, createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux';
import redux from './Redux';
import './index.module.scss';
import AllNotes from './AllNotes';
import thunk from 'redux-thunk';
import  { loadTranslations, setLocale, syncTranslationWithStore, i18nReducer } from 'react-redux-i18n';
import Language from './language';

const store = createStore(
  combineReducers({
    redux,
    i18n: i18nReducer,
  }),
  applyMiddleware(thunk)
);

syncTranslationWithStore(store);
store.dispatch(loadTranslations(Language));
//store.dispatch(setLocale(store.getState().redux.language));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AllNotes />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

