#!/usr/bin/env node

const { Command } = require('commander');

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath12>')
  .parse(process.argv);
