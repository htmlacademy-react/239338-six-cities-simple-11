import { Marker } from 'leaflet';
import { Location } from './location';
import { City } from './city';
import { User } from './user';


export type Offer = {
  bedrooms: number;
  city: City;
  description: string;
  goods: string[];
  host: User;
  id: number;
  images: string[];
  isPremium: boolean;
  location: Location;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
};

export type OfferMarker = {
  id: number;
  marker: Marker;
}

export type Offers = Offer[];

export type OffersMarkers = OfferMarker[];

