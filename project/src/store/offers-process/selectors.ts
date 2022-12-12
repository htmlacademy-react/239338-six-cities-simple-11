import { NameSpace } from '../../const';

import { AppState } from '../../types/state';
import { Offer, Offers } from '../../types/offers';


export const getCurrentCity = (state: AppState): string => state[NameSpace.Offers].currentCity;

export const getSortingType = (state: AppState): string => state[NameSpace.Offers].sortingType;

export const getIsOffersDataLoading = (state: AppState): boolean => state[NameSpace.Offers].isOffersDataLoading;

export const getOffers = (state: AppState): Offers => state[NameSpace.Offers].offers;

export const getNearbyOffers = (state: AppState): Offers => state[NameSpace.Offers].currentNearbyOffers;

export const getCurrentOffer = (state: AppState): Offer | undefined => state[NameSpace.Offers].currentOffer;

export const getSelectedOfferID = (state: AppState): number | undefined => state[NameSpace.Offers].selectedOfferID;
