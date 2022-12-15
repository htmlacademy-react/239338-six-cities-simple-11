import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render, screen, fireEvent } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { datatype } from 'faker';

import { NameSpace } from '../../const';

import ReviewsForm, { CommentLength, RATINGS } from './reviews-form';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  [NameSpace.Offers]: {},
  [NameSpace.Reviews]: {}
});


describe('Component: ReviewsForm', () => {
  it('should render correctly', () => {
    render(
      <Provider store={ store }>
        <ReviewsForm/>
      </Provider>
    );


    const labelElement = screen.getByText(/Your review/i);

    const ratingElements = screen.getAllByTestId('reviews-form-rating');
    const textareaElement = screen.getByTestId('reviews-form-textarea');


    expect(labelElement).toBeInTheDocument();

    expect(ratingElements.length).toBe(RATINGS.length);
    expect(textareaElement).toBeInTheDocument();
  });


  it('should disable submit button correctly', () => {
    render(
      <Provider store={ store }>
        <ReviewsForm/>
      </Provider>
    );


    const submitBtnElement = screen.getByTestId('reviews-form-submit-btn');

    const ratingElements = screen.getAllByTestId('reviews-form-rating');
    const textareaElement = screen.getByTestId('reviews-form-textarea');


    expect(submitBtnElement).toHaveAttribute('disabled');

    fireEvent.click(ratingElements[0]);
    fireEvent.input(textareaElement, {target: {value: datatype.string(CommentLength.Max - 1)}});

    expect(submitBtnElement).not.toHaveAttribute('disabled');

    fireEvent.input(textareaElement, {target: {value: datatype.string(CommentLength.Max + 1)}});

    expect(submitBtnElement).toHaveAttribute('disabled');

    fireEvent.input(textareaElement, {target: {value: datatype.string(CommentLength.Min - 1)}});

    expect(submitBtnElement).toHaveAttribute('disabled');
  });


  it('should submit form correctly', () => {
    render(
      <Provider store={ store }>
        <ReviewsForm/>
      </Provider>
    );


    const component = screen.getByTestId('reviews-form');

    fireEvent.submit(component);

    expect(store.getActions()[0].type).toBe('OFFERS/sendReviewAction');
  });
});

