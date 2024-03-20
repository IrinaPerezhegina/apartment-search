/**
 * Проверка, значение - простой объект

 */
export default function isPlainObject(value:{ __proto__:string }) {
  // eslint-disable-next-line no-proto
  return value && (!value.__proto__ || Object.getPrototypeOf(value).constructor.name === 'Object');
}
