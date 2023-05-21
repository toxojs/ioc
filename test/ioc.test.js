const { ioc } = require('../src');

describe('IoC', () => {
  it('should register and get a singleton', () => {
    const obj = { a: 1 };
    ioc.register('obj', obj);
    const actual = ioc.get('obj');
    expect(actual).toBe(obj);
  });
});
