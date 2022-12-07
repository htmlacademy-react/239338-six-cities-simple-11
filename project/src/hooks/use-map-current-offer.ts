import { useEffect, useRef } from 'react';
import { Map } from 'leaflet';

import { PinParam } from '../const';
import { OfferMarker, OffersMarkers } from '../types/offers';

import { setMarkerIcon } from '../utils';


export const useMapCurrentOffer = (map: Map | null, offersMarkers: OffersMarkers, currentOfferID: number | undefined) => {
  const currentOfferMarker = useRef<OfferMarker | undefined>(undefined);


  useEffect(() => {
    if (map) {
      if (currentOfferID) {
        currentOfferMarker.current = offersMarkers.find((marker) => marker.id === currentOfferID);

        if (currentOfferMarker.current) {
          setMarkerIcon(currentOfferMarker.current.marker, PinParam.Url.Active);
          currentOfferMarker.current.marker.addTo(map);
        }
      }


      return () => {
        if (currentOfferMarker.current) {
          setMarkerIcon(currentOfferMarker.current.marker, PinParam.Url.Default);
          currentOfferMarker.current.marker.addTo(map);

          currentOfferMarker.current = undefined;
        }
      };
    }

  }, [map, offersMarkers, currentOfferID]);
};
