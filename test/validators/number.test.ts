import lib from '../../src/validate-core-js'

const error = expect.any(String)

describe('Validators => number', () => {
  it('test with default options', () => {
    const validator = lib.validators.number()
    const done = jest.fn()

    validator(0, done)
    expect(done).toBeCalledWith()

    validator('1', done)
    expect(done).toBeCalledWith(error)
  })

  it('opts.allowString', () => {
    const validator = lib.validators.number({ allowString: true })
    const done = jest.fn()

    validator(0, done)
    expect(done).toBeCalledWith()

    validator('1', done)
    expect(done).toBeCalledWith()
  })

  it('opts.allowBlank', () => {
    const validator = lib.validators.number({
      allowBlank: true,
      allowString: true
    })
    const done = jest.fn()

    validator(0, done)
    expect(done).toBeCalledWith()

    validator('', done)
    expect(done).toBeCalledWith()
  })

  it('opts.allowBlank', () => {
    const validator = lib.validators.number({
      allowBlank: true,
      allowString: true
    })
    const done = jest.fn()

    validator(0, done)
    expect(done).toBeCalledWith()

    validator('', done)
    expect(done).toBeCalledWith()
  })

  it('opts.integer', () => {
    const validator = lib.validators.number({
      integer: true
    })
    const done = jest.fn()

    validator(0, done)
    expect(done).toBeCalledWith()

    validator(1.2, done)
    expect(done).toBeCalledWith(error)
  })

  it('opts.positive', () => {
    const validator = lib.validators.number({
      positive: true
    })
    const done = jest.fn()

    validator(0, done)
    expect(done).toBeCalledWith()

    validator(-2, done)
    expect(done).toBeCalledWith(error)
  })

  it('opts.odd', () => {
    const validator = lib.validators.number({
      odd: true
    })
    const done = jest.fn()

    validator(1, done)
    expect(done).toBeCalledWith()

    validator(2, done)
    expect(done).toBeCalledWith(error)
  })

  it('opts.even', () => {
    const validator = lib.validators.number({
      even: true
    })

    const done = jest.fn()

    validator(1, done)
    expect(done).toBeCalledWith(error)

    validator(2, done)
    expect(done).toBeCalledWith()
  })

  it('opts.is', () => {
    const validator = lib.validators.number({
      is: 3
    })

    const done = jest.fn()

    validator(1, done)
    expect(done).toBeCalledWith(error)

    validator(3, done)
    expect(done).toBeCalledWith()
  })

  it('opts.lt', () => {
    const validator = lib.validators.number({
      lt: 3
    })

    const done = jest.fn()

    validator(1, done)
    expect(done).toBeCalledWith()

    validator(3, done)
    expect(done).toBeCalledWith(error)
  })

  it('opts.lte', () => {
    const validator = lib.validators.number({
      lte: 3
    })

    const done = jest.fn()

    validator(2, done)
    expect(done).toBeCalledWith()

    validator(3, done)
    expect(done).toBeCalledWith()

    validator(4, done)
    expect(done).toBeCalledWith(error)
  })

  it('opts.gt', () => {
    const validator = lib.validators.number({
      gt: 3
    })

    const done = jest.fn()

    validator(2, done)
    expect(done).toBeCalledWith(error)

    validator(3, done)
    expect(done).toBeCalledWith(error)

    validator(4, done)
    expect(done).toBeCalledWith()
  })

  it('opts.gte', () => {
    const validator = lib.validators.number({
      gte: 3
    })

    const done = jest.fn()

    validator(2, done)
    expect(done).toBeCalledWith(error)

    validator(3, done)
    expect(done).toBeCalledWith()

    validator(4, done)
    expect(done).toBeCalledWith()
  })
})
