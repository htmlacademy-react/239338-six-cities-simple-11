import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './store';
import { getOffers } from './store/api-action';

import App from './components/app/app';


const Setting = {
  IsLogged: true
} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);


store.dispatch(getOffers());


root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <App
        isLogged= { Setting.IsLogged }
      />
    </Provider>
  </React.StrictMode>,
);
