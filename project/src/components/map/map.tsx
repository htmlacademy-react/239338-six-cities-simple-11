import { useEffect, useRef } from 'react';

import { Location } from '../../types/location';
import { Offers } from '../../types/offers';

import { useAppSelector, useMap, useMapOffers, useMapLocation, useMapCurrentOffer } from '../../hooks';

import { store } from '../../store';
import { setSelectedOfferID } from '../../store/offers-process/offers-process';
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
  const offersMarkers = useMapOffers(map, offers);


  useMapLocation(map, location);
  useMapCurrentOffer(map, offersMarkers, currentOfferID || selectedOfferID);

  useEffect(() => {
    store.dispatch(setSelectedOfferID({
      selectedOfferID: undefined
    }));
  }, []);


  return (
    <div
      data-testid="map"
      className={ `${ parentClass }__map map` }
      ref={ mapRef }
    />
  );
};


export default Map;
