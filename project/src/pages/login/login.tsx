import { useRef, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute, cities } from '../../const';

import { store } from '../../store';
import { loginAction } from '../../store/api-action';

import Header from '../../components/header/header';


const Login = (): JSX.Element => {
  const emailFieldRef = useRef<HTMLInputElement | null>(null);
  const passwordFieldRef = useRef<HTMLInputElement | null>(null);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailFieldRef.current && passwordFieldRef.current) {
      store.dispatch(loginAction({
        login: emailFieldRef.current.value,
        password: passwordFieldRef.current.value
      }));
    }
  };

  return (
    <div className="page page--gray page--login">
      <Header
        hasNav= { false }
      />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>

            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={ handleFormSubmit }
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>

                <input
                  ref={ emailFieldRef }
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  pattern="[a-zA-Z]{1}([a-zA-Z0-9\-_\.]{1,})?[a-zA-Z0-9]{1}@[a-zA-Z]{1}([a-zA-Z0-9\-_\.]{1,})?[a-zA-Z0-9]{1}\.[a-zA-Z]{2,}"
                  title="Type correct e-mail adress"
                  required
                />
              </div>

              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>

                <input
                  ref={ passwordFieldRef }
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  pattern="\S{2,}"
                  title="Password must have at least one letter and digit"
                  required
                />
              </div>

              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>

          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={`${ AppRoute.Root }?${ cities[0].toLowerCase() }`}>
                <span>{ cities[0] }</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};


export default Login;
