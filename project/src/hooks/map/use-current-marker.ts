import { useEffect, useRef } from 'react';

import { PinParam } from '../../const';
import { OfferMarker, OffersMarkers } from '../../types/offers';

import { setMarkerIcon } from '../../utils';


export const useCurrentMarker = (renderedMarkers: OffersMarkers, selectedOfferID: number | undefined) => {
  const currentMarker = useRef<OfferMarker | undefined>(undefined);


  useEffect(() => {
    if (currentMarker.current) {
      setMarkerIcon(currentMarker.current.marker, PinParam.Url.Default);

      currentMarker.current = undefined;
    }

    if (selectedOfferID) {
      currentMarker.current = renderedMarkers.find((marker) => marker.id === selectedOfferID);

      if (currentMarker.current) {
        setMarkerIcon(currentMarker.current.marker, PinParam.Url.Active);
      }
    }
  }, [renderedMarkers, selectedOfferID]);
};
