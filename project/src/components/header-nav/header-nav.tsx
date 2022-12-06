import { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';

import { AuthorizationStatus, AppRoute } from '../../const';

import { useAppSelector } from '../../hooks';

import { store } from '../../store';
import { logoutAction } from '../../store/api-action';
import { getAuthorizationStatus, getUser } from '../../store/user-process/selectors';


const HeaderNav = (): JSX.Element => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);

  const handleSignOutLinkClick = (evt: SyntheticEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    store.dispatch(logoutAction());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {
          authorizationStatus === AuthorizationStatus.Auth && user ? (
            <>
              <li className="header__nav-item user">
                <div className="header__nav-profile">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                    <img className="user__avatar" width="20" height="20" src={ user.avatarUrl } alt={ user.name }/>
                  </div>

                  <span className="header__user-name user__name">{ user.email }</span>
                </div>
              </li>

              <li className="header__nav-item">
                <Link
                  className="header__nav-link"
                  to={ AppRoute.Login }
                  onClick= { handleSignOutLinkClick }
                >
                  <span className="header__signout">Sign out</span>
                </Link>
              </li>
            </>
          ) : (
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={ AppRoute.Login }>
                <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                <span className="header__login">Sign in</span>
              </Link>
            </li>
          )
        }
      </ul>
    </nav>
  );
};


export default HeaderNav;
