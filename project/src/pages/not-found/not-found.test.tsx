import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import HistoryRouter from '../../components/history-router/history-router';
import NotFoundScreen from './not-found';


describe('Page: NotFound', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <NotFoundScreen />
      </HistoryRouter>,
    );

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('Back to Main')).toBeInTheDocument();
  });
});
