let { SingularOrPlural } = require('../dist/index')

test('it can return correct inflector results', () => {
  expect(SingularOrPlural(0, 'hour')).toBe('hours')
  expect(SingularOrPlural(1, 'hour')).toBe('hour')
  expect(SingularOrPlural(1.23, 'hour')).toBe('hours')
  expect(SingularOrPlural(40, 'hour')).toBe('hours')
  expect(SingularOrPlural(40, 'Bouqueté')).toBe('Bouquetés')
});

test('it does ignore when suffix is a symbol', () => {
  expect(SingularOrPlural(40, '%')).toBe('%')
  expect(SingularOrPlural(40, '!')).toBe('!')
})
