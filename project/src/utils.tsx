import { DateTime } from 'luxon';


export const pluralize = (number: number, caption: string) => `${ number } ${ caption }${ number !== 1 ? 's' : '' }`;

export const getFormattedDate = (ISODate: string, format: string) => DateTime.fromISO(ISODate).toFormat(format);
