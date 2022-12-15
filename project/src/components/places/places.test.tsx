import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';

import { NameSpace } from '../../const';
import { Offers } from '../../types/offers';
import { makeMockCity, makeMockOffer } from '../../test-mocks';

import HistoryRouter from '../../components/history-router/history-router';
import Places from './places';


const history = createMemoryHistory();
const mockStore = configureMockStore();

const store = mockStore({
  [NameSpace.Offers]: {}
});


const MOCK_OFFERS_AMOUNT = 2;

const mockOffers: Offers = [];
let i = 0;
while (i < MOCK_OFFERS_AMOUNT) {
  mockOffers.push(makeMockOffer());
  i++;
}


const mockCity = makeMockCity();


describe('Component: Places', () => {
  it('should render correctly', () => {
    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <Places
            currentCity={ mockCity }
            offers={ mockOffers }
          />
        </HistoryRouter>
      </Provider>
    );


    const titleElement = screen.getByText('Places');
    const foundOutputElement = screen.getByText(`${ MOCK_OFFERS_AMOUNT } places to stay in ${ mockCity }`);

    const sortingMenuElement = screen.getByTestId('places-sorting');
    const mapElement = screen.getByTestId('map');

    const cardElements = screen.getAllByTestId('place-card');


    expect(titleElement).toBeInTheDocument();
    expect(foundOutputElement).toBeInTheDocument();

    expect(sortingMenuElement).toBeInTheDocument();
    expect(mapElement).toBeInTheDocument();

    expect(cardElements.length).toBeLessThanOrEqual(MOCK_OFFERS_AMOUNT);
  });


  it('should render correctly with only one offer', () => {
    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <Places
            currentCity={ mockCity }
            offers={ [makeMockOffer()] }
          />
        </HistoryRouter>
      </Provider>
    );


    const foundOutputElement = screen.getByText(`1 place to stay in ${ mockCity }`);


    expect(foundOutputElement).toBeInTheDocument();
  });
});

