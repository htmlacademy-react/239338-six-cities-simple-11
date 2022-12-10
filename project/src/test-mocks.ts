import { datatype, lorem, date, name, internet, address, image } from 'faker';

import { RatingValue, OFFERS_SORTING_OPTIONS } from './const';

import { User, AppUser, AppUserData } from './types/user';
import { Offer } from './types/offers';
import { Review } from './types/reviews';


export const makeMockID = (): number => datatype.number();

export const makeMockToken = (): string => datatype.uuid();


export const makeMockUser = (): User => ({
  avatarUrl: internet.avatar(),
  id: makeMockID(),
  isPro: datatype.boolean(),
  name: name.findName()
} as User);

export const makeMockAppUser = (): AppUser => ({
  avatarUrl: internet.avatar(),
  id: makeMockID(),
  isPro: datatype.boolean(),
  name: name.findName(),
  email: internet.email(),
  token: makeMockToken()
} as AppUser);

export const makeMockAppUserData = (): AppUserData => ({
  email: internet.email(),
  password: internet.password()
} as AppUserData);


export const makeMockCity = (): string => address.city();


export const makeMockOffer = (): Offer => ({
  bedrooms: datatype.number(),
  city: {
    location: {
      latitude: Number(address.latitude()),
      longitude: Number(address.longitude()),
      zoom: datatype.number(),
    },
    name: makeMockCity()
  },
  description: lorem.paragraph(),
  goods: [ datatype.string(), datatype.string() ],
  host: makeMockUser(),
  id: makeMockID(),
  images: [ image.imageUrl(), image.imageUrl() ],
  isPremium: datatype.boolean(),
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: datatype.number(),
  },
  maxAdults: datatype.number(),
  previewImage: image.imageUrl(),
  price: datatype.number(),
  rating: datatype.number({min: RatingValue.MIN, max: RatingValue.MAX}),
  title: lorem.words(),
  type: lorem.word()
} as Offer);


export const makeMockReview = (): Review => ({
  comment: lorem.paragraph(),
  date: date.future().toISOString(),
  id: makeMockID(),
  rating: datatype.number({min: RatingValue.MIN, max: RatingValue.MAX}),
  user: makeMockUser()
} as Review);


export const makeMockSortingType = (): string => OFFERS_SORTING_OPTIONS[Math.floor(Math.random() * OFFERS_SORTING_OPTIONS.length)].type;

