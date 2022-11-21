import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offers';


export const setCurrentCity = createAction<{ currentCity: string }>('city/setCurrent');
export const getOffers = createAction<{ offers: Offer[] }>('offers/get');
