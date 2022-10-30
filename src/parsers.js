import yaml from 'js-yaml';

/**
 * @description Парсит получаемые данные в зависимости от расширения
 * @param {any} data 
 * @param {String} extension 
 * @returns 
 */
export default (data, extension) => {
  switch (extension) {
    case '.yaml':
      return yaml.load(data);
    default:
      return JSON.parse(data);
  };
};