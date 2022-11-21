import { useAppSelector } from '../../hooks/use-app-selector';

import Header from '../../components/header/header';
import Locations from '../../components/locations/locations';
import NoPlaces from '../../components/no-places/no-places';
import Places from '../../components/places/places';


type MainProps = {
  isLogged: boolean;
}


const Main = (props: MainProps): JSX.Element => {
  const { isLogged } = props;

  const currentCity = useAppSelector((state) => state.currentCity);
  const offers = useAppSelector((state) => state.offers).filter((offer) => offer.city.name === currentCity);

  const isEmpty = offers.length === 0;

  return (
    <div className="page page--gray page--main">
      <Header
        isLogged= { isLogged }
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
