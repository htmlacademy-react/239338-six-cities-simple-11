import { SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';

import { cities } from '../../const';

import { useAppSelector } from '../../hooks/use-app-selector';

import { setCurrentCity } from '../../store/action';


const getCityNameByHref = (href: string) => href.split('#')[1];


const Locations = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentCity = useAppSelector((state) => state.currentCity);

  const handleLocationLinkClick = (evt: SyntheticEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    dispatch(setCurrentCity({
      currentCity: getCityNameByHref(evt.currentTarget.getAttribute('href') as string)
    }));
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            cities.map((city) => {
              const isActive = city === currentCity;

              return (
                <li key={ city } className="locations__item">
                  <a
                    className={ `locations__item-link tabs__item ${ isActive ? 'tabs__item--active' : '' }` }
                    href={ `#${ city }` }
                    onClick={ handleLocationLinkClick }
                    style={{
                      'pointerEvents': isActive ? 'none' : undefined
                    }}
                  >
                    <span>{ city }</span>
                  </a>
                </li>
              );
            })
          }
        </ul>
      </section>
    </div>
  );
};


export default Locations;
