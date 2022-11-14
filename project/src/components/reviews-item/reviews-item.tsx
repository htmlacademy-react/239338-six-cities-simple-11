import { getFormattedDate } from '../../utils';

import { Review } from '../../types/review';

import Rating from '../rating/rating';


type ReviewItemProps = {
  review: Review;
}


const ReviewItem = (props: ReviewItemProps): JSX.Element => {
  const { review } = props;
  const { user, rating, comment, date } = review;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={ user.avatarUrl } width="54" height="54" alt={ user.name }/>
        </div>

        <span className="reviews__user-name">
          { user.name }
        </span>
      </div>

      <div className="reviews__info">
        <Rating
          parentClass= 'reviews'
          value= { rating }
        />

        <p className="reviews__text">
          { comment }
        </p>

        <time className="reviews__time" dateTime={ getFormattedDate(date, 'yyyy-MM-dd') }>
          { getFormattedDate(date, 'dd MMMM yyyy') }
        </time>
      </div>
    </li>
  );
};


export default ReviewItem;
