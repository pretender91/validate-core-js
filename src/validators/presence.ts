import { Validator } from '../validator'
import { isPresent } from '../utils'
import { ErrorFormatters } from './error-formatter'

type PresenceOptions = {
  presence: boolean
}

const defaultOptions: PresenceOptions = {
  presence: true
}

type PresenceErrorFormatters<T> = ErrorFormatters<
  T,
  PresenceOptions,
  'mustBeBlank' | 'mustBePresent'
>

function presence<T>(
  options?: PresenceOptions,
  errors?: Partial<PresenceErrorFormatters<T>>
): Validator<T> {
  const defaultErrorFormatters: PresenceErrorFormatters<T> = {
    mustBeBlank: (value, options) => 'must be blank',
    mustBePresent: (value, options) => 'must be present'
  }
  const _options = Object.assign({}, defaultOptions, options || {})
  const _errors = Object.assign({}, defaultErrorFormatters, errors || {})

  return function presenceValidator(value, done) {
    if (isPresent(value)) {
      return done(_options.presence ? undefined : _errors.mustBeBlank(value, _options))
    }

    return done(_options.presence ? _errors.mustBePresent(value, _options) : undefined)
  }
}

export default presence
