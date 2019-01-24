import { Validator } from '../validator'
import { ErrorFormatters } from './error-formatter'
import { isBlank, isString } from '../utils'

type EmailOptions = {
  allowBlank?: boolean
}

const defaultOptions: EmailOptions = {
  allowBlank: false
}

type EmailErrorFormatters = ErrorFormatters<
  string,
  EmailOptions,
  'cantBeBlank' | 'mustBeString' | 'mustBeValid'
>

const defaultErrorFormatters: EmailErrorFormatters = {
  cantBeBlank: (value, options) => `can't be blank`,
  mustBeString: (value, options) => 'must be string',
  mustBeValid: (value, options) => 'must be a valid email address'
}

function email(options?: EmailOptions, errors?: Partial<EmailErrorFormatters>): Validator<string> {
  const _options = Object.assign({}, defaultOptions, options || {})
  const _errors = Object.assign({}, defaultErrorFormatters, errors || {})

  return function emailValidator(value, done) {
    const { allowBlank } = _options

    if (isBlank(value) && allowBlank) {
      return done()
    }

    if (isBlank(value)) {
      return done(_errors.cantBeBlank(value, _options))
    }

    if (!isString(value)) {
      return done(_errors.mustBeString(value, _options))
    }

    if (
      !/^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(
        value
      )
    ) {
      return done(_errors.mustBeValid(value, _options))
    }

    return done()
  }
}

export default email
