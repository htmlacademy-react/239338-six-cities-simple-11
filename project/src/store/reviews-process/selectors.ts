import { NameSpace, ReviewsSendingStatus } from '../../const';

import { AppState } from '../../types/state';
import { Reviews } from '../../types/reviews';


export const getReviewsSendingStatus = (state: AppState): ReviewsSendingStatus => state[NameSpace.Reviews].sendingStatus;

export const getCurrentReviews = (state: AppState): Reviews => state[NameSpace.Reviews].currentReviews;
