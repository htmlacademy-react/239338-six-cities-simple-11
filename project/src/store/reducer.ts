import { createReducer } from '@reduxjs/toolkit';

import { AuthorizationStatus, ReviewsSendingStatus, cities, sortingOptions } from '../const';
import { State } from '../types/state';

import { setCurrentCity, setOffers, setSortingType, setDataLoadingStatus, setAuthorizationStatus, setUser, setCurrentOffer, setCurrentOfferNearbyOffers, setReviews, setReviewsSendingStatus } from './action';


const initialState: State = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: undefined,
  currentCity: cities[0],
  sortingType: sortingOptions[0].type,
  isDataLoaded: false,
  offers: [],
  currentOfferID: undefined,
  currentOffer: undefined,
  currentOfferReviews: [],
  currentOfferNearbyOffers: [],
  reviewsSendingStatus: ReviewsSendingStatus.Unknown
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
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(setCurrentOfferNearbyOffers, (state, action) => {
      state.currentOfferNearbyOffers = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.currentOfferReviews = action.payload;
    })
    .addCase(setReviewsSendingStatus, (state, action) => {
      state.reviewsSendingStatus = action.payload;
    });
});
