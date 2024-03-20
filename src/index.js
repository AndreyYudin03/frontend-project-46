import { cwd } from 'node:process';
import { resolve, extname, parse } from 'node:path';
import { readFileSync } from 'node:fs';
import getData from './parsers.js';
import makeAstTree from './makeAstTree.js';
import formatter from './formatters/index.js';

const getFileDataByPath = (pathToFile) => getData(
  readFileSync(resolve(cwd(), pathToFile)),
  extname(parse(pathToFile).base),
);

const getDiffFiles = (filepath1, filepath2, format = 'stylish') => {
  const [file1, file2] = [
    getFileDataByPath(filepath1),
    getFileDataByPath(filepath2),
  ];

  return formatter(makeAstTree(file1, file2), format);
};

export default getDiffFiles;
