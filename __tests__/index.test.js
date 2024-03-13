import fs from 'fs';
import getDiffFiles from '../src/index.js';

const expectedResult = fs.readFileSync('__fixtures__/result.txt', 'utf8');

const actualResult = getDiffFiles(
  '__fixtures__/file3.json',
  '__fixtures__/file4.json',
);

test('deep json files', () => {
  expect(actualResult).toBe(expectedResult);
});
