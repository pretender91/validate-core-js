import { Validator } from '../validator'
import { ErrorFormatters } from './error-formatter'
import { isBlank, isNone } from '../utils'

type DateOptions = {
  allowBlank?: boolean
  parse?: (target: any) => number
  before?: any
  after?: any
}

const defaultOptions: DateOptions = {
  allowBlank: false,
  parse: (target: any) => {
    const date = new Date(target)
    return date.valueOf()
  }
}

type DateErrorFormatters = ErrorFormatters<
  any,
  DateOptions,
  'cantBeBlank' | 'mustBeBefore' | 'mustBeAfter' | 'cantParseDate'
>

const defaultErrorFormatters: DateErrorFormatters = {
  cantBeBlank: (value: any, options: DateOptions) => `can't be blank`,
  cantParseDate: (value: any, options: DateOptions) => `can't parse date`,
  mustBeBefore: (value: any, options: DateOptions) => `must be before ${options.before}`,
  mustBeAfter: (value: any, options: DateOptions) => `must be after ${options.after}`
}

function date(
  options?: DateOptions,
  errorFormatters?: Partial<DateErrorFormatters>
): Validator<any> {
  const _options = Object.assign({}, defaultOptions, options || {})
  const _errors = Object.assign({}, defaultErrorFormatters, errorFormatters || {})

  return function dateValidator(value, done) {
    const { allowBlank, before, after, parse } = _options

    if (isBlank(value) && allowBlank) {
      return done()
    }

    if (isBlank(value)) {
      return done(_errors.cantBeBlank(value, _options))
    }

    if (isNone(parse)) {
      return done(_errors.cantParseDate(value, _options))
    }

    if (!isNone(before) && parse(value) > parse(before)) {
      return done(_errors.mustBeBefore(value, _options))
    }

    if (!isNone(after) && parse(value) < parse(after)) {
      return done(_errors.mustBeAfter(value, _options))
    }

    return done()
  }
}

export default date
