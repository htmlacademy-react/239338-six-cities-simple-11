import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';

import { NameSpace } from '../../const';

import Loader from './loader';


const mockStore = configureMockStore();


describe('Component: Loader', () => {
  it('should render status correctly', () => {
    const store = mockStore({
      [NameSpace.Offers]: {
        isOffersDataLoading: false
      }
    });

    render(
      <Provider store={ store }>
        <Loader/>
      </Provider>
    );


    const statusElement = screen.getByText('Loading...');


    expect(statusElement).toBeInTheDocument();
  });


  it('should be hidden when isOffersDataLoading is "false"', () => {
    const store = mockStore({
      [NameSpace.Offers]: {
        isOffersDataLoading: false
      }
    });

    render(
      <Provider store={ store }>
        <Loader/>
      </Provider>
    );


    const component = screen.getByTestId('loader');


    expect(component).toHaveStyle('display: none');
  });


  it('should not be hidden when isOffersDataLoading is "true"', () => {
    const store = mockStore({
      [NameSpace.Offers]: {
        isOffersDataLoading: true
      }
    });

    render(
      <Provider store={ store }>
        <Loader/>
      </Provider>
    );


    const component = screen.getByTestId('loader');


    expect(component).not.toHaveStyle('display: none');
  });
});

