import { Validator } from '../validator'
import { isEmpty } from '../utils'
import { ErrorFormatters } from './error-formatter'

type InclusionOptions<T> = {
  allowBlank?: boolean
  within?: Array<T>
}

const defaultOptions: InclusionOptions<any> = {
  allowBlank: false,
  within: []
}

type InclusionErrorFormatters<T> = ErrorFormatters<T, InclusionOptions<T>, 'notAllowed'>

function inclusion<T>(
  options?: InclusionOptions<T>,
  errors?: Partial<InclusionErrorFormatters<T>>
): Validator<T> {
  const defaultErrorFormatters: InclusionErrorFormatters<T> = {
    notAllowed: (value: T | undefined | null, options: InclusionOptions<T>) => {
      return `${value} is not allowed`
    }
  }
  const _options = Object.assign({}, defaultOptions, options || {})
  const _errors = Object.assign({}, defaultErrorFormatters, errors || {})
  return function inclusionValidator(value, done) {
    const { allowBlank, within } = _options

    if (allowBlank && isEmpty(value)) {
      return true
    }

    if (within && within.indexOf(value) === -1) {
      return done(_errors.notAllowed(value, _options))
    }

    return done()
  }
}

export default inclusion
