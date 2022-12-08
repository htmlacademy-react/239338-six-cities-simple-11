import { NameSpace, AuthorizationStatus } from '../../const';

import { AppState } from '../../types/state';
import { AppUser } from '../../types/user';


export const getAuthorizationStatus = (state: AppState): AuthorizationStatus => state[NameSpace.User].authorizationStatus;

export const getUser = (state: AppState): AppUser | undefined => state[NameSpace.User].user;
