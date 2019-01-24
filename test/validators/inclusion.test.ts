import lib from '../../src/validate-core-js'

const error = expect.any(String)

describe('Validators => inclision', () => {
  it('failed', () => {
    const validator = lib.validators.inclusion({ within: [3, 4] })
    const done = jest.fn()

    validator(1, done)
    expect(done).toBeCalledWith(error)

    validator(2, done)
    expect(done).toBeCalledWith(error)
  })

  it('success', () => {
    const validator = lib.validators.inclusion({ within: ['1', '2'] })
    const done = jest.fn()

    validator('1', done)
    expect(done).toBeCalledWith()

    validator('2', done)
    expect(done).toBeCalledWith()
  })
})
