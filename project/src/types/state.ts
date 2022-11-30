import { AuthorizationStatus } from '../const';

import { User } from './user';
import { Offers } from './offers';

import { store } from '../store/index.js';


export type State = {
  authorizationStatus: AuthorizationStatus;
  user: User | undefined;
  currentCity: string;
  sortingType: string;
  isDataLoaded: boolean;
  offers: Offers;
};

export type AppDispatch = typeof store.dispatch;
