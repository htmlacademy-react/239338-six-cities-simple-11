import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppState } from '../types/state';

import { useMap } from './use-map';
import { useMapOffers } from './use-map-offers';
import { useMapCurrentOffer } from './use-map-current-offer';
import { useMapLocation } from './use-map-location';


export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export { useMap, useMapOffers, useMapCurrentOffer, useMapLocation };
