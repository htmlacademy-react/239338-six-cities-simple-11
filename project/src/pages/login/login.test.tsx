import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NameSpace, AppRoute, AuthorizationStatus } from '../../const';
import { makeMockEmail, makeMockPassword } from '../../test-mocks';

import HistoryRouter from '../../components/history-router/history-router';
import Login from './login';


const history = createMemoryHistory();
const mockStore = configureMockStore();

const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Unknown,
    user: undefined
  }
});

const mockEmail = makeMockEmail();
const mockPassword = makeMockPassword();


describe('Page: Login', () => {
  it('should render "Login" when user navigate to "/login"', async () => {
    history.push(AppRoute.Login);

    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <Login/>
        </HistoryRouter>
      </Provider>,
    );


    const signInItems = screen.getAllByText(/Sign in/i);

    const emailLabel = screen.getByLabelText(/E-mail/i);
    const emailField = screen.getByTestId('email-field');

    const passwordLabel = screen.getByLabelText(/Password/i);
    const passwordField = screen.getByTestId('password-field');

    const linkItem = screen.getByTestId('locations-link');


    signInItems.forEach((item) => {
      expect(item).toBeInTheDocument();
    });

    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();

    expect(linkItem).toBeInTheDocument();

    await userEvent.type(emailField, mockEmail);
    await userEvent.type(passwordField, mockPassword);

    expect(screen.getByDisplayValue(mockEmail)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockPassword)).toBeInTheDocument();
  });
});
