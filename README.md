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

You can import the library as dafault:

```javascript
import validate from 'validate-core-js'

/**
 * single value validation
 */
const { valid, errors } = validate.value(2, (value, done) => {
  // returns { valid: true, errors: [] }
  if (value > 0) {
    return done()
  }

  return done('must be positive')
})

const { valid, errors } = validate.value(-1, (value, done) => {
  // returns { valid: false, errors: ['must be positive'] }
  if (value > 0) {
    return done()
  }

  return done('must be positive')
})

/**
 * Array validation
 */

const { valid, errors } = validate.array([1, -1], (value, done) => {
  // returns { valid: false, errors: Map<number, string[]>({ 1: ['must be positive'] }) }
  if (value > 0) {
    return done()
  }

  return done('must be positive')
})

/**
 * Object validation
 */

// example of validators
const presence = (value, done) => {
  if (!value) {
    return done('is empty')
  }
  return done()
}

const biggerThan = target => (value, done) => {
  if (typeof value === 'number') {
    return value >= target ? done() : done('is too small')
  }

  done('not correct type')
}

const { valid, errors } = validate.object(
  { age: 16 },
  { name: presence, age: [biggerThan(17), biggerThan(18)] }
)
```

Additionally, you can import seperate validation function:

```javascript
import validateValue from 'validate-core-js/dist/lib/value'
```

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind are welcome!
