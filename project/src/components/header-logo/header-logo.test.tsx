import { render, screen } from '@testing-library/react';

import HeaderLogo from './header-logo';


describe('Component: HeaderLogo', () => {
  it('should render alt text', () => {
    render(
      <HeaderLogo/>
    );


    const component = screen.getByTestId('header-logo');


    expect(component).toHaveAccessibleName(/6 cities logo/i);
  });
});

