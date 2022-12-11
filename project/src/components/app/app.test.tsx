import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { NameSpace, AppRoute, AuthorizationStatus, ReviewsSendingStatus, CITIES, OFFERS_SORTING_OPTIONS } from '../../const';
import { makeMockOffer } from '../../test-mocks';

import HistoryRouter from '../history-router/history-router';
import App from './app';


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
    currentOffer: makeMockOffer(),
    currentNearbyOffers: [],
    selectedOfferID: undefined
  },
  [NameSpace.Reviews]: {
    sendingStatus: ReviewsSendingStatus.Unknown,
    currentReviews: []
  },
});

const history = createMemoryHistory();


const mockApp = (
  <Provider store={ store }>
    <HistoryRouter history={ history }>
      <App/>
    </HistoryRouter>
  </Provider>
);


describe('Application Routing', () => {
  it('should render "Main" page when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(mockApp);

    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });

  it('should render "Login" page when user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(mockApp);

    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  it('should render "Room" page when user navigate to "/offer/:id"', () => {
    history.push(AppRoute.Room);

    render(mockApp);

    expect(screen.getByTestId('room-page')).toBeInTheDocument();
  });

  it('should render "NotFound" page when user navigate to a non-existent route', () => {
    history.push('/non-existent-route');

    render(mockApp);

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });
});
