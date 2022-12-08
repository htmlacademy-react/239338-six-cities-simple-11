import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../const';

import { userProcess } from './user-process/user-process';
import { offersProcess } from './offers-process/offers-process';
import { reviewsProcess } from './reviews-process/reviews-process';


export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Offers]: offersProcess.reducer,
  [NameSpace.Reviews]: reviewsProcess.reducer,
});
