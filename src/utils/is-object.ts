import isNone from './is-none'

export default function isObject(target: any): target is object {
  return !isNone(target) && typeof target === 'object'
}
