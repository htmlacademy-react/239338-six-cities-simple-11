import { createAction } from '@reduxjs/toolkit';

import { Offers } from '../types/offers';


export const setCurrentCity = createAction<{ currentCity: string }>('city/setCurrent');

export const setSortingType = createAction<{ sortingType: string }>('offers/setSortingType');
export const setOffers = createAction<Offers>('offers/set');
