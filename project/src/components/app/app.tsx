import { Routes, Route } from 'react-router-dom';

import { AppRoute } from '../../const';

import Main from '../../pages/main/main';
import Room from '../../pages/room/room';
import Login from '../../pages/login/login';
import NotFound from '../../pages/not-found/not-found';


const App = (): JSX.Element => (
  <Routes>
    <Route
      path={ AppRoute.Root }
      element={ <Main/> }
    />

    <Route
      path={ AppRoute.Room }
      element={ <Room/> }
    />

    <Route
      path={ AppRoute.Login }
      element={ <Login/> }
    />

    <Route
      path="*"
      element={ <NotFound/> }
    />
  </Routes>
);


export default App;
