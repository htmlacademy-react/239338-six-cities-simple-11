import { useState, useEffect, useRef, MutableRefObject } from 'react';

import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { Location } from '../../types/location';
import { Offers } from '../../types/offers';


type CitiesMapProps = {
  location: Location;
  offers: Offers;
  parentClass: string;
  selectedPlaceID?: number | undefined;
}

const enum PinUrl {
  Default = 'img/pin.svg',
  Active = 'img/pin-active.svg'
}

const enum PinSize {
  Width = 28,
  Heigh = 40
}

const TITLE_LAYER = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';


const useMap = (mapRef: MutableRefObject<HTMLElement | null>, location: Location) => {
  const [ map, setMap ] = useState<leaflet.Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const layer = new leaflet.TileLayer(TITLE_LAYER);

      const instance = new leaflet.Map(mapRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude,
        },
        zoom: location.zoom,
        scrollWheelZoom: false
      })
        .addLayer(layer);

      setMap(instance);

      isRenderedRef.current = true;
    }
  }, [mapRef, location]);

  return map;
};

const useOffers = (map: leaflet.Map | null, offers: Offers, selectedPlaceID: number | undefined) => {
  useEffect(() => {
    if (map) {
      offers.forEach((offer) => new leaflet.Marker({
        lat: offer.location.latitude,
        lng: offer.location.longitude
      })
        .setIcon(new leaflet.Icon({
          iconUrl: selectedPlaceID === offer.id ? PinUrl.Active : PinUrl.Default,
          iconSize: [PinSize.Width, PinSize.Heigh],
          iconAnchor: [PinSize.Width / 2, PinSize.Heigh]
        }))
        .addTo(map));
    }
  }, [map, offers, selectedPlaceID]);
};


const Map = (props: CitiesMapProps): JSX.Element => {
  const { location, offers, selectedPlaceID, parentClass } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, location);

  useOffers(map, offers, selectedPlaceID);

  return (
    <div
      className={ `${ parentClass }__map map` }
      ref={ mapRef }
    />
  );
};


export default Map;
