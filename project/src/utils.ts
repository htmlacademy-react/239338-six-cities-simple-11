import { DateTime } from 'luxon';
import { toast } from 'react-toastify';
import leaflet, { Marker } from 'leaflet';

import { PinParam, sortingOptions, cities } from './const';
import { SortingOption } from './types/sorting-option';


export const pluralize = (number: number, caption: string) => `${ number } ${ caption }${ number !== 1 ? 's' : '' }`;

export const getFormattedDate = (ISODate: string, format: string) => DateTime.fromISO(ISODate).toFormat(format);
export const getDateMilliseconds = (ISODate: string) => DateTime.fromISO(ISODate).toMillis();

export const getCityNameByHref = (href: string) => href.split('#')[1];
export const getRandomCity = () => cities[Math.floor(Math.random() * cities.length)];

export const getSortingOptionByType = (type: string) => sortingOptions.find((option) => option.type === type) as SortingOption;

export const showError = (text: string) => {
  toast.error(`An error occurred, ${ text }.`);
} ;

export const setMarkerIcon = (marker: Marker, iconUrl: string) => {
  marker.setIcon(new leaflet.Icon({
    iconUrl: iconUrl,
    iconSize: [ PinParam.Size.Width, PinParam.Size.Heigh ],
    iconAnchor: [ PinParam.Size.Width / 2, PinParam.Size.Heigh ]
  }));
};
