import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { State } from '../types/state';

import { useMap } from './map/use-map';
import { useOffers } from './map/use-offers';
import { useLocation } from './map/use-location';
import { useCurrentMarker } from './map/use-current-marker';


export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export { useMap, useOffers, useLocation, useCurrentMarker };
