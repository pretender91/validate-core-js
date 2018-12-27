import { Validator } from './validator'

export default function<T extends Object>(
  target: object,
  rules: { [key: string]: Validator<T> | Array<Validator<T>> }
): { valid: boolean; errors: Map<string, string[]> } {
  const errors = new Map<string, string[]>()

  function doneForKey(key: string, error?: string): void {
    if (!error) {
      return
    }
    const errorArray = errors.get(key)
    if (errorArray) {
      errorArray.push(error)
      return
    }
    errors.set(key, [error])
  }

  for (const key in rules) {
    const done = doneForKey.bind(undefined, key)
    const value = Reflect.get(target, key)
    const validators = rules[key]
    if (Array.isArray(validators)) {
      validators.forEach(validator => {
        validator(value, done)
      })
    } else {
      validators(value, done)
    }
  }

  return { valid: errors.size === 0, errors }
}
