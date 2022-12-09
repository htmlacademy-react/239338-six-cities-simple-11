import { makeMockCity, makeMockOffer, makeMockSortingType, makeMockID } from '../../test-mocks';

import { getOffersAction, getCurrentOfferAction, getNearbyOffersAction } from '../api-action';

import { offersProcess, initialState, setCurrentCity, setSortingType, setSelectedOfferID, clearOffers, clearCurrentOffer, clearCurrentOfferNearby } from './offers-process';


const sortingType = makeMockSortingType();

const city = makeMockCity();

const offer = makeMockOffer();
const offers = [makeMockOffer(), makeMockOffer()];

const offerID = makeMockID();


describe('Reducer: offers', () => {
  it('without additional parameters should return the initial state', () => {
    expect(offersProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  describe('getOffersAction test', () => {
    it('should set isOffersDataLoading to "true" if getOffersAction pending', () => {
      const state = initialState;

      expect(offersProcess.reducer(state, { type: getOffersAction.pending.type }))
        .toEqual({
          ...initialState,
          isOffersDataLoading: true
        });
    });
    it('should set isOffersDataLoading to "false" and set offers if getOffersAction fulfilled', () => {
      const state = initialState;

      expect(offersProcess.reducer(state, { type: getOffersAction.fulfilled.type, payload: offers }))
        .toEqual({
          ...initialState,
          isOffersDataLoading: false,
          offers: offers
        });
    });
    it('should set isOffersDataLoading to "false" if getOffersAction rejected', () => {
      const state = initialState;

      expect(offersProcess.reducer(state, { type: getOffersAction.rejected.type }))
        .toEqual({
          ...initialState,
          isOffersDataLoading: false
        });
    });
  });

  describe('getCurrentOfferAction test', () => {
    it('should set isOffersDataLoading to "true" if getCurrentOfferAction pending', () => {
      const state = initialState;

      expect(offersProcess.reducer(state, { type: getCurrentOfferAction.pending.type }))
        .toEqual({
          ...initialState,
          isOffersDataLoading: true
        });
    });
    it('should set isOffersDataLoading to "false" and set currentOffer if getCurrentOfferAction fulfilled', () => {
      const state = initialState;

      expect(offersProcess.reducer(state, { type: getCurrentOfferAction.fulfilled.type, payload: offer }))
        .toEqual({
          ...initialState,
          isOffersDataLoading: false,
          currentOffer: offer
        });
    });
    it('should set isOffersDataLoading to "false" if getCurrentOfferAction rejected', () => {
      const state = initialState;

      expect(offersProcess.reducer(state, { type: getCurrentOfferAction.rejected.type }))
        .toEqual({
          ...initialState,
          isOffersDataLoading: false
        });
    });
  });

  describe('getNearbyOffersAction test', () => {
    it('should set currentOfferNearby if getNearbyOffersAction fulfilled', () => {
      const state = initialState;

      expect(offersProcess.reducer(state, { type: getNearbyOffersAction.fulfilled.type, payload: offers }))
        .toEqual({
          ...initialState,
          currentOfferNearby: offers
        });
    });
    it('should do not set currentOfferNearby if getNearbyOffersAction rejected', () => {
      const state = initialState;

      expect(offersProcess.reducer(state, { type: getNearbyOffersAction.rejected.type }))
        .toEqual(initialState);
    });
  });

  describe('setCurrentCity test', () => {
    it('should set the current city name', () => {
      const state = initialState;

      expect(offersProcess.reducer(state, setCurrentCity({ currentCity: city })))
        .toEqual({
          ...initialState,
          currentCity: city
        });
    });
  });

  describe('setSortingType test', () => {
    it('should set the sorting type', () => {
      const state = initialState;

      expect(offersProcess.reducer(state, setSortingType({ sortingType: sortingType })))
        .toEqual({
          ...initialState,
          sortingType: sortingType
        });
    });
  });

  describe('setSelectedOfferID test', () => {
    it('should set the ID of the selected offer', () => {
      const state = initialState;

      expect(offersProcess.reducer(state, setSelectedOfferID({ selectedOfferID: offerID })))
        .toEqual({
          ...initialState,
          selectedOfferID: offerID
        });
    });
  });

  describe('clearOffers test', () => {
    it('should clear the existing offers', () => {
      const state = initialState;

      expect(offersProcess.reducer(state, clearOffers()))
        .toEqual({
          ...initialState,
          offers: []
        });
    });
  });

  describe('clearCurrentOffer test', () => {
    it('should clear the previously set current offer', () => {
      const state = initialState;

      expect(offersProcess.reducer(state, clearCurrentOffer()))
        .toEqual({
          ...initialState,
          currentOffer: undefined
        });
    });
  });

  describe('clearCurrentOfferNearby test', () => {
    it('should clear the existing nearby offers', () => {
      const state = initialState;

      expect(offersProcess.reducer(state, clearCurrentOfferNearby()))
        .toEqual({
          ...initialState,
          currentOfferNearby: []
        });
    });
  });
});
