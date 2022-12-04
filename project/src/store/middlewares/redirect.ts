import {Middleware} from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';

import { reducer } from '../reducer';
import { redirectToRoute } from '../action';
import browserHistory from '../../browser-history';


type Reducer = ReturnType<typeof reducer>;


export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === redirectToRoute.toString()) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
