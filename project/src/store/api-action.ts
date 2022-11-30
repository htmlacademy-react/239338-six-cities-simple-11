import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { ApiRoute, AuthorizationStatus } from '../const';

import { AuthData } from '../types/auth-data';
import { User } from '../types/user';
import { Offers } from '../types/offers';
import { AppDispatch, State } from '../types/state.js';

import { saveToken, dropToken } from '../services/token';

import { setAuthorizationStatus, setDataLoadingStatus, setUser, setOffers } from './action';


export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<User>(ApiRoute.Login);

      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setUser(data));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const { data } = await api.post<User>(ApiRoute.Login, {email, password});
    const { token } = data;

    saveToken(token);

    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUser(data));
  },
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(ApiRoute.Logout);

    dropToken();

    dispatch(setUser(undefined));
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  },
);


export const getOffers = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'offers/get',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setDataLoadingStatus(false));

    const { data } = await api.get<Offers>(ApiRoute.Offers);

    dispatch(setOffers(data));
    dispatch(setDataLoadingStatus(true));
  }
);
