import { render, screen } from '@testing-library/react';

import { makeMockReview } from '../../test-mocks';

import ReviewsItem from './reviews-item';


const mockReview = makeMockReview();

mockReview.date = '2022-12-18T13:48:27.113Z';


describe('Component: ReviewsItem', () => {
  it('should render correctly', () => {
    render(
      <ReviewsItem
        review={ mockReview }
      />
    );


    const userElement = screen.getByTestId('user');
    const ratingElement = screen.getByTestId('rating');

    const commentElement = screen.getByText(mockReview.comment);

    const dateElement = screen.getByTestId('reviews-time');

    expect(userElement).toBeInTheDocument();
    expect(ratingElement).toBeInTheDocument();

    expect(commentElement).toBeInTheDocument();

    expect(dateElement).toBeInTheDocument();
    expect(dateElement).toHaveAttribute('datetime', '2022-12-18');
    expect(dateElement).toHaveTextContent('December 2022');
  });
});

