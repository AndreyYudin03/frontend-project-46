import getDiffFiles from '../src/index.js';

const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('flat json files', () => {
  expect(
    getDiffFiles('__fixtures__/file1.json', '__fixtures__/file2.json'),
  ).toBe(result);
});

test('flat yaml files', () => {
  expect(
    getDiffFiles('__fixtures__/file1.yaml', '__fixtures__/file2.yaml'),
  ).toBe(result);
});
