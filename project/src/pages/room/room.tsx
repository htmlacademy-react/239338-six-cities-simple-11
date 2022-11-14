import { useParams } from 'react-router-dom';

import { Offers } from '../../types/offers';
import { pluralize } from '../../utils';

import NotFound from '../not-found/not-found';

import Header from '../../components/header/header';
import Rating from '../../components/rating/rating';
import Reviews from '../../components/reviews/reviews';
import Map from '../../components/map/map';
import PlaceCard from '../../components/place-card/place-card';


type RoomProps = {
  isLogged: boolean;
  offers: Offers;
}


const Room = (props: RoomProps): JSX.Element => {
  const { isLogged, offers } = props;

  const params = useParams();
  const currentOfferID = Number(params.id);

  const currentOffer = offers.find((offer) => offer.id === currentOfferID);
  const offersNearby = offers.filter((offer) => offer.id !== currentOfferID);

  if (!currentOffer) {
    return <NotFound/>;
  }

  const {
    title,
    description,
    type,
    price,
    bedrooms,
    maxAdults,
    rating,
    isPremium,
    host,
    city,
    images,
    goods,
    reviews
  } = currentOffer;

  return (
    <div className="page">
      <Header
        isLogged= { isLogged }
      />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                images.map((image) => (
                  <div key={ image } className="property__image-wrapper">
                    <img className="property__image" src={ image } alt="Studio"/>
                  </div>
                ))
              }
            </div>
          </div>

          <div className="property__container container">
            <div className="property__wrapper">
              {
                isPremium && (
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                )
              }

              <div className="property__name-wrapper">
                <h1 className="property__name">{ title }</h1>
              </div>

              <Rating
                parentClass= 'property'
                value= { rating }
                hasValueOutput
              />

              <ul className="property__features">
                <li className="property__feature property__feature--entire">{ type }</li>
                <li className="property__feature property__feature--bedrooms">{ pluralize(bedrooms, 'bedroom') }</li>
                <li className="property__feature property__feature--adults">Max { pluralize(maxAdults, 'adult') }</li>
              </ul>

              <div className="property__price">
                <b className="property__price-value">&euro;{ price }</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>

              {
                goods.length !== 0 && (
                  <div className="property__inside">
                    <h2 className="property__inside-title">What&apos;s inside</h2>

                    <ul className="property__inside-list">
                      {
                        goods.map((item) => (
                          <li key={ item } className="property__inside-item">{ item }</li>
                        ))
                      }
                    </ul>
                  </div>
                )
              }

              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>

                <div className="property__host-user user">
                  <div className={ `property__avatar-wrapper ${ host.isPro ? 'property__avatar-wrapper--pro' : '' } user__avatar-wrapper` }>
                    <img className="property__avatar user__avatar" src={ host.avatarUrl } width="74" height="74" alt={ host.name }/>
                  </div>

                  <span className="property__user-name">{ host.name }</span>

                  {
                    host.isPro && <span className="property__user-status">Pro</span>
                  }
                </div>

                {
                  description && (
                    <div className="property__description">
                      <p className="property__text">{ description }</p>
                    </div>
                  )
                }
              </div>

              <Reviews
                reviews={ reviews }
                isLogged={ isLogged }
                parentClass='property'
              />
            </div>
          </div>

          <Map
            location={ city.location }
            offers={ offersNearby }
            parentClass='property'
          />
        </section>

        {
          offersNearby.length !== 0 && (
            <div className="container">
              <section className="near-places places">
                <h2 className="near-places__title">Other places in the neighbourhood</h2>

                <div className="near-places__list places__list">
                  {
                    offersNearby.map((offer) => (
                      <PlaceCard
                        key= { offer.id }
                        parentClass= 'near-places'
                        place= { offer }
                      />
                    ))
                  }
                </div>
              </section>
            </div>
          )
        }
      </main>
    </div>
  );
};


export default Room;
