import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace, CITIES, OFFERS_SORTING_OPTIONS } from '../../const';
import { OffersProcess } from '../../types/state';

import { showError } from '../../utils';

import { getOffersAction, getCurrentOfferAction, getNearbyOffersAction } from '../api-action';


export const initialState: OffersProcess = {
  currentCity: CITIES[0],
  sortingType: OFFERS_SORTING_OPTIONS[0].type,
  isOffersDataLoading: false,
  offers: [],
  currentOffer: undefined,
  currentNearbyOffers: [],
  selectedOfferID: undefined
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

    setSelectedOfferID: (state, action: PayloadAction<{ selectedOfferID: number | undefined }>) => {
      state.selectedOfferID = action.payload.selectedOfferID;
    },

    clearOffers: (state) => {
      state.offers = [];
    },

    clearCurrentOffer: (state) => {
      state.currentOffer = undefined;
    },

    clearNearbyOffersAction: (state) => {
      state.currentNearbyOffers = [];
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

        showError('the places could not be loaded');
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

        showError('the data of the offer could not be loaded');
      })

      .addCase(getNearbyOffersAction.fulfilled, (state, action) => {
        state.currentNearbyOffers = action.payload;
      })
      .addCase(getNearbyOffersAction.rejected, () => {
        showError('the offers nearby could not be loaded');
      });
  }
});

export const { setCurrentCity, setSortingType, setSelectedOfferID, clearOffers, clearCurrentOffer, clearNearbyOffersAction } = offersProcess.actions;
