import { createReducer } from '@reduxjs/toolkit';

import { cities, sortingOptions } from '../const';
import { State } from '../types/state';

import { setCurrentCity, getOffers, setSortingType } from './action';


const initialState: State = {
  currentCity: cities[0],
  sortingType: sortingOptions[0].type,
  offers: []
};


export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentCity, (state, action) => {
      state.currentCity = action.payload.currentCity;
    })
    .addCase(getOffers, (state, action) => {
      state.offers = action.payload.offers;
    })
    .addCase(setSortingType, (state, action) => {
      state.sortingType = action.payload.sortingType;
    });
});
