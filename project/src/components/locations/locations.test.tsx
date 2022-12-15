import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { NameSpace, CITIES } from '../../const';

import Locations from './locations';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  [NameSpace.Offers]: {
    currentCity: CITIES[0]
  }
});


describe('Component: Locations', () => {
  it('should render correctly', () => {
    render(
      <Provider store={ store }>
        <Locations/>
      </Provider>
    );


    const cityLinkElements = screen.getAllByTestId('locations-link');


    expect(cityLinkElements.length).toBe(CITIES.length);

    CITIES.forEach((city, index) => {
      expect(cityLinkElements[index]).toHaveAttribute('href', `#${city }`);

      expect(screen.getByText(city)).toBeInTheDocument();
    });

    expect(cityLinkElements[0]).toHaveClass('tabs__item--active');
    expect(cityLinkElements[0]).toHaveStyle('pointer-events: none');
  });
});

