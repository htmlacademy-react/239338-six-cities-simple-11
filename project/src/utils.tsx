import { DateTime } from 'luxon';

import { sortingOptions } from './const';
import { SortingOption } from './types/sorting-option';


export const pluralize = (number: number, caption: string) => `${ number } ${ caption }${ number !== 1 ? 's' : '' }`;

export const getFormattedDate = (ISODate: string, format: string) => DateTime.fromISO(ISODate).toFormat(format);

export const getSortingOptionByType = (type: string) => sortingOptions.find((option) => option.type === type) as SortingOption;
