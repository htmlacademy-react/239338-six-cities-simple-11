import { Link } from 'react-router-dom';

import { AppRoute, Cities } from '../../const';
import { Offers } from '../../types/offers';

import Header from '../../components/header/header';
import Places from '../../components/places/places';


type MainProps = {
  isLogged: boolean;
  offers: Offers;
}


const Main = (props: MainProps): JSX.Element => {
  const { isLogged, offers } = props;

  const offersCount = offers.length;
  const isEmpty = offersCount === 0;

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
                Cities.map((city, index) => (
                  <li key={ city.id } className="locations__item">
                    <Link className={ `locations__item-link tabs__item ${ index === 0 ? 'tabs__item--active' : '' }` } to={`${ AppRoute.Root }?${ city.id }`}>
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
                <section className="cities__no-places">
                  <div className="cities__status-wrapper tabs__content">
                    <b className="cities__status">No places to stay available</b>

                    <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
                  </div>
                </section>
              ) : (
                <Places
                  city= { Cities[0].name }
                  offers= { offers }
                />
              )
            }

            <div className="cities__right-section">
              { isEmpty || <section className="cities__map map"></section> }
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};


export default Main;
