import { Link } from 'react-router-dom';

import { AppRoute } from '../../const';

import Header from '../../components/header/header';


const PADDING_TOP = '40vh';


const NotFound = (): JSX.Element => (
  <div className="page page--gray page--login" data-testid="not-found-page">
    <Header
      hasNav= { false }
    />

    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login"
          style=
            {{
              paddingTop: PADDING_TOP
            }}
        >
          <h1 className="login__title">404 Not Found</h1>
        </section>

        <section className="locations locations--login locations--current"
          style=
            {{
              alignItems: 'flex-start',
              paddingTop: PADDING_TOP
            }}
        >
          <div className="locations__item">
            <Link className="locations__item-link" to={ AppRoute.Root }>
              <span>Back to Main</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  </div>
);


export default NotFound;
