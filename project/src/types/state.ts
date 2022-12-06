import { AuthorizationStatus, ReviewsSendingStatus } from '../const';

import { User } from './user';
import { Offer } from './offers';
import { Review } from './review';

import { store } from '../store/index.js';


export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: User | undefined;
};

export type OffersProcess = {
  isOffersDataLoading: boolean;
  currentCity: string;
  sortingType: string;
  offers: Offer[];
  currentOffer: Offer | undefined;
  currentOfferNearby: Offer[];
};

export type ReviewsProcess = {
  sendingStatus: ReviewsSendingStatus;
  currentReviews: Review[];
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
