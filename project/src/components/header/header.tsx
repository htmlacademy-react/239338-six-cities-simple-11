import { Link } from 'react-router-dom';

import { AppRoute } from '../../const';

import HeaderLogo from '../header-logo/header-logo';
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
                  <HeaderLogo/>
                </span>
              ) : (
                <Link className="header__logo-link" to={ AppRoute.Root }>
                  <HeaderLogo/>
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
