import { useEffect } from 'react';
import leaflet, { Map } from 'leaflet';

import { Location } from '../types/location';


export const useMapLocation = (map: Map | null, location: Location) => {
  useEffect(() => {
    if (map) {
      map.setView(new leaflet.LatLng(location.latitude, location.longitude), location.zoom);
    }
  }, [map, location]);
};
