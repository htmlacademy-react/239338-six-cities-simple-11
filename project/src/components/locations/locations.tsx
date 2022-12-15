import { SyntheticEvent } from 'react';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';

import { CITIES } from '../../const';

import { getCityNameByHref } from '../../utils';
import { useAppSelector } from '../../hooks';

import { store } from '../../store';
import { setCurrentCity } from '../../store/offers-process/offers-process';
import { getCurrentCity } from '../../store/offers-process/selectors';



const Locations = (): JSX.Element => {
  const currentCity = useAppSelector(getCurrentCity);


  const handleLocationLinkClick = (evt: SyntheticEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    store.dispatch(setCurrentCity({
      currentCity: getCityNameByHref(evt.currentTarget.getAttribute('href') as string)
    }));
  };


  return (
    <div className="tabs">
      <section
        data-testid="locations"
        className="locations container"
      >
        <ul className="locations__list tabs__list">
          {
            CITIES.map((city) => {
              const isActive = city === currentCity;

              return (
                <li key={ city } className="locations__item">
                  <a
                    data-testid="locations-link"
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
