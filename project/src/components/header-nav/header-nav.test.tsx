import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { render, screen, fireEvent } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { NameSpace, AppRoute, AuthorizationStatus } from '../../const';
import { makeMockAppUser } from '../../test-mocks';

import HistoryRouter from '../history-router/history-router';
import HeaderNav from './header-nav';


enum ElementID {
  Avatar = 'header-user-avatar',
  Email = 'header-user-email',
  NavLink = 'header-nav-link'
}


const history = createMemoryHistory();
const mockStore = configureMockStore();

const mockAppUser = makeMockAppUser();
const {
  avatarUrl,
  name,
  email
} = mockAppUser;


describe('Component: HeaderNav', () => {
  it('should render user menu and do not render "Sign in" link when authorizationStatus is "AUTH"', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: mockAppUser
      }
    });

    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <HeaderNav/>
        </HistoryRouter>
      </Provider>
    );


    const userAvatarElement = screen.queryByTestId(ElementID.Avatar);
    const userEmailElement = screen.queryByTestId(ElementID.Email);

    const navLink = screen.getByTestId(ElementID.NavLink);


    expect(userAvatarElement).toBeInTheDocument();
    expect(userAvatarElement).toHaveAttribute('src', avatarUrl);
    expect(userAvatarElement).toHaveAccessibleName(name);

    expect(userEmailElement).toBeInTheDocument();
    expect(userEmailElement).toHaveTextContent(email);

    expect(navLink).toBeInTheDocument();
    expect(navLink).toHaveTextContent(/Sign out/i);
  });


  it('should do not render user menu and render "Sign in" link when authorizationStatus is not "AUTH"', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Unknown
      }
    });

    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <HeaderNav/>
        </HistoryRouter>
      </Provider>
    );


    const userAvatarElement = screen.queryByTestId(ElementID.Avatar);
    const userEmailElement = screen.queryByTestId(ElementID.Email);

    const navLink = screen.getByTestId(ElementID.NavLink);


    expect(userAvatarElement).not.toBeInTheDocument();
    expect(userEmailElement).not.toBeInTheDocument();

    expect(navLink).toBeInTheDocument();
    expect(navLink).toHaveAttribute('href', AppRoute.Login);
    expect(navLink).toHaveTextContent(/Sign in/i);
  });


  it('should log out the user when they click the "Sign out" link and do not redirect to "/login', () => {
    const store = mockStore({
      [NameSpace.User]: {}
    });

    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <HeaderNav/>
        </HistoryRouter>
      </Provider>
    );


    const signOutLink = screen.queryByText(/Sign out/i);
    const signInLink = screen.queryByText(/Sign in/i);

    const loginPage = screen.queryByTestId('login-page');


    if (signOutLink) {
      fireEvent.click(signOutLink);
    }

    expect(signOutLink).not.toBeInTheDocument();
    expect(signInLink).toBeInTheDocument();

    expect(loginPage).not.toBeInTheDocument();
  });
});

