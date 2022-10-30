import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import debug from 'debug';
import {
  getOutputName, loadLocalAssets, updateAttributes, parse,
} from './src/utils.js';
import Listr from 'listr';

/**
 * Здесь будет функция, которая будет заниматься логгированием
 */
const logger = debug('page-loader');

/**
 * @description Load pages by given URL and keeps them in the dir
 * @param {String} url
 * @param {String} dirpath
 */
export default (url, dirpath) => {
  const outputDirname = getOutputName(url, '_files');
  const outputFilename = getOutputName(url, '.html');

  let markup;
  let links;
  let absoluteDirpath;
  let absoluteFilepath;

  return axios.get(url)
    .then(({ data }) => {
      markup = data;
      links = parse(data, url);
      absoluteDirpath = path.join(dirpath, outputDirname);
      return fs.mkdir(absoluteDirpath);
    })
    .then(() => {
      absoluteFilepath = path.join(absoluteDirpath, outputFilename);
      return fs.writeFile(absoluteFilepath, markup, 'utf-8');
    })
    .then(() => loadLocalAssets(links)) // Здесь происходит вывод заданий !!!
    .then((responses) => Promise.all(responses.map(({ config, data }) => {
      const extension = path.extname(config.url);
      const sourceName = getOutputName(config.url, extension);
      const absoluteSourcePath = path.join(absoluteDirpath, sourceName);
      return fs.writeFile(absoluteSourcePath, data, 'utf-8');
    })))
    .then(() => {
      const updatedHTML = updateAttributes(markup, links);
      return fs.writeFile(absoluteFilepath, updatedHTML, 'utf-8');
    })
    .catch((error) => console.error(error));
};

