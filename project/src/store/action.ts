import { createAction } from '@reduxjs/toolkit';

import { Offers } from '../types/offers';
import { User } from '../types/user';

import { AuthorizationStatus } from '../const';


export const setCurrentCity = createAction<{ currentCity: string }>('city/setCurrent');

export const setSortingType = createAction<{ sortingType: string }>('offers/setSortingType');
export const setOffers = createAction<Offers>('offers/set');

export const setDataLoadingStatus = createAction<boolean>('data/setLoadingStatus');

export const setUser = createAction<User | undefined>('user/set');
export const setAuthorizationStatus = createAction<AuthorizationStatus>('user/setAuthorizationStatus');
