import { AuthorizationStatus } from '../const';

import { User } from './user';
import { Offers } from './offers';
import { Review } from './review';

import { store } from '../store/index.js';


export type State = {
  authorizationStatus: AuthorizationStatus;
  user: User | undefined;
  currentCity: string;
  sortingType: string;
  isDataLoaded: boolean;
  offers: Offers;
  currentOfferID: string | undefined;
  currentOfferReviews: Review[];
};

export type AppDispatch = typeof store.dispatch;
