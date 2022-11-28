import { useState, useEffect, useRef, MutableRefObject } from 'react';

import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { Location } from '../../types/location';
import { Offers } from '../../types/offers';


type MapProps = {
  location: Location;
  offers: Offers;
  parentClass: string;
  selectedPlaceID?: number | undefined;
  currentOfferID?: number | undefined;
}

type OfferMarker = {
  id: number;
  marker: leaflet.Marker;
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


const setMarkerIcon = (marker: leaflet.Marker, iconUrl: string) => {
  marker.setIcon(new leaflet.Icon({
    iconUrl: iconUrl,
    iconSize: [ PinSize.Width, PinSize.Heigh ],
    iconAnchor: [ PinSize.Width / 2, PinSize.Heigh ]
  }));
};


const useMap = (mapRef: MutableRefObject<HTMLElement | null>) => {
  const [ map, setMap ] = useState<leaflet.Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const layer = new leaflet.TileLayer(TITLE_LAYER);

      const instance = new leaflet.Map(mapRef.current, {
        scrollWheelZoom: false
      });

      instance.addLayer(layer);
      setMap(instance);

      isRenderedRef.current = true;
    }
  }, [mapRef]);

  return map;
};

const useOffers = (map: leaflet.Map | null, offers: Offers, currentOfferID: number | undefined) => {
  const offersMarkers = useRef<OfferMarker[] | []>([]);

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
        setMarkerIcon(marker.marker, marker.id === currentOfferID ? PinUrl.Active : PinUrl.Default);

        marker.marker.addTo(map);
      });

      return () => {
        offersMarkers.current.forEach((marker) => {
          map.removeLayer(marker.marker);
        });

        offersMarkers.current = [];
      };
    }
  }, [map, offers, currentOfferID]);

  return offersMarkers.current;
};

const useLocation = (map: leaflet.Map | null, location: Location) => {
  useEffect(() => {
    if (map) {
      map.setView(new leaflet.LatLng(location.latitude, location.longitude), location.zoom);
    }
  }, [map, location]);
};

const useCurrentMarker = (renderedMarkers: OfferMarker[], selectedPlaceID: number | undefined) => {
  const currentMarker = useRef<OfferMarker | undefined>(undefined);

  useEffect(() => {
    if (currentMarker.current) {
      setMarkerIcon(currentMarker.current.marker, PinUrl.Default);

      currentMarker.current = undefined;
    }

    if (selectedPlaceID) {
      currentMarker.current = renderedMarkers.find((marker) => marker.id === selectedPlaceID);

      if (currentMarker.current) {
        setMarkerIcon(currentMarker.current.marker, PinUrl.Active);
      }
    }
  }, [renderedMarkers, selectedPlaceID]);
};


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
