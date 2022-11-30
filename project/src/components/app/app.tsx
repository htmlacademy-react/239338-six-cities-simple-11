import { Routes, Route } from 'react-router-dom';

import { AppRoute } from '../../const';

import Main from '../../pages/main/main';
import Room from '../../pages/room/room';
import Login from '../../pages/login/login';
import NotFound from '../../pages/not-found/not-found';

import ScrollFix from '../scroll-fix/scroll-fix';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';


const App = (): JSX.Element => (
  <HistoryRouter history={ browserHistory }>
    <ScrollFix/>

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
  </HistoryRouter>
);


export default App;
