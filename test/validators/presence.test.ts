import lib from '../../src/validate-core-js'

describe('Validators => presence', () => {
  it('test with default options', () => {
    const validator = lib.validators.presence<any>()
    const done = jest.fn()

    validator(1, done)
    expect(done).toBeCalledWith(undefined)

    validator(undefined, done)
    expect(done).toBeCalledWith(expect.any(String))
  })

  it('test with setted presence options to true', () => {
    const validator = lib.validators.presence<any>({ presence: true })
    const done = jest.fn()

    validator(1, done)
    expect(done).toBeCalledWith(undefined)

    validator(undefined, done)
    expect(done).toBeCalledWith(expect.any(String))
  })

  it('test with setted presence options to false', () => {
    const validator = lib.validators.presence<any>({ presence: false })
    const done = jest.fn()

    validator(1, done)
    expect(done).toBeCalledWith(expect.any(String))

    validator(undefined, done)
    expect(done).toBeCalledWith(undefined)
  })
})
