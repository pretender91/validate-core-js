import { Validator } from './validator'

export default function<T>(
  value: T | undefined | null,
  ...validators: Array<Validator<T>>
): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  function done(error?: string) {
    if (!error) {
      return
    }
    errors.push(error)
  }

  for (let index = 0; index < validators.length; index++) {
    const validator = validators[index]
    validator(value, done)
  }

  return { valid: errors.length === 0, errors }
}
