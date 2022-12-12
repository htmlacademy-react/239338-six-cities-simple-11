import { AuthorizationStatus, ReviewsSendingStatus } from '../const';

import { AppUser } from './user';
import { Offer, Offers } from './offers';
import { Reviews } from './reviews';

import { store } from '../store/index.js';


export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: AppUser | undefined;
};

export type OffersProcess = {
  isOffersDataLoading: boolean;
  currentCity: string;
  sortingType: string;
  offers: Offers;
  currentOffer: Offer | undefined;
  currentNearbyOffers: Offers;
  selectedOfferID: number | undefined;
};

export type ReviewsProcess = {
  sendingStatus: ReviewsSendingStatus;
  currentReviews: Reviews;
};

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
