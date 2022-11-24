import { Offers } from './offers';
import { store } from '../store/index.js';


export type State = {
  currentCity: string;
  sortingType: string;
  offers: Offers;
};

export type AppDispatch = typeof store.dispatch;
