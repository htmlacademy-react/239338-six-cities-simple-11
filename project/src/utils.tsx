export const pluralize = (number: number, caption: string) => `${ number } ${ caption }${ number !== 1 ? 's' : '' }`;
