import fs from 'fs';
import getDiffFiles from '../src/index.js';

const readFixtureFile = (filename) =>
  fs.readFileSync(`__fixtures__/results/${filename}`, 'utf8');

const FilesPath = (filePath1, filePath2) => [
  `__fixtures__/files/${filePath1}`,
  `__fixtures__/files/${filePath2}`,
];

const createExpectedResult = (stylishFile, plainFile, jsonFile) => ({
  stylish: readFixtureFile(stylishFile),
  plain: readFixtureFile(plainFile),
  json: readFixtureFile(jsonFile),
});

const testCases = [
  {
    name: 'deep json files 1',
    inputFiles: FilesPath('file1.json', 'file2.json'),
    expected: createExpectedResult(
      'stylish_result_1.txt',
      'plain_result_1.txt',
      'json_result_1.txt'
    ),
  },
  {
    name: 'deep yaml files 1',
    inputFiles: FilesPath('file3.yaml', 'file4.yaml'),
    expected: createExpectedResult(
      'stylish_result_2.txt',
      'plain_result_2.txt',
      'json_result_2.txt'
    ),
  },
];

describe('getDiffFiles', () => {
  testCases.forEach((testCase) => {
    it(`${testCase.name}`, () => {
      const { inputFiles, expected } = testCase;
      Object.keys(expected).forEach((format) => {
        const actualResult = getDiffFiles(...inputFiles, format);
        expect(actualResult).toBe(expected[format]);
      });
    });
  });
});
