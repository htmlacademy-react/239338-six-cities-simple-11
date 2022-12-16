import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';

import { NameSpace, AuthorizationStatus } from '../../const';
import { Reviews as ReviewsType } from '../../types/reviews';
import { makeMockReview, makeMockOffer } from '../../test-mocks';

import HistoryRouter from '../../components/history-router/history-router';
import Reviews, { MAX_REVIEWS_AMOUNT } from './reviews';


const history = createMemoryHistory();
const mockStore = configureMockStore();


const MOCK_REVIEWS_AMOUNT = 12;

const mockReviews: ReviewsType = [];
let i = 0;
while (i < MOCK_REVIEWS_AMOUNT) {
  mockReviews.push(makeMockReview());
  i++;
}


describe('Component: Reviews', () => {
  it('should render correctly when has reviews', () => {
    const store = mockStore({
      [NameSpace.Reviews]: {
        currentReviews: mockReviews
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Unknown,
      }
    });

    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <Reviews
            parentClass='mock-reviews'
          />
        </HistoryRouter>
      </Provider>
    );


    const amountElement = screen.getByTestId('reviews-amount');

    const listElement = screen.queryByTestId('reviews-list');
    const itemElements = screen.queryAllByTestId('reviews-item');


    expect(amountElement).toBeInTheDocument();
    expect(amountElement).toHaveTextContent(MOCK_REVIEWS_AMOUNT.toString());

    expect(listElement).toBeInTheDocument();
    expect(itemElements.length).toBeLessThanOrEqual(MAX_REVIEWS_AMOUNT);
  });


  it('should render correctly when has no reviews', () => {
    const store = mockStore({
      [NameSpace.Reviews]: {
        currentReviews: []
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Unknown,
      }
    });

    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <Reviews
            parentClass='mock-reviews'
          />
        </HistoryRouter>
      </Provider>
    );


    const amountElement = screen.getByTestId('reviews-amount');

    const listElement = screen.queryByTestId('reviews-list');


    expect(amountElement).toBeInTheDocument();
    expect(amountElement).toHaveTextContent('0');

    expect(listElement).not.toBeInTheDocument();
  });


  it('should render with form when AuthorizationStatus is "AUTH"', () => {
    const store = mockStore({
      [NameSpace.Reviews]: {
        currentReviews: []
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      [NameSpace.Offers]: {
        currentOffer: makeMockOffer()
      },
    });

    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <Reviews
            parentClass='mock-reviews'
          />
        </HistoryRouter>
      </Provider>
    );


    const formElement = screen.queryByTestId('reviews-form');

    expect(formElement).toBeInTheDocument();
  });


  it('should render without form when AuthorizationStatus is not "AUTH"', () => {
    const store = mockStore({
      [NameSpace.Reviews]: {
        currentReviews: []
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Unknown,
      }
    });

    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <Reviews
            parentClass='mock-reviews'
          />
        </HistoryRouter>
      </Provider>
    );


    const formElement = screen.queryByTestId('reviews-form');

    expect(formElement).not.toBeInTheDocument();
  });
});

