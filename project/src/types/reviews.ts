import { User } from './user';


export type Review = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: User;
};

export type ReviewData = {
  comment: string;
  rating: number;
};

export type Reviews = Review[];
