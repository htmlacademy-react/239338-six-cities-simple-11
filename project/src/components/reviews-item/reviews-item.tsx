import { Review } from '../../types/reviews';

import { getFormattedDate } from '../../utils';

import User from '../user/user';
import Rating from '../rating/rating';


type ReviewItemProps = {
  review: Review;
}


const ReviewsItem = (props: ReviewItemProps): JSX.Element => {
  const { review } = props;
  const { user, rating, comment, date } = review;


  return (
    <li
      data-testid="reviews-item"
      className="reviews__item"
    >
      <User
        user={ user }
        parentClass='reviews'
      />

      <div className="reviews__info">
        <Rating
          parentClass= 'reviews'
          value= { rating }
        />

        <p className="reviews__text">
          { comment }
        </p>

        <time
          data-testid="reviews-time"
          className="reviews__time"
          dateTime={ getFormattedDate(date, 'yyyy-MM-dd') }
        >
          { getFormattedDate(date, 'MMMM yyyy') }
        </time>
      </div>
    </li>
  );
};


export default ReviewsItem;
