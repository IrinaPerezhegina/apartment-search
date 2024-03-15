export function getTextAboutRooms(room:number):string {
  if (room === 0) {
    return 'Ст';
  }
  return `${room}к`;
}
