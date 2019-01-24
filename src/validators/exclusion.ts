import { ErrorFormatters } from './error-formatter'
import { Validator } from '../validator'
import { isEmpty } from '../utils'

type ExclusionOptions<T> = {
  allowBlank?: boolean
  within?: Array<T>
}

const defaultOptions: ExclusionOptions<any> = {
  allowBlank: false,
  within: []
}

type ExclusionErrorFormatters<T> = ErrorFormatters<T, ExclusionOptions<T>, 'reserved'>

function exclusion<T>(
  options?: ExclusionOptions<T>,
  errors?: Partial<ExclusionErrorFormatters<T>>
): Validator<T> {
  const defaultErrorFormatters: ExclusionErrorFormatters<T> = {
    reserved: (value: T | undefined | null, options: ExclusionOptions<T>) => {
      return `${value} is reserverd`
    }
  }
  const _options = Object.assign({}, defaultOptions, options || {})
  const _errors = Object.assign({}, defaultErrorFormatters, errors || {})

  return function exclusionValidator(value, done) {
    const { allowBlank, within } = _options

    if (allowBlank && isEmpty(value)) {
      return true
    }

    if (within && within.indexOf(value) !== -1) {
      return done(_errors.reserved(value, _options))
    }

    return done()
  }
}

export default exclusion
