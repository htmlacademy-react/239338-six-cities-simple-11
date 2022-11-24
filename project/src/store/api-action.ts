import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { ApiRoute } from '../const';

import { Offers } from '../types/offers';
import { AppDispatch, State } from '../types/state.js';

import { setOffers } from './action';


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
    const { data } = await api.get<Offers>(ApiRoute.Offers);

    dispatch(setOffers(data));
  }
);
