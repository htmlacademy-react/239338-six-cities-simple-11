import { useState } from 'react';

import { Offers } from '../../types/offers';

import NoPlaces from '../../components/no-places/no-places';
import Places from '../../components/places/places';
import Map from '../map/map';


type CitiesProps = {
  currentCityName: string;
  offers: Offers;
}


const Cities = (props: CitiesProps): JSX.Element => {
  const { currentCityName, offers } = props;
  const [ selectedPlaceID, setSelectedPlaceID ]: [ number | undefined, (selectedPlaceID: number | undefined) => void ] = useState();

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
              setSelectedPlaceID= { setSelectedPlaceID }
            />
          )
        }

        <div className="cities__right-section">
          {
            isEmpty || (
              <Map
                selectedPlaceID= { selectedPlaceID }
              />
            )
          }
        </div>
      </div>
    </div>
  );
};


export default Cities;
