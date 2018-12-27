import validation from '../src/validate-core-js'

const { object: objectValidation } = validation

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

describe('object validation', () => {
  it('valid', () => {
    const result = objectValidation({ name: 'anatolii' }, { name: presence })
    expect(result.valid).toBe(true)
    expect(result.errors.size).toBe(0)
  })

  it('not valid (1 validator)', () => {
    const result = objectValidation({ name: '' }, { name: presence })
    expect(result.valid).toBe(false)
    expect(result.errors.size).toBe(1)
    expect(result.errors.get('name')).toEqual(['is empty'])
  })

  it('not valid (2 validators)', () => {
    const result = objectValidation(
      { age: 16 },
      { name: presence, age: [biggerThan(17), biggerThan(18)] }
    )
    expect(result.valid).toBe(false)
    expect(result.errors.size).toBe(2)
    expect(result.errors.get('age')).toEqual(['is too small', 'is too small'])
  })
})
