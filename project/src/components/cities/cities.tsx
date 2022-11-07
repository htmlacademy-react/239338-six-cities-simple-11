import { Offers } from '../../types/offers';

import NoPlaces from '../../components/no-places/no-places';
import Places from '../../components/places/places';


type CitiesProps = {
  currentCityName: string;
  offers: Offers;
}


const Cities = (props: CitiesProps): JSX.Element => {
  const { currentCityName, offers } = props;

  const isEmpty = offers.length === 0;

  return (
    <div className="cities">
      <div className={`cities__places-container ${ isEmpty ? 'cities__places-container--empty' : '' } container`}>
        {
          isEmpty ? (
            <NoPlaces
              currentCityName= { currentCityName }
            />
          ) : (
            <Places
              currentCityName= { currentCityName }
              offers= { offers }
            />
          )
        }

        <div className="cities__right-section">
          { isEmpty || <section className="cities__map map"></section> }
        </div>
      </div>
    </div>
  );
};


export default Cities;
