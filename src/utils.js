import * as cheerio from 'cheerio';
import path from 'path';
import axios from 'axios';
import prettier from 'prettier';
import Listr from 'listr';

/**
 * @description Return Update Name for Loaded Pages
 * @param {String} url 
 * @param {String} extension
 * @returns {String} Updated Name
 */
export const getOutputName = (url, extension) => {
  const { hostname, pathname } = new URL(url);
  const name = `${[hostname, pathname].join('').replace(/[^a-z]/g, '-')}${extension}`;
  return name;
};

/**
 * @description Check if URL is Local
 * @param {String} verifiableURL URL to be Verified
 * @param {String} localURL URL to be Compared to
 * @returns {Boolean}
 */
export const isLocal = (verifiableURL, localURL) => {
  if (verifiableURL.startsWith('/')) {
    return true;
  }
  const { hostname: verifiableHostname } = new URL(verifiableURL);
  const { hostname: localHostname } = new URL(localURL);
  return verifiableHostname === localHostname;
};

/**
 * @description Parse Data and Return Needed Links
 * @param {String} data Data to be Parsed
 * @param {String} url URL Where the Data is Located
 */
 export const parse = (html, url) => {
  const $ = cheerio.load(html);
  const attributesByTags = {
    img: 'src',
    script: 'src',
    link: 'href',
  };
  const links = [];

  $(Object.keys(attributesByTags))
    .each((i, tagName) => {
      const elements = $('html').find(tagName);
      const attributes = elements.map((index, element) => $(element)
        .attr(attributesByTags[element]))
        .get()
        .filter(({ src, href }) => {
          if (src || href) {
            const checkedSource = src ?? href;
            return isLocal(checkedSource, url);
          }
          return false;
        });
      links[i] = attributes;
    });
  return links.flat();
};

/**
 * @description Return Loaded Local Assets
 * @param {Object} links Links to Local Assets Whose Names to be Updated
 * @returns {Promise} Array of Loaded Local Assets
 */
export const loadLocalAssets = (links) => {
  const paths = links.map(({ src, href }) => src ?? href);
  // При формировании промисов, создаются объекты, которые являются заданиями для LISTR
  // const promises = paths.map((path) => axios({
  //   method: 'get',
  //   url: `${path}`,
  //   responseType: 'arraybuffer',
  // }));

  const promises = paths.map((path) => ({
    title: `${path}`, // В качестве названия будет фигурировать имя локального ресурса
    task: () => console.log('1')
  }));

  // Формируем список заданий: 1 - список заданий (объекты), 2 - конфигурация
  const tasks = new Listr(promises, { concurrent: true, exitOnError: false });

  return Promise.all(promises)
  .then(() => tasks.run())
  .catch((e) => console.error(e));
};

/**
 * @description Change Names of Local Attributes to The New Ones
 * @param {String} html Markup to be Updated
 * @param {Object} links Links to Local Assets Whose Names to be Updated
 * @param {String} dirname Name of Directory Where Loaded Pages are Kept
 * @returns {String} Updated Markup
 */
export const updateAttributes = (html, links, dirname) => {
  const $ = cheerio.load(html);
  const names = links.map(({ src, href }) => src ?? href);
  const changedNames = names.map((name) => getOutputName(name, path.extname(name)));
  links.forEach(({ src }, index) => {
    const verifiableAttribute = src ? 'src' : 'href';
    const verifiableValue = names[index];
    $('html')
      .find(`[${verifiableAttribute}=${verifiableValue}]`)
      .attr(verifiableAttribute, `${dirname}/${changedNames[index]}`);
  });
  const updatedHTML = prettier.format($.html(), { parser: 'html' });
  return updatedHTML;
};
