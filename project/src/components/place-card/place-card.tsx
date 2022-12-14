import { Link } from 'react-router-dom';

import { AppRoute } from '../../const';
import { Offer } from '../../types/offers';

import { store } from '../../store';
import { setSelectedOfferID } from '../../store/offers-process/offers-process';

import Rating from '../rating/rating';


type PlaceCardProps = {
  parentClass: string;
  place: Offer;
  hasMouseEvents?: boolean;
}


const dispatch = store.dispatch;


const PlaceCard = (props: PlaceCardProps): JSX.Element => {
  const { parentClass, place, hasMouseEvents = false } = props;
  const { id, isPremium, previewImage, price, rating, title, type } = place;


  const handlePlaceCardMouseEnter = () => {
    dispatch(setSelectedOfferID({
      selectedOfferID: id
    }));
  };

  const handlePlaceCardMouseLeave = () => {
    dispatch(setSelectedOfferID({
      selectedOfferID: undefined
    }));
  };


  return (
    <article
      data-testid="place-card"
      className={ `${ parentClass }__card place-card`}
      onMouseEnter={ hasMouseEvents ? handlePlaceCardMouseEnter : undefined }
      onMouseLeave={ hasMouseEvents ? handlePlaceCardMouseLeave : undefined }
    >
      {
        isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )
      }

      <div className={ `${ parentClass }__image-wrapper place-card__image-wrapper` }>
        <Link to={ `${ AppRoute.Root }offer/${ id }` }>
          <img
            data-testid="place-card-image"
            className="place-card__image" src={ previewImage } width="260" height="200" alt="Place"
          />
        </Link>
      </div>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{ price }</b>

            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
        </div>

        <Rating
          parentClass= 'place-card'
          value= { rating }
        />

        <h2 className="place-card__name">
          <Link to={ `${ AppRoute.Root }offer/${ id }` }>{ title }</Link>
        </h2>

        <p className="place-card__type">{ type }</p>
      </div>
    </article>
  );
};


export default PlaceCard;
