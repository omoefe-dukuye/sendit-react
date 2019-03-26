import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import storeConfig from './redux/configureStore';
import AppRouter from './components/router';
import 'normalize.css/normalize.css';
import './styles/style.scss';

const store = storeConfig();

const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(app, document.getElementById('app'));
