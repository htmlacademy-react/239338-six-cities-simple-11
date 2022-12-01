import { Review } from '../../types/review';

import { AuthorizationStatus } from '../../const';
import { getDateMilliseconds } from '../../utils';

import { useAppSelector } from '../../hooks/use-app-selector';

import ReviewsItem from '../reviews-item/reviews-item';
import ReviewsForm from '../reviews-form/reviews-form';


type ReviewsProps = {
  parentClass: string;
}


const MAX_REVIEWS_AMOUNT = 10;


const sortReviews = (reviewLeft: Review, reviewRight: Review) => getDateMilliseconds(reviewRight.date) - getDateMilliseconds(reviewLeft.date);


const Reviews = (props: ReviewsProps): JSX.Element => {
  const { parentClass } = props;

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const reviews = useAppSelector((state) => state.currentOfferReviews);

  const reviewsAmount = reviews.length;


  return (
    <section className={ `${parentClass}__reviews reviews` }>
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{ reviewsAmount }</span>
      </h2>

      {
        reviewsAmount !== 0 && (
          <ul className="reviews__list">
            {
              reviews.slice().sort(sortReviews).slice(0, MAX_REVIEWS_AMOUNT).map((review) => (
                <ReviewsItem
                  key={ review.id }
                  review={ review }
                />
              ))
            }
          </ul>
        )
      }

      { authorizationStatus === AuthorizationStatus.Auth && <ReviewsForm/> }
    </section>
  );
};


export default Reviews;
