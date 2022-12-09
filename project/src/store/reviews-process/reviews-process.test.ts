import { makeMockReview } from '../../test-mocks';
import { ReviewsSendingStatus } from '../../const';

import { getReviewsAction, sendReviewAction } from '../api-action';

import { reviewsProcess, initialState, clearCurrentReviews } from './reviews-process';


const reviews = [makeMockReview(), makeMockReview()];


describe('Reducer: reviews', () => {
  it('without additional parameters should return the initial state', () => {
    expect(reviewsProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  describe('getReviewsAction test', () => {
    it('should set currentReviews if getReviewsAction fulfilled', () => {
      const state = initialState;

      expect(reviewsProcess.reducer(state, { type: getReviewsAction.fulfilled.type, payload: reviews }))
        .toEqual({
          ...initialState,
          currentReviews: reviews
        });
    });
    it('should do not set currentReviews if getReviewsAction rejected', () => {
      const state = initialState;

      expect(reviewsProcess.reducer(state, { type: getReviewsAction.rejected.type }))
        .toEqual(initialState);
    });
  });


  describe('sendReviewAction test', () => {
    it('should reset sendingStatus and do not set currentReviews if sendReviewAction pending', () => {
      const state = initialState;

      expect(reviewsProcess.reducer(state, { type: sendReviewAction.pending.type }))
        .toEqual({
          sendingStatus: ReviewsSendingStatus.Unknown,
          currentReviews: []
        });
    });
    it('should set sendingStatus to "SUCCESS" and set currentReviews if sendReviewAction fulfilled', () => {
      const state = initialState;

      expect(reviewsProcess.reducer(state, { type: sendReviewAction.fulfilled.type, payload: reviews }))
        .toEqual({
          sendingStatus: ReviewsSendingStatus.Success,
          currentReviews: reviews
        });
    });
    it('should set sendingStatus to "ERROR" and do not set currentReviews if sendReviewAction rejected', () => {
      const state = initialState;

      expect(reviewsProcess.reducer(state, { type: sendReviewAction.rejected.type }))
        .toEqual({
          sendingStatus: ReviewsSendingStatus.Error,
          currentReviews: []
        });
    });
  });


  describe('clearCurrentReviews test', () => {
    it('should clear the existing reviews', () => {
      const state = {
        sendingStatus: ReviewsSendingStatus.Unknown,
        currentReviews: reviews
      };

      expect(reviewsProcess.reducer(state, clearCurrentReviews()))
        .toEqual({
          sendingStatus: ReviewsSendingStatus.Unknown,
          currentReviews: []
        });
    });
  });
});
