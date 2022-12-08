import { useEffect, useRef } from 'react';
import leaflet, { Map } from 'leaflet';

import { PinParam } from '../const';
import { Offers, OffersMarkers } from '../types/offers';

import { setMarkerIcon } from '../utils';


export const useMapOffers = (map: Map | null, offers: Offers) => {
  const offersMarkers = useRef<OffersMarkers | []>([]);


  useEffect(() => {
    if (map) {
      offersMarkers.current = offers.map((offer) => ({
        id: offer.id,
        marker: new leaflet.Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        })
      }));

      offersMarkers.current.forEach((marker) => {
        setMarkerIcon(marker.marker, PinParam.Url.Default);

        marker.marker.addTo(map);
      });


      return () => {
        offersMarkers.current.forEach((marker) => {
          map.removeLayer(marker.marker);
        });

        offersMarkers.current = [];
      };
    }
  }, [map, offers]);


  return offersMarkers.current;
};
