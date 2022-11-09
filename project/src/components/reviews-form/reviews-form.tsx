import { useState, Fragment } from 'react';

import { pluralize } from '../../utils';


type FormData = {
  rating: number;
  comment: string;
}


const ratings = [
  'perfect',
  'good',
  'not bad',
  'badly',
  'terribly'
];

const MIN_COMMENT_LENGTH = 50;


const isFormInvalid = (formData: FormData) => !formData.rating || formData.comment.trim().length < MIN_COMMENT_LENGTH;


const ReviewsForm = (): JSX.Element => {
  const [formData, setFormData] = useState({
    rating: 0,
    comment: ''
  });

  const handleFormElementChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.target;

    setFormData({...formData, [name]: isNaN(Number(value)) ? value : Number(value) });
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <div className="reviews__rating-form form__rating">
        {
          ratings.map((rating, index) => {
            const ratingValue = ratings.length - index;
            const ratingID = `${ ratingValue }-stars`;

            return (
              <Fragment key={ ratingID }>
                <input
                  id={ ratingID }
                  className="form__rating-input visually-hidden"
                  name="rating"
                  type="radio"
                  value={ ratingValue }
                  checked={ ratingValue === formData.rating }
                  onChange={ handleFormElementChange }
                />

                <label htmlFor={ ratingID } className="reviews__rating-label form__rating-label" title={ rating }>
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"></use>
                  </svg>
                </label>
              </Fragment>
            );
          })
        }
      </div>

      <textarea
        id="review"
        className="reviews__textarea form__textarea"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={ formData.comment }
        onChange={ handleFormElementChange }
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{ pluralize(MIN_COMMENT_LENGTH, 'character') }</b>.
        </p>

        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={ isFormInvalid(formData) }
        >
          Submit
        </button>
      </div>
    </form>
  );
};


export default ReviewsForm;
