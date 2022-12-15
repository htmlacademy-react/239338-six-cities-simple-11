import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { NameSpace } from '../../const';
import { makeMockLocation } from '../../test-mocks';

import Map from './map';


const mockStore = configureMockStore();

const store = mockStore({
  [NameSpace.Offers]: {}
});


describe('Component: Map', () => {
  it('should render correctly', () => {
    render(
      <Provider store={ store }>
        <Map
          location={ makeMockLocation() }
          offers={ [] }
          parentClass='mock-map'
        />
      </Provider>
    );


    const compoment = screen.getByTestId('map');


    expect(compoment).not.toBeEmptyDOMElement();
  });
});

