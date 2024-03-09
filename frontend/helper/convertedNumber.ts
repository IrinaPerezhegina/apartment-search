export function convertedNumber(str:string):string {
  return `${str?.split('').reverse().join('')
    .match(/\d{0,3}/g)
    .join(' ')
    .split('')
    .reverse()
    .join('')
    .trim()} ₽`;
}
