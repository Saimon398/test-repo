import _ from 'lodash';

/**
 * @description compares objects TEST 4
 * @param {Object {}} obj1 first object
 * @param {Object {}} obj2 second object
 * @returns {Boolean}
 */
const compareObjects = (obj1, obj2) => {
  const props = ['name', 'state', 'website'];
  let isSame = true;
  for (const property of props) {
    isSame = obj1[property] === obj2[property] && isSame;
  }
  return isSame;
};

// const getLastItem = (arr) => {
//   const indexOfLast = arr.length - 1;
//   const lastItem = arr[indexOfLast];
//   return lastItem;
// };

// const getFileInfo = (filepath) => {
//   const parts = filepath.split('/');
//   const filename = getLastItem(parts);
//   const extension = getLastItem(filename.split('.'));

//   const info = {filename, extension};
//   return info;
// };

/**
 * @description gets info about domain
 * @param {String} domain
 * @returns {Object {}}
 */
const getDomainInfo_1 = (domain) => {
  const info = {};

  if (!domain.startsWith('http')) {
    info.scheme = 'http';
    info.name = domain;
  } else {
    const [scheme, name] = domain.split('://');
    info.scheme = scheme;
    info.name = name;
  }
  return info;
};

/**
 * @description gets info about domain
 * @param {String} domain
 * @returns {Object {}}
 */
const getDomainInfo_2 = (domain) => {
  let scheme = '';
  if (domain.startsWith('https://')) {
    scheme = 'https';
  } else {
    scheme = 'http';
  }
  const name = domain.replace(`${scheme}://`, '');
  return { scheme, name };
};

// Проверка существования свойств
// Нужно проверить наличие свойства и выполнить особую логику, в случае его отсутствия
/**
 * @description counts words in array
 * @param {} text
 * @returns
 */
const countWords = (text) => {
  const words = {};
  if (text.length !== 0) {
    for (const word of text.split(' ')) {
      const loweredWord = word.toLowerCase();
      words[loweredWord] = (words[loweredWord] ?? 0) + 1;
    }
  }
  return words;
};

/**
 * @description returns object with specific props
 * @param {Object {}} data
 * @param {Object []} requiredProps
 * @returns
 */
const pick = (data, requiredProps) => {
  const result = {};
  for (const requiredProp of requiredProps) {
    if (Object.hasOwn(data, requiredProp)) {
      result[requiredProp] = data[requiredProp];
    }
  }
  return result;
};

// Вложенные объекты
// Для вывода на экран объект с таким уровнем вложенности нужно воспользоваться
// JSON.stringify(obj)
const obj1 = { a: { b: { c: { key: 'value' }, e: [1, 2] } } };

// Очень усложняется проверка наличия свойства
// Такое нужно решать либо в лоб, либо через оператор опциональной последовательности
// Он возвращает искомое значение или undefined

// const obj2 = {};
// console.log(obj2?.one?.two ?? 'defaultValue');

/**
 * @description returns searched property
 * @param {Object {}} data
 * @param {Object []} keys
 * @returns
 */
const get = (data, keys) => {
  for (const key of keys) {
    if (Object.hasOwn(data, key)) {
      data = data[key];
    } else {
      return null;
    }
  }
  return data ?? null;
};

/**
 * @description fills new object by allowed props from source
 * @param {Object {}} data
 * @param {Object []} allowedKeys
 * @param {Object {}} source
 */
const fill = (data, allowedKeys, source) => {
  const filteredData = allowedKeys.length > 0 ? _.pick(source, allowedKeys) : source;
  Object.assign(data, filteredData);
};

// Копирование объектов

const user = { name: 'Tirion', email: 'support@hexlet.io', age: 44 };

// Поверхностное копирование
const copyOfUser = { ...user }; // Новый объек

// Глубокое копирование

/**
 * @description deep clone of object
 * @param {Object {}} data
 * @returns
 */
const cloneDeep = (data) => {
  const copy = {};
  for (const [key, value] of Object.entries(data)) {
    copy[key] = typeof value === 'object' ? cloneDeep(value) : value;
  }
  return copy;
};

/**
 * @description creates company descripiton as object
 * @param {String} name
 * @param {Object} extraProps
 * @returns {Object}
 */
const make = (name, extraProps) => ({
  name, state: 'moderating', createdAt: Date.now(), ...extraProps,
});

// Деструктуризация в объектах

/**
 * @description gets names of users and sorts them
 * @param {Object []} users users
 * @returns {Object []} users'names
 */
const getSortedNames = (users) => {
  const sortedNames = [];
  for (const { name } of users) {
    sortedNames.push(name);
  }
  return sortedNames.sort();
};

/**
 * @description finds match between book from library and searched book
 * @param {Object []} books library
 * @param {Object {}} where searched book
 * @returns
 */
const findWhere = (books, where) => {
  let flag = true;
  for (const book of books) {
    for (const key of Object.keys(where)) {
      flag = where[key] === book[key] && flag; // Если он один раз станет false - это насовсем
    }
    if (flag) {
      return book;
    }
    flag = true;
  }
  return null;
};

// ПОСМОТРЕТЬ ДРУГОЕ РЕШЕНИЕ

/**
 * @description checks if possible to build word  O(N + M);
 * @param {String} letters
 * @param {String} word
 * @returns
 */
const isPossibleToMakeWord = (letters, word) => {
  const letterCounter = {};
  const lettersInWord = {};
  for (const letter of letters.toLowerCase()) {
    letterCounter[letter] = (letterCounter[letter] ?? 0) + 1;
  }
  for (const letter of word.toLowerCase()) {
    lettersInWord[letter] = (lettersInWord[letter] ?? 0) + 1;
  }
  for (const letter of word.toLowerCase()) {
    if (letterCounter[letter] < lettersInWord[letter] || letterCounter[letter] === undefined) {
      return false;
    }
  }
  return true;
};

// ВЫЧИСЛИТЕЛЬ ОТЛИЧИЙ

/**
 * @description gets differences between two objects
 * @param {Object {}} first
 * @param {Object {}} second
 * @returns {Object {}}
 */
const genDiff = (first, second) => {
  const result = {};
  const mergedKeys = Object.keys({ ...first, ...second });
  for (const key of mergedKeys) {
    if (first[key] && second[key]) {
      result[key] = first[key] === second[key] ? 'unchanged' : 'changed';
    } else {
      result[key] = first[key] ? 'deleted' : 'added';
    }
  }
  return result;
};
