import { createReducer } from '@reduxjs/toolkit';

import { cities, sortingOptions } from '../const';
import { State } from '../types/state';

import { setCurrentCity, setDataLoadingStatus, setOffers, setSortingType } from './action';


const initialState: State = {
  currentCity: cities[0],
  sortingType: sortingOptions[0].type,
  isDataLoaded: false,
  offers: []
};


export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentCity, (state, action) => {
      state.currentCity = action.payload.currentCity;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setSortingType, (state, action) => {
      state.sortingType = action.payload.sortingType;
    })
    .addCase(setDataLoadingStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    });
});
