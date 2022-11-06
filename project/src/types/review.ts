import { Person } from './person';

export type Review = {
  author: Person;
  rating: number;
  comment: string;
  date: string;
};
