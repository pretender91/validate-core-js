import isNull from './is-null'
import isUndefined from './is-undefined'

export default function isNone(target: any): target is null | undefined {
  return isNull(target) || isUndefined(target)
}
