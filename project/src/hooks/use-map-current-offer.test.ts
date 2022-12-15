import { renderHook } from '@testing-library/react';
import leaflet from 'leaflet';

import { PinParam } from '../const';
import { OffersMarkers } from '../types/offers';

import { makeMockOffer } from '../test-mocks';

import { useMapCurrentOffer } from './use-map-current-offer';


const mapContainer = document.createElement('div');

const mockOffers = [makeMockOffer(), makeMockOffer()];

const mockOffersMarkers: OffersMarkers = mockOffers.map((offer) => ({
  id: offer.id,
  marker: new leaflet.Marker({
    lat: offer.location.latitude,
    lng: offer.location.longitude
  })
}));


describe('Hook: useMapCurrentOffer', () => {
  it('should set current offer correctly', () => {
    const map = new leaflet.Map(mapContainer);

    renderHook(() => useMapCurrentOffer(map, mockOffersMarkers, mockOffers[0].id));

    expect(mockOffersMarkers[0].marker.getIcon().options.iconUrl).toBe(PinParam.Url.Active);
  });
});
