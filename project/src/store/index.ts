import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './root-reducer';
import { createAPI } from '../services/api';
import { redirect } from './middlewares/redirect';


export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: createAPI()
      }
    }).concat(redirect)
});
