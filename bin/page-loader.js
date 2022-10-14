#!/usr/bin/env node
import { program } from 'commander';
import Listr from 'listr';

program
  .name('page-loader')
  .version('0.0.1')
  .description('The utility to load pages')
  .option('-o --output [dir]', 'output dir (default: "/home/user/current-dir"', process.cwd())
  .argument('<url')
  .action((url) => {
    const dirpath = program.opts().output;
    pageLoader(url, dirpath);
  });

program.parse(process.argv);



