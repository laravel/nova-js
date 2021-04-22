let { SingularOrPlural } = require('../dist/index')

test('it can return correct inflector results', () => {
  expect(SingularOrPlural(0, 'hour')).toBe('hours');
  expect(SingularOrPlural(1, 'hour')).toBe('hour');
  expect(SingularOrPlural(1.23, 'hour')).toBe('hours');
  expect(SingularOrPlural(40, 'hour')).toBe('hours');
});

test('it does change when suffix is a symbol or accented character', () => {
    expect(SingularOrPlural(40, '%')).toBe('%')
})
