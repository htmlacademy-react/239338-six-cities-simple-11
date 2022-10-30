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
            <a className={ `header__logo-link ${ isMain ? 'header__logo-link--active' : '' }` } href={ isMain ? '' : '#' }>
              <img className="header__logo" src="img/logo.svg" width="81" height="41" alt="6 cities logo"/>
            </a>
          </div>

          {
            hasNav ? (
              <HeaderNav
                isLogged= { isLogged }
              />
            ) : ''
          }
        </div>
      </div>
    </header>
  );
};


export default Header;
