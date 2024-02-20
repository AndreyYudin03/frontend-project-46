#!/usr/bin/env node

import { Command } from 'commander';
import { cwd } from 'node:process';
import { readFileSync } from 'node:fs';
import _ from 'lodash';
import getData from '../src/parsing_data_from_files.js';

const program = new Command();

const getFileDataByPath = (pathToFile) => {
  const path = `${cwd()}/${pathToFile}`;
  return getData(readFileSync(path));
};

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

  console.log(file1, file2);

  return `${result}\n}`;
};

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(getDiffFiles(filepath1, filepath2));
  })
  .parse(process.argv);
