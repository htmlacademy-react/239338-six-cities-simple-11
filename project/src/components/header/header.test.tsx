import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { NameSpace } from '../../const';

import HistoryRouter from '../../components/history-router/history-router';
import Header from './header';


enum ElementID {
  LogoLink = 'header-logo-link',
  Logo = 'header-logo',
  Nav = 'header-nav'
}


const history = createMemoryHistory();
const mockStore = configureMockStore();

const store = mockStore({
  [NameSpace.User]: {}
});


describe('Component: Header', () => {
  it('should have a link to "/" with logo and navigation by default', () => {
    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <Header/>
        </HistoryRouter>
      </Provider>
    );


    const logoLinkElement = screen.getByTestId(ElementID.LogoLink);
    const logoElement = screen.getByTestId(ElementID.Logo);

    const navElement = screen.getByTestId(ElementID.Nav);


    expect(logoLinkElement).toHaveAttribute('href', '/');
    expect(logoElement).toBeInTheDocument();

    expect(navElement).toBeInTheDocument();
  });


  it('should not have a link to "/" on the main page', () => {
    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <Header
            isMain
          />
        </HistoryRouter>
      </Provider>
    );


    const logoLinkElement = screen.getByTestId(ElementID.Logo);


    expect(logoLinkElement).not.toHaveAttribute('href', '/');
  });


  it('should not have a navigation when it is not needed', () => {
    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <Header
            hasNav={ false }
          />
        </HistoryRouter>
      </Provider>
    );


    const navElement = screen.queryByTestId(ElementID.Nav);


    expect(navElement).not.toBeInTheDocument();
  });
});

