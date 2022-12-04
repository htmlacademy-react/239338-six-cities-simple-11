import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

import { AppRoute, ApiRoute, AuthorizationStatus, ReviewsSendingStatus } from '../const';

import { AuthData } from '../types/auth-data';
import { User } from '../types/user';
import { Offer, Offers } from '../types/offers';
import { Review, ReviewData } from '../types/review';
import { AppDispatch, State } from '../types/state.js';

import { saveToken, dropToken } from '../services/token';

import { setAuthorizationStatus, setDataLoadingStatus, setUser, setOffers, redirectToRoute, setReviews, setReviewsSendingStatus, setCurrentOffer, setCurrentOfferNearbyOffers } from './action';


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
    try {
      const { data } = await api.post<User>(ApiRoute.Login, {email, password});
      const { token } = data;

      saveToken(token);

      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setUser(data));
      dispatch(redirectToRoute(AppRoute.Root));
    } catch (error) {
      toast.error('An error occurred, unable to log in.');
    }
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
    try {
      await api.delete(ApiRoute.Logout);

      dropToken();

      dispatch(setUser(undefined));
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    } catch (error) {
      toast.error('An error occurred, unable to log out.');
    }
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

    try {
      const { data } = await api.get<Offers>(ApiRoute.Offers);

      dispatch(setOffers(data));
    } catch {
      toast.error('An error occurred, the places could not be loaded.');
    }

    dispatch(setDataLoadingStatus(true));
  }
);

export const getOffersNearby = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'offers/getNearbyOffers',
  async (currentOfferID, { dispatch, extra: api }) => {
    dispatch(setDataLoadingStatus(false));

    try {
      const { data } = await api.get<Offers>(`${ ApiRoute.Offers }/${ currentOfferID }/nearby`);

      dispatch(setCurrentOfferNearbyOffers(data));
    } catch {
      toast.error('An error occurred, the offers nearby could not be loaded.');
    }

    dispatch(setDataLoadingStatus(true));
  }
);

export const getOffer = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'offers/getCurrent',
  async (currentOfferID, { dispatch, extra: api }) => {
    dispatch(setDataLoadingStatus(false));

    try {
      const { data } = await api.get<Offer>(`${ ApiRoute.Offers }/${ currentOfferID }`);

      dispatch(setCurrentOffer(data));

      dispatch(getReviews(currentOfferID));
      dispatch(getOffersNearby(currentOfferID));
    } catch {
      toast.error('An error occurred, the data of the offer could not be loaded.');
    }

    dispatch(setDataLoadingStatus(true));
  }
);


export const getReviews = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'reviews/get',
  async (currentOfferID, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Review[]>(`${ ApiRoute.Comments }/${ currentOfferID }`);

      dispatch(setReviews(data));
    } catch (error) {
      toast.error('An error occurred, the reviews could not be loaded.');
    }
  }
);

export const sendReview = createAsyncThunk<
  void,
  ReviewData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'reviews/send',
  async ({data: {rating, comment}, currentOfferID}, {dispatch, extra: api}) => {
    try {
      const { data } = await api.post<Review[]>(`${ ApiRoute.Comments }/${ currentOfferID || '' }`, {rating, comment});

      dispatch(setReviews(data));
      dispatch(setReviewsSendingStatus(ReviewsSendingStatus.Success));
    } catch {
      toast.error('An error occurred, the review was not sent.');

      dispatch(setReviewsSendingStatus(ReviewsSendingStatus.Error));
    }
  },
);
