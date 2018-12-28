import {
  isArray,
  isBlank,
  isBoolean,
  isEmpty,
  isFunction,
  isNone,
  isNumber,
  isObject,
  isPresent,
  isString,
  isSymbol,
  isUndefined
} from '../src/utils'

describe('checking utils', () => {
  it('isArray', () => {
    expect(isArray([])).toBe(true)
    expect(isArray('123123')).toBe(false)
    expect(isArray({ length: 1 })).toBe(false)
  })

  it('isBlank', () => {
    expect(isBlank(null)).toBe(true)
    expect(isBlank(undefined)).toBe(true)
    expect(isBlank('')).toBe(true)
    expect(isBlank([])).toBe(true)
    expect(isBlank('\n\t')).toBe(true)
    expect(isBlank('  ')).toBe(true)
    expect(isBlank({})).toBe(false)
    expect(isBlank('\n\t Hello')).toBe(false)
    expect(isBlank('Hello world')).toBe(false)
    expect(isBlank([1, 2, 3])).toBe(false)
  })

  it('isBoolean', () => {
    expect(isBoolean(true)).toBe(true)
    expect(isBoolean(false)).toBe(true)
    expect(isBoolean('true')).toBe(false)
    expect(isBoolean('false')).toBe(false)
    expect(isBoolean(1)).toBe(false)
    expect(isBoolean(undefined)).toBe(false)
    expect(isBoolean(null)).toBe(false)
    expect(isBoolean([])).toBe(false)
    expect(isBoolean({})).toBe(false)
    expect(isBoolean(() => undefined)).toBe(false)
  })

  it('isEmpty', () => {
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
    expect(isEmpty('')).toBe(true)
    expect(isEmpty([])).toBe(true)
    expect(isEmpty({ size: 0 })).toBe(true)
    expect(isEmpty({})).toBe(false)
    expect(isEmpty('string')).toBe(false)
    expect(isEmpty([0, 1, 2])).toBe(false)
    expect(isEmpty('\n\t')).toBe(false)
    expect(isEmpty('  ')).toBe(false)
    expect(isEmpty({ size: 1 })).toBe(false)
    expect(isEmpty({ size: () => 0 })).toBe(false)
  })

  it('isFunction', () => {
    expect(isFunction(true)).toBe(false)
    expect(isFunction(false)).toBe(false)
    expect(isFunction('true')).toBe(false)
    expect(isFunction('false')).toBe(false)
    expect(isFunction(1)).toBe(false)
    expect(isFunction(undefined)).toBe(false)
    expect(isFunction(null)).toBe(false)
    expect(isFunction([])).toBe(false)
    expect(isFunction({})).toBe(false)
    expect(isFunction(() => undefined)).toBe(true)
  })

  it('isNone', () => {
    expect(isNone(true)).toBe(false)
    expect(isNone(false)).toBe(false)
    expect(isNone('true')).toBe(false)
    expect(isNone(1)).toBe(false)
    expect(isNone(undefined)).toBe(true)
    expect(isNone(null)).toBe(true)
    expect(isNone([])).toBe(false)
    expect(isNone({})).toBe(false)
    expect(isNone(() => undefined)).toBe(false)
  })

  it('isNumber', () => {
    expect(isNumber(true)).toBe(false)
    expect(isNumber(false)).toBe(false)
    expect(isNumber('1')).toBe(false)
    expect(isNumber(1)).toBe(true)
    expect(isNumber(undefined)).toBe(false)
    expect(isNumber(null)).toBe(false)
    expect(isNumber([])).toBe(false)
    expect(isNumber({})).toBe(false)
    expect(isNumber(() => undefined)).toBe(false)
  })

  it('isObject', () => {
    expect(isObject(true)).toBe(false)
    expect(isObject(false)).toBe(false)
    expect(isObject('1')).toBe(false)
    expect(isObject(1)).toBe(false)
    expect(isObject(undefined)).toBe(false)
    expect(isObject(null)).toBe(false)
    expect(isObject([])).toBe(true)
    expect(isObject({})).toBe(true)
    expect(isObject(() => undefined)).toBe(false)
  })

  it('isPresent', () => {
    expect(isPresent(null)).toBe(false)
    expect(isPresent(undefined)).toBe(false)
    expect(isPresent('')).toBe(false)
    expect(isPresent([])).toBe(false)
    expect(isPresent('\n\t')).toBe(false)
    expect(isPresent('  ')).toBe(false)
    expect(isPresent({})).toBe(true)
    expect(isPresent('\n\t Hello')).toBe(true)
    expect(isPresent('Hello world')).toBe(true)
    expect(isPresent([1, 2, 3])).toBe(true)
  })

  it('isString', () => {
    expect(isString(true)).toBe(false)
    expect(isString(false)).toBe(false)
    expect(isString('1')).toBe(true)
    expect(isString(1)).toBe(false)
    expect(isString(undefined)).toBe(false)
    expect(isString(null)).toBe(false)
    expect(isString([])).toBe(false)
    expect(isString({})).toBe(false)
    expect(isString(() => undefined)).toBe(false)
  })

  it('isSymbol', () => {
    expect(isSymbol(true)).toBe(false)
    expect(isSymbol(false)).toBe(false)
    expect(isSymbol('1')).toBe(false)
    expect(isSymbol(1)).toBe(false)
    expect(isSymbol(undefined)).toBe(false)
    expect(isSymbol(null)).toBe(false)
    expect(isSymbol([])).toBe(false)
    expect(isSymbol({})).toBe(false)
    expect(isSymbol(() => undefined)).toBe(false)
    expect(isSymbol(Symbol.for('test'))).toBe(true)
  })

  it('isUndefined', () => {
    expect(isUndefined(true)).toBe(false)
    expect(isUndefined(false)).toBe(false)
    expect(isUndefined('1')).toBe(false)
    expect(isUndefined(1)).toBe(false)
    expect(isUndefined(undefined)).toBe(true)
    expect(isUndefined(null)).toBe(false)
    expect(isUndefined([])).toBe(false)
    expect(isUndefined({})).toBe(false)
    expect(isUndefined(() => undefined)).toBe(false)
  })
})
