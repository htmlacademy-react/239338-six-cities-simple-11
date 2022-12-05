import { useLayoutEffect } from 'react';

import { getSortingOptionByType } from '../../utils';
import { useAppSelector } from '../../hooks/use-app-selector';

import { store } from '../../store';
import { setOffers } from '../../store/action';
import { getOffers } from '../../store/api-action';

import Header from '../../components/header/header';
import Loader from '../../components/loader/loader';
import Locations from '../../components/locations/locations';
import NoPlaces from '../../components/no-places/no-places';
import Places from '../../components/places/places';


const dispatch = store.dispatch;

const clearOffers = () => {
  dispatch(setOffers([]));
};


const Main = (): JSX.Element => {
  const currentCity = useAppSelector((state) => state.currentCity);

  const currentSortingType = useAppSelector((state) => state.sortingType);
  const currentSortingOption = getSortingOptionByType(currentSortingType);

  const offers = useAppSelector((state) => state.offers);
  const currentCityOffers = offers.filter((offer) => offer.city.name === currentCity);
  const sortedOffers = currentCityOffers.sort(currentSortingOption.function);
  const isEmpty = currentCityOffers.length === 0;

  useLayoutEffect(() => {
    dispatch(getOffers());

    return clearOffers;
  }, []);

  return (
    <div className="page page--gray page--main">
      <Header
        isMain
      />

      <Loader/>

      <main className={`page__main page__main--index ${ isEmpty ? 'page__main--index-empty' : '' }`}>
        <h1 className="visually-hidden">Cities</h1>

        <Locations/>

        <div className="cities">
          <div className={`cities__places-container ${ isEmpty ? 'cities__places-container--empty' : '' } container`}>
            {
              isEmpty ? (
                <NoPlaces
                  currentCity= { currentCity }
                />
              ) : (
                <Places
                  currentCity= { currentCity }
                  offers= { sortedOffers }
                />
              )
            }
          </div>
        </div>
      </main>
    </div>
  );
};


export default Main;
