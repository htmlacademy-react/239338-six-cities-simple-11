import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';

import { NameSpace, AppRoute, AuthorizationStatus, ReviewsSendingStatus, CITIES, OFFERS_SORTING_OPTIONS } from '../../const';
import { makeMockOffer } from '../../test-mocks';

import { pluralize } from '../../utils';

import HistoryRouter from '../../components/history-router/history-router';
import Room, { MAX_IMAGES_AMOUNT } from './room';


const history = createMemoryHistory();
const mockStore = configureMockStore();

const mockOffer = makeMockOffer();
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
    currentOffer: mockOffer,
    currentNearbyOffers: [],
    selectedOfferID: undefined
  },
  [NameSpace.Reviews]: {
    sendingStatus: ReviewsSendingStatus.Unknown,
    currentReviews: []
  },
});


describe('Page: Room', () => {
  history.push(AppRoute.Room);

  render(
    <Provider store={ store }>
      <HistoryRouter history={ history }>
        <Room/>
      </HistoryRouter>
    </Provider>
  );


  it('should render correctly', () => {
    const imageElements = screen.getAllByTestId('property-image');

    const titleElement = screen.getByText(title);

    const typeElement = screen.getByText(type);
    const bedroomsCountElement = screen.getByText(pluralize(bedrooms, 'bedroom'));
    const adultsCountElement = screen.getByText(`Max ${ pluralize(maxAdults, 'adult') }`);

    const priceElement = screen.getByText(`€${ price }`);

    const goodsTitleElement = screen.getByText('What\'s inside');
    const goodsElements = goods.map((item) => screen.getByText(item));

    const hostTitleElement = screen.getByText('Meet the host');

    const descriptionElement = screen.getByText(description);

    const nearbyOffersTitleElement = screen.getByText('Other places in the neighbourhood');


    expect(imageElements.length).toBeLessThanOrEqual(MAX_IMAGES_AMOUNT);

    imageElements.forEach((image, index) => {
      expect(image).toHaveAttribute('src', images[index]);
    });

    expect(titleElement).toBeInTheDocument();

    expect(typeElement).toBeInTheDocument();
    expect(bedroomsCountElement).toBeInTheDocument();
    expect(adultsCountElement).toBeInTheDocument();

    expect(priceElement).toBeInTheDocument();

    expect(goodsTitleElement).toBeInTheDocument();
    goodsElements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });

    expect(hostTitleElement).toBeInTheDocument();

    expect(descriptionElement).toBeInTheDocument();

    expect(nearbyOffersTitleElement).toBeInTheDocument();
  });
});
