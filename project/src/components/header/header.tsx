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
            <a className={ `header__logo-link ${ isMain ? 'header__logo-link--active' : '' }` } href={ isMain ? '' : '#' }>
              <img className="header__logo" src="img/logo.svg" width="81" height="41" alt="6 cities logo"/>
            </a>
          </div>

          {
            hasNav ? (
              <nav className="header__nav">
                <ul className="header__nav-list">
                  {
                    isLogged ? (
                      <>
                        <li className="header__nav-item user">
                          <div className="header__nav-profile">
                            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                            <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                          </div>
                        </li>

                        <li className="header__nav-item">
                          <a className="header__nav-link" href="#">
                            <span className="header__signout">Sign out</span>
                          </a>
                        </li>
                      </>
                    ) : (
                      <li className="header__nav-item user">
                        <a className="header__nav-link header__nav-link--profile" href="#">
                          <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                          <span className="header__login">Sign in</span>
                        </a>
                      </li>
                    )
                  }
                </ul>
              </nav>
            ) : ''
          }
        </div>
      </div>
    </header>
  );
};


export default Header;
