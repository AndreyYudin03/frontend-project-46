import { cwd } from 'node:process';
import { resolve, extname } from 'node:path';
import { readFileSync } from 'node:fs';
import getData from './parsers.js';
import makeAstTree from './makeAstTree.js';
import formatter from './formatters/index.js';

const getFileDataByPath = (pathToFile) => {
  const filePath = resolve(cwd(), pathToFile);
  const fileContent = readFileSync(filePath, 'utf-8');
  const fileExtension = extname(filePath);

  return getData(fileContent, fileExtension);
};

const getDiffFiles = (filepath1, filepath2, format = 'stylish') => {
  const [fileData1, fileData2] = [
    getFileDataByPath(filepath1),
    getFileDataByPath(filepath2),
  ];

  return formatter(makeAstTree(fileData1, fileData2), format);
};

export default getDiffFiles;
