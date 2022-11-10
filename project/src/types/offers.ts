import { Person } from './person';
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
  images: string[];
  goods: string[];
  reviews: Review[];
};

export type Offers = Offer[];
