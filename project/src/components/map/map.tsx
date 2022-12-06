import { useRef } from 'react';

import { Location } from '../../types/location';
import { Offers } from '../../types/offers';

import { useMap, useOffers, useLocation, useCurrentMarker } from '../../hooks';


type MapProps = {
  location: Location;
  offers: Offers;
  parentClass: string;
  selectedPlaceID?: number | undefined;
  currentOfferID?: number | undefined;
}


const Map = (props: MapProps): JSX.Element => {
  const { location, offers, selectedPlaceID, currentOfferID, parentClass } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef);
  const renderedMarkers = useOffers(map, offers, currentOfferID);

  useLocation(map, location);
  useCurrentMarker(renderedMarkers, selectedPlaceID);

  return (
    <div
      className={ `${ parentClass }__map map` }
      ref={ mapRef }
    />
  );
};


export default Map;
