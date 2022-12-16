import { renderHook } from '@testing-library/react';
import leaflet from 'leaflet';

import { makeMockOffer } from '../test-mocks';

import { useMapOffers } from './use-map-offers';


const mapContainer = document.createElement('div');

const mockOffers = [makeMockOffer(), makeMockOffer()];


describe('Hook: useMapOffers', () => {
  it('should return offers markers correctly', () => {
    const map = new leaflet.Map(mapContainer);

    const { result } = renderHook(() => useMapOffers(map, mockOffers));
    const offersMarkers = result.current;

    offersMarkers.forEach((offerMarker, index) => {
      expect(offerMarker).toEqual({
        id: mockOffers[index].id,
        marker: new leaflet.Marker({
          lat: mockOffers[index].location.latitude,
          lng: mockOffers[index].location.longitude
        })
      });
    });
  });
});
