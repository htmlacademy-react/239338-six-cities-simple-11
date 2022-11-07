import { Link } from 'react-router-dom';

import { AppRoute, cities } from '../../const';
import { Offers } from '../../types/offers';

import Header from '../../components/header/header';
import Cities from '../../components/cities/cities';


type MainProps = {
  isLogged: boolean;
  offers: Offers;
}


const Main = (props: MainProps): JSX.Element => {
  const { isLogged, offers } = props;

  return (
    <div className="page page--gray page--main">
      <Header
        isLogged= { isLogged }
        isMain
      />

      <main className={`page__main page__main--index ${ offers.length === 0 ? 'page__main--index-empty' : '' }`}>
        <h1 className="visually-hidden">Cities</h1>

        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {
                cities.map((city, index) => (
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

        <Cities
          currentCityName={ cities[0].name }
          offers= { offers }
        />
      </main>
    </div>
  );
};


export default Main;
