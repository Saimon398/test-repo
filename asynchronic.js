import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getOutputFilename = (url, extension) => {
  const { hostname, pathname } = new URL(url);
  const filename = `${[hostname, pathname].join('').replace(/[^a-z]/g, '-')}${extension}`;
  return filename;
};

const getOutputDirname = (url, extension = '_files') => {
  const { hostname, pathname } = new URL(url);
  const dirname = `${[hostname, pathname].join('').replace(/[^a-z]/g, '-')}${extension}`;
  return dirname;
};

/**
 * @description Check if URL is local
 * @param {String} checkedURL 
 * @param {String} localURL 
 * @returns {Boolean}
 */
const isLocal = (checkedURL, localURL) => {
  if(checkedURL.startsWith('/')) {
    return true;
  }
  const { hostname: checkedHostname } = new URL(checkedURL);
  const { hostname: localHostname } = new URL(localURL);
  return checkedHostname === localHostname;
};

/**
 * Данная функция собирает ссылки (причем все, а не только изображения)
 */
const parse = (html, url) => {
  const $ = cheerio.load(html);
  const links = [];
  const attributesByTags = {
    img: 'src',
    script: 'src',
    link: 'href'
  };
  $(Object.keys(attributesByTags))
    .each((index, tagName) => {
      const elements = $('html').find(tagName);
      const attributes = elements
        .map((index, element) => $(element)
        .attr(attributesByTags[element]))
        .get()
        .filter(({ src, href }) => {
          if (src || href) {
            const checkedSource = src ?? href;
            return isLocal(checkedSource, url);
          }
        });
      links[index] = attributes;
    })
  return links.flat();
};

/**
 * Функция, которая получает контент по ссылкам, которые удовлетворяют
 * локальным ресурсам
 */
const loadLocalSources = (links) => {
  // Здесь у нас ссылки, по которым можно делать запросы (изображения, ссылки, скрипты)
  const paths = links.map(({ src, href }) => src ?? href);
  // Можно делать запросы по ссылкам и возвращать контент в виде arrayBuffer
  // Здесь мы получаем массив из промисов
  const promises = paths.map((path) => axios({
    method: 'get',
    url: `${path}`,
    responseType: 'arraybuffer',
  }));
  // Обрабатываем их параллельно через Promise.all
  return Promise.all(promises)
    .catch((error) => console.error(error)); 
};

/**
 * Обновляет локальные аттрибуты
 */
 const updateAttributes = (html, links) => { 
  const $ = cheerio.load(html);
  const names = links.map(({ src, href }) => src ?? href);
  const changedNames = names.map((name) => getOutputFilename(name, path.extname(name)));
    links.forEach(({ src, href }, index) => {
      const checkedAttribute = src ? 'src' : 'href';
      const checkedValue = names[index]; 
      $('html').find(`[${checkedAttribute}=${checkedValue}]`).attr(checkedAttribute, changedNames[index]);
  });
  return $.html();
};


// Нужно написать функцию на промисах, которая сохраняет страницы
const loadPages = (url, dirpath) => {
  // Создаем имя для директории
  const outputDirname = getOutputDirname(url);
  // Создаем имя для документа с разметкой 
  const outputFilename = getOutputFilename(url, '.html');
  // Глобальные переменные для хранения данных
  let html;
  let links;
  let absoluteDirpath;
  let absoluteFilepath;
  // Делаем первый HTTP-запрос по URL
  return axios.get(url)
    // После этого запроса возвращается Repsponse Schema по целой странице
    .then(({ data }) => {
      // Разметка
      html = data;
      // Ссылки на img, script и link, которые удовлетворяют локальным ресурсам
      links = parse(data, url);
      return html;
    })
    // Здесь мы создаем директорию, в которой будут сохраняться загруженные страницы
    .then(() => {
      // Создаем путь для директории
      absoluteDirpath = path.join(__dirname, dirpath, outputDirname);
      // Cоздаем директорию
      return fs.mkdir(absoluteDirpath);
    })
    // Тут создаем файл с содержимым документа 
    .then(() => {
      // Создаем путь до файла 
      absoluteFilepath = path.join(absoluteDirpath, outputFilename);
      // Записываем разметку в документ
      return fs.writeFile(absoluteFilepath, html, 'utf-8');
    })
    // Забираем содержимое локальных ресурсов и сохраняем
    .then(() => loadLocalSources(links))
    // Кладем локальные ресурсы в отдельные файлы 
    .then((sourcesResponses) => Promise.all(sourcesResponses.map(({ data, config }) => {
      // Забираем расширение у локального файла
      const extension = path.extname(config.url);
      // Формируем новое имя для каждого локального файла
      const sourceName = getOutputFilename(config.url, extension);
      // Формируем путь для каждого из локальных файлов
      const sourcePath = path.join(absoluteDirpath, sourceName);
      // Записываем каждое содержимое в отдельный документ
      return fs.writeFile(sourcePath, data, 'utf-8');
    })))
    // Переписываем имена локальных ресусров в общем содержимом документа
    .then(() => {
      // Обновляем документ 
      const updatedHTML = updateAttributes(html, links);
      // Заново записываем по нужному адресу
      return fs.writeFile(absoluteFilepath, updatedHTML, 'utf-8');
    })
    .catch((error) => console.error(error));
};




















