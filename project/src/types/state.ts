import { AuthorizationStatus, ReviewsSendingStatus } from '../const';

import { User } from './user';
import { Offer, Offers } from './offers';
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
  currentOffer: Offer | undefined;
  currentOfferReviews: Review[];
  currentOfferNearbyOffers: Offers;
  reviewsSendingStatus: ReviewsSendingStatus;
};

export type AppDispatch = typeof store.dispatch;
