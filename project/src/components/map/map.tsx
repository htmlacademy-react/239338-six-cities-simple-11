import { useRef } from 'react';

import { Location } from '../../types/location';
import { Offers } from '../../types/offers';

import { useMap, useOffers, useLocation, useCurrentMarker, useAppSelector } from '../../hooks';

import { getSelectedOfferID } from '../../store/offers-process/selectors';


type MapProps = {
  location: Location;
  offers: Offers;
  parentClass: string;
  currentOfferID?: number | undefined;
}


const Map = (props: MapProps): JSX.Element => {
  const { location, offers, currentOfferID, parentClass } = props;

  const selectedOfferID = useAppSelector(getSelectedOfferID);

  const mapRef = useRef(null);
  const map = useMap(mapRef);
  const renderedMarkers = useOffers(map, offers, currentOfferID);

  useLocation(map, location);
  useCurrentMarker(renderedMarkers, selectedOfferID);

  return (
    <div
      className={ `${ parentClass }__map map` }
      ref={ mapRef }
    />
  );
};


export default Map;
