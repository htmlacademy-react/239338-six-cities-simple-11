import { Link } from 'react-router-dom';

import { AppRoute, Cities } from '../../const';

import Header from '../../components/header/header';
import PlaceCard from '../../components/place-card/place-card';


type MainProps = {
  isLogged: boolean;
  resultsCount: number;
}


const Main = (props: MainProps): JSX.Element => {
  const { isLogged, resultsCount } = props;
  const isEmpty = resultsCount === 0;

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
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>

                  <b className="places__found">
                    { resultsCount } places to stay in Amsterdam
                  </b>

                  <form className="places__sorting" action="#" method="get">
                    <span className="places__sorting-caption">Sort by </span>

                    <span className="places__sorting-type" tabIndex={ 0 }>
                      Popular
                      <svg className="places__sorting-arrow" width="7" height="4">
                        <use xlinkHref="#icon-arrow-select"></use>
                      </svg>
                    </span>

                    <ul className="places__options places__options--custom places__options--opened">
                      <li className="places__option places__option--active" tabIndex={ 0 }>Popular</li>
                      <li className="places__option" tabIndex={ 0 }>Price: low to high</li>
                      <li className="places__option" tabIndex={ 0 }>Price: high to low</li>
                      <li className="places__option" tabIndex={ 0 }>Top rated first</li>
                    </ul>
                  </form>

                  <div className="cities__places-list places__list tabs__content">
                    <PlaceCard
                      parentClass= 'cities'
                    />
                    <PlaceCard
                      parentClass= 'cities'
                    />
                    <PlaceCard
                      parentClass= 'cities'
                    />
                    <PlaceCard
                      parentClass= 'cities'
                    />
                    <PlaceCard
                      parentClass= 'cities'
                    />
                  </div>
                </section>
              )
            }

            <div className="cities__right-section">
              {
                isEmpty || (
                  <section className="cities__map map"></section>
                )
              }
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};


export default Main;
