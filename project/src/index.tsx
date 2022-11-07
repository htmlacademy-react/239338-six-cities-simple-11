import React from 'react';
import ReactDOM from 'react-dom/client';

import { offers } from './mocks/offers';

import App from './components/app/app';


const Setting = {
  IsLogged: true
} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);


root.render(
  <React.StrictMode>
    <App
      isLogged= { Setting.IsLogged }
      offers= { offers }
    />
  </React.StrictMode>,
);
