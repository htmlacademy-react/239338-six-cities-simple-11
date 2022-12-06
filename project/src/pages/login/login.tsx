import { useRef, FormEvent, SyntheticEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AppRoute, AuthorizationStatus } from '../../const';
import { getCityNameByHref, getRandomCity } from '../../utils';

import { store } from '../../store';
import { redirectToRoute } from '../../store/action';
import { loginAction } from '../../store/api-action';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { setCurrentCity } from '../../store/offers-process/offers-process';

import { useAppSelector } from '../../hooks';

import Header from '../../components/header/header';


const randomCity = getRandomCity();


const Login = (): JSX.Element => {
  const dispatch = useDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const emailFieldRef = useRef<HTMLInputElement | null>(null);
  const passwordFieldRef = useRef<HTMLInputElement | null>(null);


  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailFieldRef.current && passwordFieldRef.current) {
      store.dispatch(loginAction({
        email: emailFieldRef.current.value,
        password: passwordFieldRef.current.value
      }));
    }
  };

  const handleLocationLinkClick = (evt: SyntheticEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    dispatch(setCurrentCity({
      currentCity: getCityNameByHref(evt.currentTarget.getAttribute('href') as string)
    }));

    dispatch(redirectToRoute(AppRoute.Root));
  };


  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={ AppRoute.Root }/>;
  }

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
                  pattern="(?=.*[0-9])(?=.*[a-zA-Z])([!@#$%^&*-_]{0,})[0-9a-zA-Z!@#$%^&*-_]{2,}"
                  title="Password must have at least one letter and one digit"
                  required
                />
              </div>

              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>

          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a
                className="locations__item-link"
                href={ `#${ randomCity }` }
                onClick={ handleLocationLinkClick }
              >
                <span>{ randomCity }</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};


export default Login;
