import { Validator } from '../validator'
import { isNone } from '../utils'
import { ErrorFormatters } from './error-formatter'

type LengthOptions = {
  allowNone?: boolean
  allowBlank?: boolean
  useBetween?: boolean
  exact?: number
  min?: number
  max?: number
}

const defaultOptions: LengthOptions = {
  allowBlank: false
}

type LengthErrorFormatters<T> = ErrorFormatters<
  T,
  LengthOptions,
  'cantBeEmpty' | 'wrongLength' | 'tooShort' | 'tooLong' | 'mustBeBetween'
>

function length<T extends string | any[]>(
  options?: LengthOptions,
  errros?: Partial<LengthErrorFormatters<T>>
): Validator<T> {
  const defaultErrorFromatters: LengthErrorFormatters<T> = {
    cantBeEmpty: (value, options) => `can't be empty`,
    wrongLength: (value, options) => `wrong length (must be exect ${options.exact} length)`,
    mustBeBetween: (value, options) => `must be between ${options.min} and ${options.max} length`,
    tooLong: (value, options) => `too long (maximum is ${options.max} length)`,
    tooShort: (value, options) => `too short (minimum is ${options.min} length)`
  }
  const _options = Object.assign({}, defaultOptions, options || {})
  const _errors = Object.assign({}, defaultErrorFromatters, errros || {})

  return function lengthValidator(value, done) {
    const { allowNone, allowBlank, useBetween, exact, min, max } = _options

    if (isNone(value)) {
      return done(allowNone ? undefined : _errors.cantBeEmpty(value, _options))
    }

    if (allowBlank) {
      return done()
    }

    if (isNone(value.length)) {
      return done()
    }

    const length = Number(value.length)

    if (!isNone(exact) && exact !== length) {
      return done(_errors.wrongLength(value, _options))
    }

    if (!isNone(useBetween) && !isNone(min) && !isNone(max) && (length <= min || length >= max)) {
      return done(_errors.mustBeBetween(value, _options))
    }

    if (!isNone(min) && min > length) {
      return done(_errors.tooShort(value, _options))
    }

    if (!isNone(max) && max < length) {
      return done(_errors.tooLong(value, _options))
    }

    return done()
  }
}

export default length
