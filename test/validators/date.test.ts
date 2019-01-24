import lib from '../../src/validate-core-js'

const error = expect.any(String)

describe('Validators => date', () => {
  it('failed', () => {
    const validator = lib.validators.date({
      allowBlank: false,
      before: new Date(2018, 0, 1)
    })
    const done = jest.fn()

    validator(new Date(2018, 1, 1), done)
    expect(done).toBeCalledWith(error)

    validator('not correct date', done)
    expect(done).toBeCalledWith(error)
  })

  it('success', () => {
    const validator = lib.validators.date({
      allowBlank: false,
      after: new Date(2018, 0, 1)
    })
    const done = jest.fn()

    validator(new Date(2018, 1, 1), done)
    expect(done).toBeCalledWith()
  })

  it('custom parser', () => {
    const validator = lib.validators.date({
      allowBlank: false,
      parse: target => {
        if (typeof target === 'string') {
          const [year, month, day] = target.split('-')
          return new Date(+year, +month, +day).valueOf()
        }
        return new Date(target).valueOf()
      },
      after: '2018-01-02'
    })
    const done = jest.fn()

    validator('2018-02-03', done)
    expect(done).toBeCalledWith()

    validator('2018-01-01', done)
    expect(done).toBeCalledWith(error)
  })
})
