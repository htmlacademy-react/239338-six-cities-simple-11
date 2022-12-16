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
  it('should render correctly', async () => {
    history.push(AppRoute.Login);

    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <Login/>
        </HistoryRouter>
      </Provider>,
    );


    const headerElement = screen.getByTestId('header');

    const emailLabel = screen.getByLabelText(/E-mail/i);
    const emailField = screen.getByTestId('email-field');

    const passwordLabel = screen.getByLabelText(/Password/i);
    const passwordField = screen.getByTestId('password-field');

    const locationsLinkElement = screen.getByTestId('locations-link');


    expect(headerElement).toBeInTheDocument();

    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();

    expect(locationsLinkElement).toBeInTheDocument();

    await userEvent.type(emailField, mockEmail);
    await userEvent.type(passwordField, mockPassword);

    expect(screen.getByDisplayValue(mockEmail)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockPassword)).toBeInTheDocument();
  });
});
