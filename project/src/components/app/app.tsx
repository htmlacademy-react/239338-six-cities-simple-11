import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AppRoute } from '../../const';

import MainScreen from '../../pages/main-screen/main-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';


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
              <MainScreen
                isLogged= { isLogged }
                resultsCount= { resultsCount }
              />
            }
          />

          <Route
            path={ AppRoute.Room }
            element={
              <PropertyScreen
                isLogged= { isLogged }
              />
            }
          />

          <Route
            path={ AppRoute.Login }
            element={
              <LoginScreen />
            }
          />

          <Route
            path="*"
            element={
              <NotFoundScreen />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};


export default App;
