import { useLayoutEffect } from 'react';

import { getSortingOptionByType } from '../../utils';
import { useAppSelector } from '../../hooks';

import { store } from '../../store';
import { clearOffers } from '../../store/offers-process/offers-process';
import { getCurrentCity, getSortingType, getOffers } from '../../store/offers-process/selectors';
import { getOffersAction } from '../../store/api-action';

import Header from '../../components/header/header';
import Locations from '../../components/locations/locations';
import NoPlaces from '../../components/no-places/no-places';
import Places from '../../components/places/places';


const dispatch = store.dispatch;


const Main = (): JSX.Element => {
  const currentCity = useAppSelector(getCurrentCity);

  const currentSortingType = useAppSelector(getSortingType);
  const currentSortingOption = getSortingOptionByType(currentSortingType);

  const offers = useAppSelector(getOffers);
  const currentCityOffers = offers.filter((offer) => offer.city.name === currentCity);
  const sortedOffers = currentCityOffers.sort(currentSortingOption.function);
  const isEmpty = currentCityOffers.length === 0;

  useLayoutEffect(() => {
    dispatch(getOffersAction());

    return () => {
      dispatch(clearOffers);
    };
  }, []);

  return (
    <div className="page page--gray page--main">
      <Header
        isMain
      />

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
