import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';

import { NameSpace, AppRoute, AuthorizationStatus, CITIES, OFFERS_SORTING_OPTIONS } from '../../const';

import HistoryRouter from '../../components/history-router/history-router';
import Main from './main';


const history = createMemoryHistory();
const mockStore = configureMockStore();

const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Unknown,
    user: undefined
  },
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


describe('Page: Main', () => {
  it('should render "Main" when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <Main/>
        </HistoryRouter>
      </Provider>,
    );


    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });
});
