import { AuthorizationStatus } from '../../const';
import { UserProcess } from '../../types/state';

import { makeMockAppUser } from '../../test-mocks';

import { checkAuthAction, loginAction, logoutAction } from '../api-action';

import { userProcess } from './user-process';


const appUser = makeMockAppUser();


const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: undefined
};

const unauthorizedState: UserProcess = {
  authorizationStatus: AuthorizationStatus.NoAuth,
  user: undefined
};

const authorizedState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Auth,
  user: appUser
};


describe('Reducer: user', () => {
  it('without additional parameters should return the initial state', () => {
    expect(userProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });


  describe('checkAuthAction test', () => {
    it('should set authorizationStatus to "AUTH" and set user if checkAuthAction fulfilled', () => {
      const state = initialState;

      expect(userProcess.reducer(state, { type: checkAuthAction.fulfilled.type, payload: appUser }))
        .toEqual(authorizedState);
    });
    it('should set authorizationStatus to "NO_AUTH" and do not set user if checkAuthAction rejected', () => {
      const state = initialState;

      expect(userProcess.reducer(state, { type: checkAuthAction.rejected.type }))
        .toEqual(unauthorizedState);
    });
  });


  describe('loginAction test', () => {
    it('should set authorizationStatus to "AUTH" and set user if loginAction fulfilled', () => {
      const state = initialState;

      expect(userProcess.reducer(state, { type: loginAction.fulfilled.type, payload: appUser }))
        .toEqual(authorizedState);
    });
    it('should set authorizationStatus to "NO_AUTH" and do not set user if loginAction rejected', () => {
      const state = initialState;

      expect(userProcess.reducer(state, { type: loginAction.rejected.type }))
        .toEqual(unauthorizedState);
    });
  });


  describe('logoutAction test', () => {
    it('should set authorizationStatus to "NO_AUTH" and reset user if logoutAction fulfilled', () => {
      const state = authorizedState;

      expect(userProcess.reducer(state, { type: logoutAction.fulfilled.type }))
        .toEqual(unauthorizedState);
    });

    it('should do not change authorizationStatus and do not reset user if logoutAction rejected', () => {
      const state = authorizedState;

      expect(userProcess.reducer(state, { type: logoutAction.rejected.type }))
        .toEqual(authorizedState);
    });
  });
});
