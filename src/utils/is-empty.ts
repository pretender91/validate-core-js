import isArray from './is-array'
import isNone from './is-none'
import isNumber from './is-number'
import isObject from './is-object'
import isString from './is-string'

/*
  isEmpty();                 // true
  isEmpty(null);             // true
  isEmpty(undefined);        // true
  isEmpty('');               // true
  isEmpty([]);               // true
  isEmpty({ size: 0});       // true
  isEmpty({});               // false
  isEmpty('Adam Hawkins');   // false
  isEmpty([0,1,2]);          // false
  isEmpty('\n\t');           // false
  isEmpty('  ');             // false
  isEmpty({ size: 1 })       // false
  isEmpty({ size: () => 0 }) // false
 */

export default function isEmpty(target: any): boolean {
  if (isNone(target)) {
    return true
  }

  if (isString(target)) {
    return target.length === 0
  }

  if (isArray(target)) {
    return target.length === 0
  }

  // Map, Set, WeakMap and etc
  if (isObject(target)) {
    const size = Reflect.get(target, 'size')
    if (isNumber(size)) {
      return size === 0
    }
  }

  return false
}
