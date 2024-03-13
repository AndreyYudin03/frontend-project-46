#!/usr/bin/env node
import { Command } from 'commander';
import getDiffFiles from '../src/index.js';

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(getDiffFiles(filepath1, filepath2, program.opts().format));
  })
  .parse(process.argv);

export default getDiffFiles;
