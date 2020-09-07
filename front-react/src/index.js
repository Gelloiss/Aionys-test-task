import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import redux from './Redux';
import './index.module.scss';
import AllNotes from './AllNotes';

const store = createStore(redux);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AllNotes />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

