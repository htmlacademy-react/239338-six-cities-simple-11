import { useState, Fragment } from 'react';

import { pluralize } from '../../utils';


type FormData = {
  rating: number;
  comment: string;
}


const enum FieldName {
  Rating = 'rating',
  Comment = 'comment'
}

const ratings = [
  'perfect',
  'good',
  'not bad',
  'badly',
  'terribly'
];

const MIN_COMMENT_LENGTH = 50;


const isFormInvalid = (formData: FormData) => !formData[FieldName.Rating] || formData[FieldName.Comment].trim().length < MIN_COMMENT_LENGTH;


const ReviewsForm = (): JSX.Element => {
  const [formData, setFormData] = useState({
    [FieldName.Rating]: 0,
    [FieldName.Comment]: ''
  });

  const handleFormElementChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.target;

    setFormData({...formData, [name]: evt.target.name === FieldName.Rating ? Number(value) : value });
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
                  name={ FieldName.Rating }
                  type="radio"
                  value={ ratingValue }
                  checked={ ratingValue === formData[FieldName.Rating] }
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
        name={ FieldName.Comment }
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={ formData[FieldName.Comment] }
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
