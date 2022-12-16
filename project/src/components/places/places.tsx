import { Offers } from '../../types/offers';

import { pluralize } from '../../utils';

import PlacesSorting from '../places-sorting/places-sorting';
import PlaceCard from '../place-card/place-card';
import Map from '../map/map';


type PlacesProps = {
  currentCity: string;
  offers: Offers;
}


const Places = (props: PlacesProps): JSX.Element => {
  const { currentCity, offers } = props;


  return (
    <>
      <section
        data-testid="cities-places"
        className="cities__places places"
      >
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{ pluralize(offers.length, 'place') } to stay in { currentCity }</b>

        <PlacesSorting/>

        <div className="cities__places-list places__list tabs__content">
          {
            offers.map((offer) => (
              <PlaceCard
                key= { offer.id }
                parentClass= 'cities'
                place= { offer }
                hasMouseEvents
              />
            ))
          }
        </div>
      </section>

      <div className="cities__right-section">
        <Map
          location={ offers[0].city.location }
          offers={ offers }
          parentClass='cities'
        />
      </div>
    </>
  );
};


export default Places;
