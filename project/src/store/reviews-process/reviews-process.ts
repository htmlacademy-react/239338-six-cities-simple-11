import { createSlice } from '@reduxjs/toolkit';

import { NameSpace, ReviewsSendingStatus } from '../../const';
import { ReviewsProcess } from '../../types/state';

import { showError } from '../../utils';

import { getReviewsAction, sendReviewAction } from '../api-action';


export const initialState: ReviewsProcess = {
  sendingStatus: ReviewsSendingStatus.Unknown,
  currentReviews: []
};


export const reviewsProcess = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    clearCurrentReviews: (state) => {
      state.currentReviews = [];
    }
  },

  extraReducers(builder) {
    builder
      .addCase(getReviewsAction.fulfilled, (state, action) => {
        state.currentReviews = action.payload;
      })
      .addCase(getReviewsAction.rejected, () => {
        showError('the reviews could not be loaded');
      })

      .addCase(sendReviewAction.pending, (state) => {
        state.sendingStatus = ReviewsSendingStatus.Unknown;
      })
      .addCase(sendReviewAction.fulfilled, (state, action) => {
        state.sendingStatus = ReviewsSendingStatus.Success;

        state.currentReviews = action.payload;
      })
      .addCase(sendReviewAction.rejected, (state) => {
        state.sendingStatus = ReviewsSendingStatus.Error;

        showError('the review was not sent');
      });
  }
});

export const { clearCurrentReviews } = reviewsProcess.actions;
