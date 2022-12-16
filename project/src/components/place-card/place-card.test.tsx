import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { NameSpace, AppRoute } from '../../const';
import { makeMockOffer } from '../../test-mocks';

import HistoryRouter from '../../components/history-router/history-router';
import PlaceCard from './place-card';


const history = createMemoryHistory();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  [NameSpace.Offers]: {
    selectedOfferID: undefined
  }
});


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
  id,
  previewImage,
  price,
  title,
  type
} = mockOffer;


describe('Component: PlaceCard', () => {
  it('should render correctly', () => {
    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <PlaceCard
            parentClass='mock-place-card'
            place={ mockOffer }
          />
        </HistoryRouter>
      </Provider>
    );

    const linkElements = screen.getAllByRole('link');
    const imageElement = screen.getByTestId('place-card-image');
    const priceElement = screen.getByText(`€${ price }`);
    const ratingElement = screen.getByTestId('rating');
    const titleElement = screen.getByText(title);
    const typeElement = screen.getByText(type);


    linkElements.forEach((link) => {
      expect(link).toHaveAttribute('href', `${ AppRoute.Root }offer/${ id }`);
    });

    expect(imageElement).toHaveAttribute('src', previewImage);
    expect(priceElement).toBeInTheDocument();
    expect(ratingElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(typeElement).toBeInTheDocument();
  });


  it('should render a premium label if the property is premium', () => {
    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <PlaceCard
            parentClass='mock-place-card'
            place={ mockPremiumOffer }
          />
        </HistoryRouter>
      </Provider>
    );


    const premiumLabelElement = screen.queryByText(/Premium/i);

    expect(premiumLabelElement).toBeInTheDocument();
  });


  it('should not render a premium label if the property is regular', () => {
    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <PlaceCard
            parentClass='mock-place-card'
            place={ mockRegularOffer }
          />
        </HistoryRouter>
      </Provider>
    );


    const premiumLabelElement = screen.queryByText(/Premium/i);

    expect(premiumLabelElement).not.toBeInTheDocument();
  });
});

