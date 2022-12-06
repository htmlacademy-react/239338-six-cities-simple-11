import { NameSpace, ReviewsSendingStatus } from '../../const';
import { Review } from '../../types/review';

import { State } from '../../types/state';


export const getReviewsSendingStatus = (state: State): ReviewsSendingStatus => state[NameSpace.Reviews].sendingStatus;

export const getCurrentReviews = (state: State): Review[] => state[NameSpace.Reviews].currentReviews;
