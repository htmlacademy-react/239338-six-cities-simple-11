import { useState, useEffect, useRef, MutableRefObject } from 'react';

import leaflet, { Map } from 'leaflet';
import 'leaflet/dist/leaflet.css';


const TITLE_LAYER = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';


export const useMap = (mapRef: MutableRefObject<HTMLElement | null>) => {
  const [ map, setMap ] = useState<Map | null>(null);
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
