import { useState, FormEvent, Fragment, useEffect } from 'react';

import { ReviewsSendingStatus } from '../../const';

import { useAppSelector } from '../../hooks';

import { store } from '../../store';
import { sendReviewAction } from '../../store/api-action';
import { getCurrentOffer } from '../../store/offers-process/selectors';
import { getReviewsSendingStatus } from '../../store/reviews-process/selectors';


type FormData = {
  rating: number;
  comment: string;
}


const enum FieldName {
  Rating = 'rating',
  Comment = 'comment'
}

const enum CommentLength {
  Min = 50,
  Max = 300
}


const RATINGS = [
  'perfect',
  'good',
  'not bad',
  'badly',
  'terribly'
];

const INITIAL_FORM_STATE = {
  [FieldName.Rating]: 0,
  [FieldName.Comment]: ''
};


const checkIsCommentInvalid = (comment: string) => {
  const commentLength = comment.trim().length;

  return commentLength < CommentLength.Min || commentLength > CommentLength.Max;
};

const checkIsFormInvalid = (formData: FormData) => !formData[FieldName.Rating] || checkIsCommentInvalid(formData[FieldName.Comment]);


const ReviewsForm = (): JSX.Element => {
  const currentOfferID = useAppSelector(getCurrentOffer);
  const reviewsSendingStatus = useAppSelector(getReviewsSendingStatus);

  const [ isBlocked, setIsBlocked ] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    setIsBlocked(true);

    store.dispatch(sendReviewAction({
      review: formData,
      currentOfferID: currentOfferID?.id
    }));
  };

  const handleFormElementChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.target;

    setFormData({...formData, [name]: evt.target.name === FieldName.Rating ? Number(value) : value });
  };

  useEffect(() => {
    setIsBlocked(false);

    if (reviewsSendingStatus === ReviewsSendingStatus.Success) {
      setFormData(INITIAL_FORM_STATE);
    }
  }, [reviewsSendingStatus]);

  return (
    <form
      data-testid="reviews-form"
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={ handleFormSubmit }
      style={{
        pointerEvents: isBlocked ? 'none' : 'auto'
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <div className="reviews__rating-form form__rating">
        {
          RATINGS.map((rating, index) => {
            const ratingValue = RATINGS.length - index;
            const ratingID = `${ ratingValue }-stars`;

            return (
              <Fragment key={ ratingID }>
                <input
                  data-testid="reviews-form-rating"
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
        data-testid="reviews-form-textarea"
        id="review"
        className="reviews__textarea form__textarea"
        name={ FieldName.Comment }
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={ formData[FieldName.Comment] }
        onChange={ handleFormElementChange }
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{ CommentLength.Min }</b> and at most <b className="reviews__text-amount">{ CommentLength.Max }</b> characters.
        </p>

        <button
          data-testid="reviews-form-submit-btn"
          className="reviews__submit form__submit button"
          type="submit"
          disabled={ isBlocked || checkIsFormInvalid(formData) }
        >
          Submit
        </button>
      </div>
    </form>
  );
};


export { CommentLength, RATINGS };

export default ReviewsForm;
