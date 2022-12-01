import { Offers } from './offers';
import { store } from '../store/index.js';


export type State = {
  currentCity: string;
  sortingType: string;
  isDataLoaded: boolean;
  offers: Offers;
};

export type AppDispatch = typeof store.dispatch;
