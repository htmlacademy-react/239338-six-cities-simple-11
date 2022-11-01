import { Link } from 'react-router-dom';

import Rating from '../../components/rating/rating';


type PlaceCardProps = {
  parentClass: string;
}


const PlaceCard = (props: PlaceCardProps): JSX.Element => {
  const { parentClass } = props;

  return (
    <article className={ `${ parentClass }__card place-card` }>
      <div className="place-card__mark">
        <span>Premium</span>
      </div>

      <div className={ `${ parentClass }__image-wrapper place-card__image-wrapper` }>
        <Link to="offer/1">
          <img className="place-card__image" src="img/apartment-01.jpg" width="260" height="200" alt="Place"/>
        </Link>
      </div>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;120</b>

            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
        </div>

        <Rating
          parentClass= 'place-card'
          value= { 4 }
        />

        <h2 className="place-card__name">
          <Link to="offer/1">
            Beautiful &amp; luxurious apartment at great location
          </Link>
        </h2>

        <p className="place-card__type">Apartment</p>
      </div>
    </article>
  );
};


export default PlaceCard;
