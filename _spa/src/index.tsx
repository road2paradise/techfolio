import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { AppRoot } from './AppRoot';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoot />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);