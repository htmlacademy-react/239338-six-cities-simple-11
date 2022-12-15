import { render, screen } from '@testing-library/react';

import { makeMockUser } from '../../test-mocks';

import User from './user';


const mockUser = makeMockUser();
const mockRegularUser = {
  ...mockUser,
  isPro: false
};
const mockProUser = {
  ...mockUser,
  isPro: true
};


describe('Component: User', () => {
  it('should render avatar and name correctly', () => {
    render(
      <User
        parentClass='mock-user'
        user={ mockUser }
      />
    );


    const avatarElement = screen.getByTestId('user-avatar');
    const nameElement = screen.getByText(mockUser.name);

    expect(avatarElement).toBeInTheDocument();
    expect(avatarElement).toHaveAttribute('src', mockUser.avatarUrl);
    expect(avatarElement).toHaveAttribute('alt', mockUser.name);

    expect(nameElement).toBeInTheDocument();
  });


  it('should not render Pro label for a regular user', () => {
    render(
      <User
        parentClass='mock-user'
        user={ mockRegularUser }
      />
    );


    const proStatusElement = screen.queryByText('Pro');

    expect(proStatusElement).not.toBeInTheDocument();
  });


  it('should render Pro label for a pro user', () => {
    render(
      <User
        parentClass='mock-user'
        user={ mockProUser }
      />
    );


    const proStatusElement = screen.queryByText('Pro');

    expect(proStatusElement).toBeInTheDocument();
  });
});

