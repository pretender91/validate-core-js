import lib from '../../src/validate-core-js'

describe('Validators => length', () => {
  it('test with default options', () => {
    // allowBlank is by default so done always should called with undefined
    const validator = lib.validators.length<string>()
    const done = jest.fn()

    validator('', done)
    expect(done).toBeCalledWith()

    validator('1', done)
    expect(done).toBeCalledWith()
  })

  it('min option', () => {
    const validator = lib.validators.length<string>({
      allowBlank: false,
      min: 2
    })
    const done = jest.fn()

    validator('1', done)
    expect(done).toBeCalledWith(expect.any(String))

    validator('111', done)
    expect(done).toBeCalledWith()
  })

  it('max option', () => {
    const validator = lib.validators.length<string>({
      allowBlank: false,
      max: 2
    })
    const done = jest.fn()

    validator('1', done)
    expect(done).toBeCalledWith()

    validator('1111', done)
    expect(done).toBeCalledWith(expect.any(String))
  })

  it('useBetween option', () => {
    const validator = lib.validators.length<string>({
      allowBlank: false,
      useBetween: true,
      min: 2,
      max: 5
    })
    const done = jest.fn()

    validator('123', done)
    expect(done).toBeCalledWith()

    validator('1', done)
    expect(done).toBeCalledWith(expect.any(String))

    validator('123456', done)
    expect(done).toBeCalledWith(expect.any(String))
  })

  it('exact option', () => {
    const validator = lib.validators.length<string>({
      allowBlank: false,
      exact: 3
    })
    const done = jest.fn()

    validator('12', done)
    expect(done).toBeCalledWith(expect.any(String))

    validator('123', done)
    expect(done).toBeCalledWith()

    validator('1234', done)
    expect(done).toBeCalledWith(expect.any(String))
  })
})
