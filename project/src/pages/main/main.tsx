import { Link } from 'react-router-dom';

import { AppRoute, cities } from '../../const';
import { Offers } from '../../types/offers';

import Header from '../../components/header/header';
import NoPlaces from '../../components/no-places/no-places';
import Places from '../../components/places/places';


type MainProps = {
  isLogged: boolean;
  offers: Offers;
}


const Main = (props: MainProps): JSX.Element => {
  const { isLogged, offers } = props;

  const isEmpty = offers.length === 0;

  return (
    <div className="page page--gray page--main">
      <Header
        isLogged= { isLogged }
        isMain
      />

      <main className={`page__main page__main--index ${ isEmpty ? 'page__main--index-empty' : '' }`}>
        <h1 className="visually-hidden">Cities</h1>

        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {
                cities.map((city, index) => (
                  <li key={ city.id } className="locations__item">
                    <Link className={ `locations__item-link tabs__item ${ index === 3 ? 'tabs__item--active' : '' }` } to={`${ AppRoute.Root }?${ city.id }`}>
                      <span>{ city.name }</span>
                    </Link>
                  </li>
                ))
              }
            </ul>
          </section>
        </div>

        <div className="cities">
          <div className={`cities__places-container ${ isEmpty ? 'cities__places-container--empty' : '' } container`}>
            {
              isEmpty ? (
                <NoPlaces
                  currentCityName= { cities[3].name }
                />
              ) : (
                <Places
                  currentCity= { cities[3] }
                  offers= { offers }
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
