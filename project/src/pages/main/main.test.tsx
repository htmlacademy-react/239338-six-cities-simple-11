import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';

import { NameSpace, AppRoute, CITIES, OFFERS_SORTING_OPTIONS } from '../../const';

import { makeMockOffer, makeMockCity } from '../../test-mocks';

import HistoryRouter from '../../components/history-router/history-router';
import Main from './main';


const history = createMemoryHistory();
const mockStore = configureMockStore();


describe('Page: Main', () => {
  it('should render correctly', () => {
    const store = mockStore({
      [NameSpace.User]: {},
      [NameSpace.Offers]: {
        currentCity: CITIES[0],
        sortingType: OFFERS_SORTING_OPTIONS[0].type,
        isOffersDataLoading: false,
        offers: [],
        currentOffer: undefined,
        currentNearbyOffers: [],
        selectedOfferID: undefined
      }
    });

    history.push(AppRoute.Root);

    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <Main/>
        </HistoryRouter>
      </Provider>,
    );


    const headerElement = screen.getByTestId('header');
    const locationsElement = screen.getByTestId('locations');

    const titleElement = screen.getByText(/Cities/i);


    expect(headerElement).toBeInTheDocument();
    expect(locationsElement).toBeInTheDocument();

    expect(titleElement).toBeInTheDocument();
  });


  it('should render correctly when there are no offers', () => {
    const store = mockStore({
      [NameSpace.User]: {},
      [NameSpace.Offers]: {
        currentCity: CITIES[0],
        sortingType: OFFERS_SORTING_OPTIONS[0].type,
        isOffersDataLoading: false,
        offers: [],
        currentOffer: undefined,
        currentNearbyOffers: [],
        selectedOfferID: undefined
      }
    });

    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <Main/>
        </HistoryRouter>
      </Provider>,
    );


    const mainElement = screen.getByTestId('main-page-main');
    const placesContainerElement = screen.getByTestId('main-page-places-container');

    const noPlacesElement = screen.queryByTestId('cities-no-places');
    const placesElement = screen.queryByTestId('cities-places');


    expect(mainElement).toHaveClass('page__main--index-empty');
    expect(placesContainerElement).toHaveClass('cities__places-container--empty');

    expect(noPlacesElement).toBeInTheDocument();
    expect(placesElement).not.toBeInTheDocument();
  });


  it('should render correctly when offers exist', () => {
    const mockCity = makeMockCity();
    const mockOffer = makeMockOffer();

    mockOffer.city.name = mockCity;

    const store = mockStore({
      [NameSpace.User]: {},
      [NameSpace.Offers]: {
        currentCity: mockCity,
        sortingType: OFFERS_SORTING_OPTIONS[0].type,
        isOffersDataLoading: false,
        offers: [mockOffer],
        currentOffer: undefined,
        currentNearbyOffers: [],
        selectedOfferID: undefined
      }
    });

    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <Main/>
        </HistoryRouter>
      </Provider>,
    );


    const mainElement = screen.getByTestId('main-page-main');
    const placesContainerElement = screen.getByTestId('main-page-places-container');

    const noPlacesElement = screen.queryByTestId('cities-no-places');
    const placesElement = screen.queryByTestId('cities-places');


    expect(mainElement).not.toHaveClass('page__main--index-empty');
    expect(placesContainerElement).not.toHaveClass('cities__places-container--empty');

    expect(noPlacesElement).not.toBeInTheDocument();
    expect(placesElement).toBeInTheDocument();
  });
});
