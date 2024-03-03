import { cwd } from 'node:process';
import { resolve, extname, parse } from 'node:path';
// import path from 'node:path';
import { readFileSync } from 'node:fs';
// import _ from 'lodash';
import getData from './parsers.js';
import makeAstTree from './makeAstTree.js';
import formatter from './stytlish.js';

const getFileDataByPath = (pathToFile) =>
  getData(
    readFileSync(resolve(cwd(), pathToFile)),
    extname(parse(pathToFile).base)
  );

const getDiffFiles = (filepath1, filepath2) => {
  const [file1, file2] = [
    getFileDataByPath(filepath1),
    getFileDataByPath(filepath2),
  ];

  return formatter(makeAstTree(file1, file2));
};

export default getDiffFiles;
