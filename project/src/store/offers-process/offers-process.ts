import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { NameSpace, cities, sortingOptions } from '../../const';
import { OffersProcess } from '../../types/state';

import { getOffersAction, getCurrentOfferAction, getNearbyOffersAction } from '../api-action';


const initialState: OffersProcess = {
  currentCity: cities[0],
  sortingType: sortingOptions[0].type,
  isOffersDataLoading: false,
  offers: [],
  currentOffer: undefined,
  currentOfferNearby: [],
};


export const offersProcess = createSlice({
  name: NameSpace.Offers,
  initialState,

  reducers: {
    setCurrentCity: (state, action: PayloadAction<{ currentCity: string }>) => {
      state.currentCity = action.payload.currentCity;
    },

    setSortingType: (state, action: PayloadAction<{ sortingType: string }>) => {
      state.sortingType = action.payload.sortingType;
    },

    clearOffers: (state) => {
      state.offers = [];
    },

    clearCurrentOffer: (state) => {
      state.currentOffer = undefined;
    },

    clearCurrentOfferNearby: (state) => {
      state.currentOfferNearby = [];
    }
  },

  extraReducers(builder) {
    builder
      .addCase(getOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(getOffersAction.fulfilled, (state, action) => {
        state.isOffersDataLoading = false;

        state.offers = action.payload;
      })
      .addCase(getOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;

        toast.error('An error occurred, the places could not be loaded.');
      })

      .addCase(getCurrentOfferAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(getCurrentOfferAction.fulfilled, (state, action) => {
        state.isOffersDataLoading = false;

        state.currentOffer = action.payload;
      })
      .addCase(getCurrentOfferAction.rejected, (state) => {
        state.isOffersDataLoading = false;

        toast.error('An error occurred, the data of the offer could not be loaded.');
      })

      .addCase(getNearbyOffersAction.fulfilled, (state, action) => {
        state.currentOfferNearby = action.payload;
      })
      .addCase(getNearbyOffersAction.rejected, () => {
        toast.error('An error occurred, the offers nearby could not be loaded.');
      });
  }
});

export const { setCurrentCity, setSortingType, clearOffers, clearCurrentOffer, clearCurrentOfferNearby } = offersProcess.actions;
