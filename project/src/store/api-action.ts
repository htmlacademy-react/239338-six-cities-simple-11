import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { ApiRoute } from '../const';

import { AppDispatch, State } from '../types/state.js';
import { AuthData } from '../types/auth-data';
import { User } from '../types/user';
import { Offer, Offers } from '../types/offers';
import { Review, ReviewData } from '../types/review';

import { saveToken, dropToken } from '../services/token';


export const checkAuthAction = createAsyncThunk<
  User,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const { data } = await api.get<User>(ApiRoute.Login);

    return data;
  }
);

export const loginAction = createAsyncThunk<
  User,
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

    return data;
  }
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
  },
);


export const getReviewsAction = createAsyncThunk<
  Review[],
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'reviews/get',
  async (currentOfferID, { dispatch, extra: api }) => {
    const { data } = await api.get<Review[]>(`${ ApiRoute.Comments }/${ currentOfferID }`);

    return data;
  }
);

export const sendReviewAction = createAsyncThunk<
  Review[],
  ReviewData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'reviews/send',
  async ({data: {rating, comment}, currentOfferID}, {dispatch, extra: api}) => {
    const { data } = await api.post<Review[]>(`${ ApiRoute.Comments }/${ currentOfferID || '' }`, {rating, comment});

    return data;
  },
);


export const getOffersAction = createAsyncThunk<
  Offers,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'offers/get',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offers>(ApiRoute.Offers);

    return data;
  }
);

export const getNearbyOffersAction = createAsyncThunk<
  Offers,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'offers/getNearby',
  async (currentOfferID, { dispatch, extra: api }) => {
    const { data } = await api.get<Offers>(`${ ApiRoute.Offers }/${ currentOfferID }/nearby`);

    return data;
  }
);

export const getCurrentOfferAction = createAsyncThunk<
  Offer,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'offers/getCurrent',
  async (currentOfferID, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer>(`${ ApiRoute.Offers }/${ currentOfferID }`);

    dispatch(getReviewsAction(currentOfferID));
    dispatch(getNearbyOffersAction(currentOfferID));

    return data;
  }
);
