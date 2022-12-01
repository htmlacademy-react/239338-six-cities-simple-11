import { createAction } from '@reduxjs/toolkit';

import { Offers } from '../types/offers';
import { Review } from '../types/review';
import { User } from '../types/user';

import { AuthorizationStatus, AppRoute } from '../const';


export const setCurrentCity = createAction<{ currentCity: string }>('city/setCurrent');

export const setSortingType = createAction<{ sortingType: string }>('offers/setSortingType');
export const setOffers = createAction<Offers>('offers/set');
export const setCurrentOfferID = createAction<string>('offers/setCurrentID');

export const setDataLoadingStatus = createAction<boolean>('data/setLoadingStatus');

export const setUser = createAction<User | undefined>('user/set');
export const setAuthorizationStatus = createAction<AuthorizationStatus>('user/setAuthorizationStatus');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

export const setReviews = createAction<Review[]>('reviews/set');

