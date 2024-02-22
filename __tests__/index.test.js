import getDiffFiles from '../src/index.js';

test('flat json files', () => {
  const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  expect(
    getDiffFiles('__fixtures__/file1.json', '__fixtures__/file2.json'),
  ).toBe(result);
});
