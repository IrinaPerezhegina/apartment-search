export function convertedDate(string:string):string {
  const myArray = JSON.stringify(string).split(/([0-9]+)/);
  if (myArray[1] === '1') {
    myArray[1] = 'I';
  }
  if (myArray[1] === '2') {
    myArray[1] = 'II';
  }
  if (myArray[1] === '3') {
    myArray[1] = 'III';
  }
  if (myArray[1] === '4') {
    myArray[1] = 'IV';
  }
  return `${myArray[1]} квартал ${myArray[3]}`;
}
