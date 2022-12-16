import { render, screen } from '@testing-library/react';

import Rating from './rating';


const mockValue = 2.3;


describe('Component: Rating', () => {
  it('should render stars and caption correctly', () => {
    render(
      <Rating
        parentClass='mock-rating'
        value={ mockValue }
      />
    );


    const starsElement = screen.getByTestId('rating-stars');
    const captionElement = screen.getByText('Rating');

    expect(starsElement).toHaveStyle('width: 40%');
    expect(starsElement).toBeInTheDocument();

    expect(captionElement).toBeInTheDocument();
  });


  it('should render value output if it is necessary', () => {
    render(
      <Rating
        parentClass='mock-rating'
        value={ mockValue }
        hasValueOutput
      />
    );


    const valueOutputElement = screen.queryByTestId('rating-value-output');

    expect(valueOutputElement).toBeInTheDocument();
    expect(valueOutputElement).toHaveTextContent(mockValue.toString());
  });


  it('should not render value output if it is not necessary', () => {
    render(
      <Rating
        parentClass='mock-rating'
        value={ mockValue }
      />
    );


    const valueOutputElement = screen.queryByTestId('rating-value-output');

    expect(valueOutputElement).not.toBeInTheDocument();
  });
});

