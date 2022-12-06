import { NameSpace } from '../../const';

import { State } from '../../types/state';
import { Offer, Offers } from '../../types/offers';


export const getCurrentCity = (state: State): string => state[NameSpace.Offers].currentCity;

export const getSortingType = (state: State): string => state[NameSpace.Offers].sortingType;

export const getIsOffersDataLoading = (state: State): boolean => state[NameSpace.Offers].isOffersDataLoading;

export const getOffers = (state: State): Offers => state[NameSpace.Offers].offers;

export const getNearbyOffers = (state: State): Offers => state[NameSpace.Offers].currentOfferNearby;

export const getCurrentOffer = (state: State): Offer | undefined => state[NameSpace.Offers].currentOffer;
