import { Person } from './person';
import { City } from './city';
import { Location } from './location';
import { Review } from './review';

export type Offer = {
  id: number;
  title: string;
  description: string;
  type: string;
  price: number;
  bedrooms: number;
  maxAdults: number;
  rating: number;
  isPremium: boolean;
  previewImage: string;
  host: Person;
  city: City;
  location: Location;
  images: string[];
  goods: string[];
  reviews: Review[];
};

export type Offers = Offer[];
