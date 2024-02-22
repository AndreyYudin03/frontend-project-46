import { cwd } from 'node:process';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import _ from 'lodash';
import getData from './parsing_data.js';

const getFileDataByPath = (pathToFile) => getData(readFileSync(resolve(cwd(), pathToFile)));

const getDiffFiles = (filepath1, filepath2) => {
  let result = '{';
  const [file1, file2] = [
    getFileDataByPath(filepath1),
    getFileDataByPath(filepath2),
  ];

  const sortedKeys = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));

  sortedKeys.forEach((key) => {
    if (file1.hasOwnProperty(key) && file2.hasOwnProperty(key)) {
      if (file1[`${key}`] === file2[`${key}`]) {
        result += `\n    ${key}: ${file1[`${key}`]}`;
      } else {
        result += `\n  - ${key}: ${file1[`${key}`]}`;
        result += `\n  + ${key}: ${file2[`${key}`]}`;
      }
    } else if (file1.hasOwnProperty(key) && !file2.hasOwnProperty(key)) {
      result += `\n  - ${key}: ${file1[`${key}`]}`;
    } else {
      result += `\n  + ${key}: ${file2[`${key}`]}`;
    }
  });

  return `${result}\n}`;
};

export default getDiffFiles;
