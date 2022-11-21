import { createReducer } from '@reduxjs/toolkit';

import { cities } from '../const';
import { State } from '../types/state';

import { setCurrentCity, getOffers } from './action';


const initialState: State = {
  currentCity: cities[0],
  offers: []
};


export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentCity, (state, action) => {
      state.currentCity = action.payload.currentCity;
    })
    .addCase(getOffers, (state, action) => {
      state.offers = action.payload.offers;
    });
});
