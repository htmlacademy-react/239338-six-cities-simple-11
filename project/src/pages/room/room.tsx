import { useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';

import { pluralize } from '../../utils';
import { useAppSelector } from '../../hooks';

import { store } from '../../store';
import { getCurrentOfferAction } from '../../store/api-action';
import { clearCurrentOffer, clearCurrentOfferNearby } from '../../store/offers-process/offers-process';
import { getCurrentOffer, getNearbyOffers } from '../../store/offers-process/selectors';

import NotFound from '../not-found/not-found';

import Header from '../../components/header/header';
import Rating from '../../components/rating/rating';
import User from '../../components/user/user';
import Reviews from '../../components/reviews/reviews';
import Map from '../../components/map/map';
import PlaceCard from '../../components/place-card/place-card';


const MAX_IMAGES_AMOUNT = 6;

const dispatch = store.dispatch;


const Room = (): JSX.Element => {
  const routeParams = useParams();

  const currentOffer = useAppSelector(getCurrentOffer);
  const offersNearby = useAppSelector(getNearbyOffers);

  const currentOfferID = routeParams.id;


  useLayoutEffect(() => {
    if (currentOfferID) {
      dispatch(getCurrentOfferAction(currentOfferID));
    }

    return () => {
      dispatch(clearCurrentOffer);
      dispatch(clearCurrentOfferNearby);
    };
  }, [currentOfferID]);


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
    goods
  } = currentOffer;


  return (
    <div className="page">
      <Header/>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                images.slice(0, MAX_IMAGES_AMOUNT).map((image) => (
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

              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>

                <User
                  user={ host }
                  parentClass='property'
                  classPrefix='host'
                />

                <div className="property__description">
                  <p className="property__text">{ description }</p>
                </div>
              </div>

              <Reviews
                parentClass='property'
              />
            </div>
          </div>

          {
            offersNearby && (
              <Map
                location={ city.location }
                offers={ offersNearby.concat(currentOffer) }
                parentClass='property'
                currentOfferID= { currentOffer.id }
              />
            )
          }
        </section>

        {
          offersNearby && (
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
