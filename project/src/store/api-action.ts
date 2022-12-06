import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { ApiRoute } from '../const';

import { AppDispatch, AppState } from '../types/state.js';
import { AppUser, AppUserData } from '../types/user';
import { Offer, Offers } from '../types/offers';
import { Reviews, ReviewData } from '../types/reviews';

import { saveToken, dropToken } from '../services/token';


export const checkAuthAction = createAsyncThunk<
  AppUser,
  undefined,
  {
    dispatch: AppDispatch;
    state: AppState;
    extra: AxiosInstance;
  }
>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const { data } = await api.get<AppUser>(ApiRoute.Login);

    return data;
  }
);

export const loginAction = createAsyncThunk<
  AppUser,
  AppUserData,
  {
    dispatch: AppDispatch;
    state: AppState;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const { data } = await api.post<AppUser>(ApiRoute.Login, {email, password});
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
    state: AppState;
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
  Reviews,
  string,
  {
    dispatch: AppDispatch;
    state: AppState;
    extra: AxiosInstance;
  }
>(
  'reviews/get',
  async (currentOfferID, { dispatch, extra: api }) => {
    const { data } = await api.get<Reviews>(`${ ApiRoute.Comments }/${ currentOfferID }`);

    return data;
  }
);

export const sendReviewAction = createAsyncThunk<
  Reviews,
  {
    review: ReviewData;
    currentOfferID: number | undefined;
  },
  {
    dispatch: AppDispatch;
    state: AppState;
    extra: AxiosInstance;
  }
>(
  'reviews/send',
  async ({review: {rating, comment}, currentOfferID}, {dispatch, extra: api}) => {
    const { data } = await api.post<Reviews>(`${ ApiRoute.Comments }/${ currentOfferID || '' }`, {rating, comment});

    return data;
  },
);


export const getOffersAction = createAsyncThunk<
  Offers,
  undefined,
  {
    dispatch: AppDispatch;
    state: AppState;
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
    state: AppState;
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
    state: AppState;
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
