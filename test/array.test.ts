import validation from '../src/validate-core-js'

const { array: arrayValidation } = validation

const presence = <T>(value: T | undefined | null, done: (error?: string) => void) => {
  if (!value) {
    return done('is empty')
  }
  return done()
}

const biggerThan = (target: number) => <T>(
  value: T | undefined | null,
  done: (error?: string) => void
) => {
  if (typeof value === 'number') {
    return value >= target ? done() : done('is too small')
  }

  done('not correct type')
}

describe('array validation', () => {
  it('valid', () => {
    const result = arrayValidation(['value'], presence)
    expect(result.valid).toBe(true)
    expect(result.errors.size).toBe(0)
  })

  it('not valid (1 validator)', () => {
    const result = arrayValidation([''], presence)
    expect(result.valid).toBe(false)
    expect(result.errors.size).toBe(1)
    expect(result.errors.get(0)).toEqual(['is empty'])
  })

  it('not valid (2 validators)', () => {
    const result = arrayValidation([0, -1], biggerThan(2), biggerThan(1))
    expect(result.valid).toBe(false)
    expect(result.errors.size).toBe(2)
  })
})
