import { Validator } from '../validator'
import { isNone, isString, isNumber, isEmpty } from '../utils'
import { ErrorFormatters } from './error-formatter'

type NumberOptions = {
  allowNone?: boolean
  allowBlank?: boolean
  allowString?: boolean
  integer?: boolean
  positive?: boolean
  odd?: boolean
  even?: boolean
  is?: number
  lt?: number
  lte?: number
  gt?: number
  gte?: number
}

const defaultOptions: NumberOptions = {
  allowBlank: false
}

type NumberErrorFormatters<T> = ErrorFormatters<
  T,
  NumberOptions,
  | 'notANumber'
  | 'mustBeInterger'
  | 'mustBePositive'
  | 'mustBeOdd'
  | 'mustBeEven'
  | 'mustBeLess'
  | 'mustBeLessOrEqual'
  | 'mustBeEqual'
  | 'mustBeGreater'
  | 'mustBeGreaterOrEqual'
>

function number<T extends number | string>(
  options?: NumberOptions,
  errors?: Partial<NumberErrorFormatters<T>>
): Validator<T> {
  const defaultErrorFormatters: NumberErrorFormatters<T> = {
    notANumber: (value, options) => 'not a number',
    mustBeInterger: (value, options) => 'must be integer',
    mustBePositive: (value, options) => 'must be positive',
    mustBeOdd: (value, options) => 'must be odd',
    mustBeEven: (value, options) => 'must be even',
    mustBeEqual: (value, options) => `must be equal to ${options.is}`,
    mustBeLess: (value, options) => `must be less than ${options.lt}`,
    mustBeLessOrEqual: (value, options) => `must be less than or equal to ${options.lte}`,
    mustBeGreater: (value, options) => `must be greater than ${options.gt}`,
    mustBeGreaterOrEqual: (value, options) => `must be greater than or equal to ${options.gte}`
  }
  const _options = Object.assign({}, defaultOptions, options || {})
  const _errors = Object.assign({}, defaultErrorFormatters, errors || {})

  return function numberValidator(value, done) {
    const {
      allowNone,
      allowBlank,
      allowString,
      integer,
      positive,
      odd,
      even,
      is,
      lt,
      lte,
      gt,
      gte
    } = _options

    let numValue = Number(value)

    if (allowNone && isNone(value)) {
      return done()
    }

    if (allowBlank && isEmpty(value)) {
      return done()
    }

    if (isEmpty(value)) {
      return done(_errors.notANumber(value, _options))
    }

    if (isString(value) && !allowString) {
      return done(_errors.notANumber(value, _options))
    }

    if (!isNumber(numValue)) {
      return done(_errors.notANumber(value, _options))
    }

    if (integer && !Number.isInteger(numValue)) {
      return done(_errors.mustBeInterger(value, _options))
    }

    if (positive && numValue < 0) {
      return done(_errors.mustBePositive(value, _options))
    }

    if (odd && numValue % 2 === 0) {
      return done(_errors.mustBeOdd(value, _options))
    }

    if (even && numValue % 2 !== 0) {
      return done(_errors.mustBeEven(value, _options))
    }

    if (isNumber(is) && numValue !== is) {
      return done(_errors.mustBeEqual(value, _options))
    }

    if (isNumber(lt) && numValue >= lt) {
      return done(_errors.mustBeLess(value, _options))
    }

    if (isNumber(lte) && numValue > lte) {
      return done(_errors.mustBeLessOrEqual(value, _options))
    }

    if (isNumber(gt) && numValue <= gt) {
      return done(_errors.mustBeGreater(value, _options))
    }

    if (isNumber(gte) && numValue < gte) {
      return done(_errors.mustBeGreaterOrEqual(value, _options))
    }

    return done()
  }
}

export default number
