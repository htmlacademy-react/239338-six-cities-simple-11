import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { store } from './store';
import { checkAuthAction } from './store/api-action';

import browserHistory from './browser-history';

import HistoryRouter from './components/history-router/history-router';
import ScrollFix from './components/scroll-fix/scroll-fix';
import Loader from './components/loader/loader';
import App from './components/app/app';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);


store.dispatch(checkAuthAction());

root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <HistoryRouter history={ browserHistory }>
        <ScrollFix/>
        <Loader/>
        <ToastContainer/>

        <App/>
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
