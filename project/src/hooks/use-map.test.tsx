import { renderHook } from '@testing-library/react';

import { useMap } from './use-map';


const mapContainer = document.createElement('div');

const mapRef = {
  current: mapContainer,
};


describe('Hook: useMap', () => {
  it('should return map instance correctly', () => {
    const { result } = renderHook(() => useMap(mapRef));
    const map = result.current;

    expect(map).toBeInstanceOf(Object);
  });
});
