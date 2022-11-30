import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { store } from './store';
import { checkAuthAction, getOffers } from './store/api-action';

import App from './components/app/app';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);


store.dispatch(checkAuthAction());
store.dispatch(getOffers());


root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <ToastContainer />

      <App/>
    </Provider>
  </React.StrictMode>,
);
