import validation from '../src/validate-core-js'

const { value: valueValidation } = validation

const presence = <T>(value: T | undefined | null, done: (error?: string) => void) => {
  if (!value) {
    return done('is empty')
  }
  return done()
}

const lengthMoreThan = (length: number) => <T>(
  value: T | undefined | null,
  done: (error?: string) => void
) => {
  if (typeof value === 'string') {
    return value.length >= length ? done() : done('is to short')
  }

  done('not correct type')
}

describe('value validation', () => {
  it('valid', () => {
    const result = valueValidation('value', presence)
    expect(result.valid).toBe(true)
    expect(result.errors.length).toBe(0)
  })

  it('not valid (1 validator)', () => {
    const result = valueValidation('', presence)
    expect(result.valid).toBe(false)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0]).toBe('is empty')
  })

  it('not valid (2 validators)', () => {
    const result = valueValidation('', presence, lengthMoreThan(1))
    expect(result.valid).toBe(false)
    expect(result.errors.length).toBe(2)
  })
})
