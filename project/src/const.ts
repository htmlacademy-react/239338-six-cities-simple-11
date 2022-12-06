import { Offer } from './types/offers';
import { SortingOption } from './types/sorting-option';


export enum KeyCode {
  Escape = 'Escape',
  Enter = 'Enter'
}

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Room = '/offer/:id'
}

export enum ApiRoute {
  Offers = '/hotels',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout'
}

export enum NameSpace {
  User = 'USER',
  Offers = 'OFFERS',
  Reviews = 'REVIEWS'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum ReviewsSendingStatus {
  Success = 'SUCCESS',
  Error = 'ERROR',
  Unknown = 'UNKNOWN',
}

export const cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
];

export const sortingOptions: SortingOption[] = [
  {
    type: 'default',
    text: 'Popular',
    function: (offerLeft: Offer, offerRight: Offer) => 0
  },
  {
    type: 'price-low-high',
    text: 'Price: low to high',
    function: (offerLeft: Offer, offerRight: Offer) => offerLeft.price - offerRight.price
  },
  {
    type: 'price-high-low',
    text: 'Price: high to low',
    function: (offerLeft: Offer, offerRight: Offer) => offerRight.price - offerLeft.price
  },
  {
    type: 'top-rated',
    text: 'Top rated first',
    function: (offerLeft: Offer, offerRight: Offer) => offerRight.rating - offerLeft.rating
  }
];
