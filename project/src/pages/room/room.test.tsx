import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';

import { NameSpace, AppRoute } from '../../const';
import { makeMockOffer } from '../../test-mocks';

import { pluralize } from '../../utils';

import HistoryRouter from '../../components/history-router/history-router';
import Room, { MAX_IMAGES_AMOUNT } from './room';


const history = createMemoryHistory();
const mockStore = configureMockStore();

const mockOffer = makeMockOffer();
const mockRegularOffer = {
  ...mockOffer,
  isPremium: false
};
const mockPremiumOffer = {
  ...mockOffer,
  isPremium: true
};
const {
  images,
  title,
  type,
  bedrooms,
  maxAdults,
  price,
  goods,
  description
} = mockOffer;


describe('Page: Room', () => {
  it('should render correctly', () => {
    const store = mockStore({
      [NameSpace.User]: {},
      [NameSpace.Offers]: {
        offers: [],
        currentOffer: mockOffer,
        currentNearbyOffers: [],
      },
      [NameSpace.Reviews]: {
        currentReviews: []
      },
    });


    history.push(AppRoute.Room);

    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <Room/>
        </HistoryRouter>
      </Provider>
    );


    const headerElement = screen.getByTestId('header');

    const imageElements = screen.getAllByTestId('property-image');

    const titleElement = screen.getByText(title);
    const ratingElement = screen.getByTestId('rating');

    const typeElement = screen.getByText(type);
    const bedroomsCountElement = screen.getByText(pluralize(bedrooms, 'bedroom'));
    const adultsCountElement = screen.getByText(`Max ${ pluralize(maxAdults, 'adult') }`);

    const priceElement = screen.getByText(`€${ price }`);

    const goodsTitleElement = screen.getByText('What\'s inside');
    const goodsElements = goods.map((item) => screen.getByText(item));

    const hostTitleElement = screen.getByText('Meet the host');
    const userElement = screen.getByTestId('user');

    const descriptionElement = screen.getByText(description);
    const reviewsElement = screen.getByTestId('reviews');

    const mapElement = screen.getByTestId('map');
    const nearbyOffersTitleElement = screen.getByText('Other places in the neighbourhood');


    expect(headerElement).toBeInTheDocument();

    expect(imageElements.length).toBeLessThanOrEqual(MAX_IMAGES_AMOUNT);
    imageElements.forEach((image, index) => {
      expect(image).toHaveAttribute('src', images[index]);
    });

    expect(titleElement).toBeInTheDocument();
    expect(ratingElement).toBeInTheDocument();

    expect(typeElement).toBeInTheDocument();
    expect(bedroomsCountElement).toBeInTheDocument();
    expect(adultsCountElement).toBeInTheDocument();

    expect(priceElement).toBeInTheDocument();

    expect(goodsTitleElement).toBeInTheDocument();
    goodsElements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });

    expect(hostTitleElement).toBeInTheDocument();
    expect(userElement).toBeInTheDocument();

    expect(descriptionElement).toBeInTheDocument();
    expect(reviewsElement).toBeInTheDocument();

    expect(mapElement).toBeInTheDocument();
    expect(nearbyOffersTitleElement).toBeInTheDocument();
  });


  it('should render a premium label if the property is premium', () => {
    const store = mockStore({
      [NameSpace.User]: {},
      [NameSpace.Offers]: {
        offers: [],
        currentOffer: mockPremiumOffer,
        currentNearbyOffers: [],
      },
      [NameSpace.Reviews]: {
        currentReviews: []
      },
    });

    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <Room/>
        </HistoryRouter>
      </Provider>
    );


    const premiumLabelElement = screen.queryByText(/Premium/i);

    expect(premiumLabelElement).toBeInTheDocument();
  });


  it('should not render a premium label if the property is regular', () => {
    const store = mockStore({
      [NameSpace.User]: {},
      [NameSpace.Offers]: {
        offers: [],
        currentOffer: mockRegularOffer,
        currentNearbyOffers: [],
      },
      [NameSpace.Reviews]: {
        currentReviews: []
      },
    });

    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <Room/>
        </HistoryRouter>
      </Provider>
    );


    const premiumLabelElement = screen.queryByText(/Premium/i);

    expect(premiumLabelElement).not.toBeInTheDocument();
  });
});
