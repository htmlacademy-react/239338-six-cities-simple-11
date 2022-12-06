import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { NameSpace, ReviewsSendingStatus } from '../../const';
import { ReviewsProcess } from '../../types/state';

import { getReviewsAction, sendReviewAction } from '../api-action';


const initialState: ReviewsProcess = {
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
        toast.error('An error occurred, the reviews could not be loaded.');
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

        toast.error('An error occurred, the review was not sent.');
      });
  }
});

export const { clearCurrentReviews } = reviewsProcess.actions;
