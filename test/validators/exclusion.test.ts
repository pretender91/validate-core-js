import lib from '../../src/validate-core-js'

const error = expect.any(String)

describe('Validators => exclision', () => {
  it('failed', () => {
    const validator = lib.validators.exclusion<number>({ within: [1, 2] })
    const done = jest.fn()

    validator(1, done)
    expect(done).toBeCalledWith(error)

    validator(2, done)
    expect(done).toBeCalledWith(error)
  })

  it('success', () => {
    const validator = lib.validators.exclusion<number>({ within: [1, 2] })
    const done = jest.fn()

    validator(0, done)
    expect(done).toBeCalledWith()

    validator(3, done)
    expect(done).toBeCalledWith()
  })
})
