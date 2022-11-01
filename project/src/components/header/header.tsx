import { Link } from 'react-router-dom';

import { AppRoute } from '../../const';

import HeaderNav from '../header-nav/header-nav';


type HeaderProps = {
  isLogged: boolean;
  hasNav?: boolean;
  isMain?: boolean;
}


const Header = (props: HeaderProps): JSX.Element => {
  const { isLogged, hasNav = true, isMain = false } = props;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            {
              isMain ? (
                <span className="header__logo-link header__logo-link--active">
                  <img className="header__logo" src="img/logo.svg" width="81" height="41" alt="6 cities logo"/>
                </span>
              ) : (
                <Link className="header__logo-link" to={ AppRoute.Root }>
                  <img className="header__logo" src="img/logo.svg" width="81" height="41" alt="6 cities logo"/>
                </Link>
              )
            }
          </div>

          {
            hasNav && (
              <HeaderNav
                isLogged= { isLogged }
              />
            )
          }
        </div>
      </div>
    </header>
  );
};


export default Header;
