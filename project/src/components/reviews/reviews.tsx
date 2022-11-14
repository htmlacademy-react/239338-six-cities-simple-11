import { Review } from '../../types/review';

import ReviewsItem from '../reviews-item/reviews-item';
import ReviewsForm from '../reviews-form/reviews-form';


type ReviewsProps = {
  parentClass: string;
  reviews: Review[];
  isLogged: boolean;
}


const Reviews = (props: ReviewsProps): JSX.Element => {
  const { parentClass, reviews, isLogged } = props;
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
              reviews.map((review) => (
                <ReviewsItem
                  key={ review.id }
                  review={ review }
                />
              ))
            }
          </ul>
        )
      }

      { isLogged && <ReviewsForm/> }
    </section>
  );
};


export default Reviews;
