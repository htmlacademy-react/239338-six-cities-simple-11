import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AppRoute } from '../../const';

import Main from '../../pages/main/main';
import Room from '../../pages/room/room';
import Login from '../../pages/login/login';
import NotFound from '../../pages/not-found/not-found';


type AppProps = {
  isLogged: boolean;
  resultsCount: number;
}


const App = (props: AppProps): JSX.Element => {
  const { isLogged, resultsCount } = props;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ AppRoute.Root }
        >
          <Route
            index
            element={
              <Main
                isLogged= { isLogged }
                resultsCount= { resultsCount }
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};


export default App;
