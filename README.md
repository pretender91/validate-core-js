# Validate Core JS

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Greenkeeper badge](https://badges.greenkeeper.io/pretender91/validate-core-js.svg)](https://greenkeeper.io/)
[![Travis](https://img.shields.io/travis/pretender91/validate-core-js.svg)](https://travis-ci.org/pretender91/validate-core-js)
[![Coveralls](https://img.shields.io/coveralls/pretender91/validate-core-js.svg)](https://coveralls.io/github/pretender91/validate-core-js)

A validaton library that makes validation easy.

### Installation

```bash
npm isntall --save validate-core-js

```

### Usage

#### Value Validation

```typescript
import { value, validators } from 'validate-core-js'

const { valid, errors } = value(-1, validators.number({ positive: true }))
// { valid: false, errors: ['must be positive'] }
const { valid, errors } = value('123', validators.length < string > ({ min: 5 })
// { valid: false, errors: ['too short (minimum length is 5)'] }
const { valid, errors } = value(undefined, validators.presence())
// { valid: false, errors: ['must be present'] }
```

### Array Validation

```typescript
import { array, validators } from 'validate-core-js'

const { valid, errors } = array([1, 2], validators.number({ odd: true }))
// { valid: false, errors: Map<number, string[]>({ 1: ['must be positive'] }) }
const { valid, errors } = array([undefined, 2], validators.presence())
// { valid: false, errors: Map<number, string[]>({ 0: ['must be present'] }) }
```

#### Object Validation

```typescript
import { object, validators } from 'validate-core-js'

const { valid, errors } = object(
  { age: 16 },
  { age: [validators.number({ gte: 18 })] } // you can pass multiple validators as array
)
// { valid: false, errors: Map<string, string[]>({ 'age': ['must be greater than or equal to 18'] }) }
```

#### Own Validators

As you see there are predefined validators, but you can also create your own validators:

```typescript
import { Validator } from 'validate-core-js/dist/lib/validator'
import validateValue from 'validate-core-js/dist/lib/value'

const isOdd: Validator<number> = (value, done) => {
  if (value % 2 === 0) {
    return done('it is not odd') //with error
  }

  return done() // no error
}

validateValue(2, isOdd)
```

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind are welcome!
