import { render, screen } from '@testing-library/react';

import { makeMockCity } from '../../test-mocks';

import NoPlaces from './no-places';


const mockCity = makeMockCity();


describe('Component: NoPlaces', () => {
  it('should render correctly', () => {
    render(
      <NoPlaces
        currentCity={ mockCity }
      />
    );


    const statusElement = screen.getByText('No places to stay available');
    const statusDescriptionElement = screen.getByText(`We could not find any property available at the moment in ${ mockCity }`);


    expect(statusElement).toBeInTheDocument();
    expect(statusDescriptionElement).toBeInTheDocument();
  });
});

