import { Person } from './person';

export type Review = {
  id: number;
  user: Person;
  rating: number;
  comment: string;
  date: string;
};

export type ReviewData = {
  data: {
    rating: number;
    comment: string;
  };
  currentOfferID: number | undefined;
};
