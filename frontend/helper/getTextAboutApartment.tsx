export function getTextAboutApartment(rooms:number, square:string):string {
  return rooms === 0 ? `Квартира-студия ${square} м²` : `${rooms}-комнатная ${square} м²`;
}
