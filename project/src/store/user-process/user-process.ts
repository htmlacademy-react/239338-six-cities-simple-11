import { createSlice } from '@reduxjs/toolkit';

import { NameSpace, AuthorizationStatus } from '../../const';
import { UserProcess } from '../../types/state';

import { showError } from '../../utils';

import { checkAuthAction, loginAction, logoutAction } from '../api-action';


const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: undefined
};


export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;

        state.user = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })

      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;

        state.user = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;

        showError('unable to log in');
      })

      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;

        state.user = undefined;
      })
      .addCase(logoutAction.rejected, () => {
        showError('unable to log out');
      });
  }
});
