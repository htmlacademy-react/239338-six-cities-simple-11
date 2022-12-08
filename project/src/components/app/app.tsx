import { Routes, Route } from 'react-router-dom';

import browserHistory from '../../browser-history';
import { AppRoute } from '../../const';

import Main from '../../pages/main/main';
import Room from '../../pages/room/room';
import Login from '../../pages/login/login';
import NotFound from '../../pages/not-found/not-found';

import HistoryRouter from '../history-router/history-router';
import ScrollFix from '../scroll-fix/scroll-fix';
import Loader from '../loader/loader';


const App = (): JSX.Element => (
  <HistoryRouter history={ browserHistory }>
    <ScrollFix/>
    <Loader/>

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
