import { Offer } from './offers';


export type SortingOption = {
  type: string;
  text: string;
  function: (offerLeft: Offer, offerRight: Offer) => number;
};
