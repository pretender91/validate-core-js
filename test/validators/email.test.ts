import lib from '../../src/validate-core-js'

const error = expect.any(String)

describe('Validators => email', () => {
  it('failed', () => {
    const validator = lib.validators.email()
    const done = jest.fn()

    validator('', done)
    expect(done).toBeCalledWith(error)

    validator('doma', done)
    expect(done).toBeCalledWith(error)

    validator('user@co', done)
    expect(done).toBeCalledWith(error)
  })

  it('success', () => {
    const validator = lib.validators.email({ allowBlank: true })
    const done = jest.fn()

    validator('', done)
    expect(done).toBeCalledWith()

    validator('user@example.com', done)
    expect(done).toBeCalledWith()

    validator('domaratskiyas@gmail.com', done)
    expect(done).toBeCalledWith()
  })
})
