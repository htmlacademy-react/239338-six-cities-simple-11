import Header from '../../components/header/header';


const NotFoundScreen = (): JSX.Element => (
  <div className="page page--gray page--login">
    <Header
      isLogged= { false }
      hasNav= { false }
    />

    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login"
          style=
            {{
              paddingTop: '40vh'
            }}
        >
          <h1 className="login__title">404 Not Found</h1>
        </section>

        <section className="locations locations--login locations--current"
          style=
            {{
              alignItems: 'flex-start',
              paddingTop: '40vh'
            }}
        >
          <div className="locations__item">
            <a className="locations__item-link" href="#">
              <span>Back to Main</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  </div>
);


export default NotFoundScreen;
