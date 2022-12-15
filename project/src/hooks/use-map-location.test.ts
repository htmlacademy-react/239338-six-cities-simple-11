import { renderHook } from '@testing-library/react';
import leaflet from 'leaflet';

import { makeMockLocation } from '../test-mocks';

import { useMapLocation } from './use-map-location';


const mapContainer = document.createElement('div');

const mockLocation = makeMockLocation();


describe('Hook: useMapLocation', () => {
  it('should set map view correctly', () => {
    const map = new leaflet.Map(mapContainer);

    renderHook(() => useMapLocation(map, mockLocation));

    expect(map.getCenter()).toEqual({
      lat: mockLocation.latitude,
      lng: mockLocation.longitude
    });

    expect(map.getZoom()).toBe(mockLocation.zoom);
  });
});
