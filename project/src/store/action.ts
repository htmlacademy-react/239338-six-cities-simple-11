import { createAction } from '@reduxjs/toolkit';

import { Offer, Offers } from '../types/offers';
import { Review } from '../types/review';
import { User } from '../types/user';

import { AuthorizationStatus, ReviewsSendingStatus, AppRoute } from '../const';


export const setCurrentCity = createAction<{ currentCity: string }>('city/setCurrent');

export const setSortingType = createAction<{ sortingType: string }>('offers/setSortingType');
export const setOffers = createAction<Offers>('offers/set');
export const setCurrentOffer = createAction<Offer | undefined>('offers/setCurrent');
export const setCurrentOfferNearbyOffers = createAction<Offers>('offers/setNearbyOffers');

export const setDataLoadingStatus = createAction<boolean>('data/setLoadingStatus');

export const setUser = createAction<User | undefined>('user/set');
export const setAuthorizationStatus = createAction<AuthorizationStatus>('user/setAuthorizationStatus');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

export const setReviews = createAction<Review[]>('reviews/set');
export const setReviewsSendingStatus = createAction<ReviewsSendingStatus>('reviews/setSendingStatus');

