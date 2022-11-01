import React from "react";


const ReviewsForm = (): JSX.Element => (
  <form className="reviews__form form" action="#" method="post">
    <label className="reviews__label form__label" htmlFor="review">Your review</label>

    <div className="reviews__rating-form form__rating">
      {
        [
          'perfect',
          'good',
          'not bad',
          'badly',
          'terribly'
        ].map((rating, index, ratings) => {
          const ratingValue = ratings.length - index;
          const ratingID = `${ ratingValue }-stars`;

          return (
            <React.Fragment key={ ratingID }>
              <input id={ ratingID } className="form__rating-input visually-hidden" name="rating" value={ ratingValue } type="radio"/>

              <label htmlFor={ ratingID } className="reviews__rating-label form__rating-label" title={ rating }>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </React.Fragment>
          );
        })
      }
    </div>

    <textarea id="review" className="reviews__textarea form__textarea" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>

    <div className="reviews__button-wrapper">
      <p className="reviews__help">To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.</p>

      <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
    </div>
  </form>
);


export default ReviewsForm;
