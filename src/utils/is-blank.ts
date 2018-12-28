import isEmpty from './is-empty'
import isString from './is-string'

/*
  A value is blank if it is empty or a whitespace string.
  ```javascript
  isBlank();                // true (as isEmpty)
  isBlank(null);            // true (as isEmpty)
  isBlank(undefined);       // true (as isEmpty)
  isBlank('');              // true (as isEmpty)
  isBlank([]);              // true (as isEmpty)
  isBlank('\n\t');          // true
  isBlank('  ');            // true
  isBlank({});              // false
  isBlank('\n\t Hello');    // false
  isBlank('Hello world');   // false
  isBlank([1,2,3]);         // false
  ```
 */

export default function isBlank(target: any): boolean {
  return isEmpty(target) || (isString(target) && /\S/.test(target) === false)
}
