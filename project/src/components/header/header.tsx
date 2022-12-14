import { Link } from 'react-router-dom';

import { AppRoute } from '../../const';

import HeaderLogo from '../header-logo/header-logo';
import HeaderNav from '../header-nav/header-nav';


type HeaderProps = {
  hasNav?: boolean;
  isMain?: boolean;
}


const Header = (props: HeaderProps): JSX.Element => {
  const { hasNav = true, isMain = false } = props;


  return (
    <header
      data-testid="header"
      className="header"
    >
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            {
              isMain ? (
                <span
                  data-testid="header-logo-link"
                  className="header__logo-link header__logo-link--active"
                >
                  <HeaderLogo/>
                </span>
              ) : (
                <Link
                  data-testid="header-logo-link"
                  className="header__logo-link"
                  to={ AppRoute.Root}
                >
                  <HeaderLogo/>
                </Link>
              )
            }
          </div>

          {
            hasNav && <HeaderNav/>
          }
        </div>
      </div>
    </header>
  );
};


export default Header;
