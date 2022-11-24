import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AppRoute } from '../../const';
import { offers } from '../../mocks/offers';

import { getOffers } from '../../store/action';

import Main from '../../pages/main/main';
import Room from '../../pages/room/room';
import Login from '../../pages/login/login';
import NotFound from '../../pages/not-found/not-found';

import ScrollFix from '../scroll-fix/scroll-fix';


type AppProps = {
  isLogged: boolean;
}


const App = (props: AppProps): JSX.Element => {
  const { isLogged } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOffers({
      offers
    }));
  });

  return (
    <BrowserRouter>
      <ScrollFix/>

      <Routes>
        <Route
          path={ AppRoute.Root }
          element={
            <Main
              isLogged= { isLogged }
            />
          }
        />

        <Route
          path={ AppRoute.Room }
          element={
            <Room
              isLogged= { isLogged }
            />
          }
        />

        <Route
          path={ AppRoute.Login }
          element={
            <Login/>
          }
        />

        <Route
          path="*"
          element={
            <NotFound/>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};


export default App;
