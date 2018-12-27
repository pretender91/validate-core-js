import { Validator } from './validator'

export default function<T>(
  array: T[],
  ...validators: Array<Validator<T>>
): { valid: boolean; errors: Map<number, string[]> } {
  const errors = new Map<number, string[]>()

  for (let index = 0; index < array.length; index++) {
    const value = array[index]

    validators.forEach(validator => {
      validator(value, error => {
        if (!error) {
          return
        }

        const errorArray = errors.get(index)

        if (errorArray) {
          errorArray.push(error)
          return
        }

        errors.set(index, [error])
      })
    })
  }

  return { valid: errors.size === 0, errors }
}
