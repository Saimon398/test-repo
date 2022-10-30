// /**
//  * FUNCTIONS
//  */

// import _ from 'lodash';

// // Разделение функция на чистую и функцию с побочными эффектами
// /**
//  * @description defines if the number is prime
//  * @param {Number} number
//  * @returns {Boolean}
//  */
// const isPrime = (number) => {
//   let divisor = 2;
//   let isPrimeNumber = true;
//   while (divisor <= Math.sqrt(number)) {
//     if (number % divisor === 0) {
//       isPrimeNumber = false;
//       break;
//     }
//     divisor += 1;
//   }
//   return isPrimeNumber;
// };

// /**
//  * @description says if the number is prime
//  * @param {Number} number
//  */
// const sayPrimeOrNot = (number) => {
//   const primeness = isPrime(number) ? 'yes' : 'no';
//   console.log(primeness);
// };

// // Упаковка любого количества аргументов через rest-operator

// /**
//  * @description calculates average of numbers
//  * @param  {...any} numbers array of numbers
//  * @returns {Number} average
//  */
// const calcAverage = (...numbers) => {
//   let sum = 0;
//   if (numbers.length === 0) {
//     return null;
//   }
//   for (const number of numbers) {
//     sum += number;
//   }
//   const average = (sum / numbers.length);
//   return average;
// };

// // Распаковка аргументов через spread-оператор

// /**
//  * @description converts date to readable view
//  * @param  {...any} dates dates
//  * @returns {Object []} readable dates
//  */
// const convertDateToString = (...dates) => { // [[], [], []]
//   const stringifiedDates = [];
//   for (const date of dates) {
//     const stringDate = new Date(...date).toDateString();
//     console.log(stringDate);
//     stringifiedDates.push(stringDate);
//   }
//   return stringifiedDates;
// };

// /**
//  * @description sorts users by their birthdays
//  * @param {*} users
//  * @param {*} number
//  * @returns
//  */
// const takeOldest = (users, number = 1) => {
//   const result = [];
//   const sortedUsers = users.sort((a, b) => Math.sign(Date.parse(a.birthday) - Date.parse(b.birthday)));
//   for (let i = 0; i < number; i += 1) {
//     result.push(sortedUsers[i]);
//   }
//   return result;
// };

// // ОТОБРАЖЕНИЕ
// const myMap = (collection, callback) => {
//   const result = [];
//   for (const item of collection) {
//     const newItem = callback(item);
//     result.push(newItem);
//   }
//   return result;
// };

// const getChildren = (users) => {
//   const children = users.map(({ children }) => children);
//   return children.flat();
// };

// // ФИЛЬТРАЦИЯ
// const myFilter = (collection, callback) => {
//   const result = [];
//   for (const item of collection) {
//     if (callback(item)) {
//       result.push(item);
//     }
//   }
//   return result;
// };

// const getFemaleFriends = (users) => {
//   const femaleFriends = users
//     .map(({ friends }) => friends)
//     .flat()
//     .filter((friend) => friend.gender === 'female');

//   return femaleFriends;
// };

// // АГРЕГАЦИЯ
// const myReduce = (collection, callback, init) => {
//   let acc = init; // Начальное значение аккумулятора
//   for (const item of collection) {
//     acc = callback(acc, item);
//   }
//   return acc;
// };

// /**
//  * @description groups items by certain property
//  * @param {Object} items items to be grouped
//  * @param {String} property certain property
//  * @returns {Object []} grouped items
//  */
// const groupBy = (items, property) => {
//   const result = items.reduce((acc, item) => {
//     const prop = item[property];
//     if (!Object.hasOwn(acc, prop)) {
//       acc[prop] = [];
//     }
//     acc[prop].push(item);
//     return acc;
//   }, {});
//   return result;
// };

// // ПРОТАСКИВАНИЕ ДАННЫХ ЧЕРЕЗ РЯД ФУНКЦИЙ ПРЕОБРАЗОВАТЕЛЕЙ

// const getFreeDomainsCount = (emails, freeEmailDomains) => {
//   const freeDomains = new Set(freeEmailDomains); // O(1)
//   const freeEmails = emails
//   // Оставляем только домены
//     .map((email) => email.split('@')[[1]])
//   // Оставляем только бесплатные домены
//     .filter((domain) => freeDomains.has(domain))
//   // Считаем домены
//     .reduce((acc, domain) => {
//       acc[domain] = (acc[domain] ?? 0) + 1;
//       return acc;
//     }, {});
//   return freeEmails;
// };

// // SOLUTION 1
// /**
//  * Здесь асимптотика похуже - O(3N)
//  * @param {*} collection
//  * @param {*} value
//  * @returns
//  */
// const findIndexOfNearest_1 = (collection, value) => {
//   const difference = collection.map((item) => Math.abs(item - value));
//   const minItem = Math.min(...difference);
//   return difference.indexOf(minItem);
// };

// // SOLUTION 2 - OPTIMIZE BY REDUCING NUMBER OF ARRAY PASSES

// /**
//  * // Асимптотика здесь лучше - O(2N)
//  * @param {*} collection
//  * @param {*} value
//  * @returns
//  */
// const findIndexOfNearest_2 = (collection, value) => {
//   const difference = collection.map((item) => Math.abs(item - value));
//   const result = difference.reduce((index, currentItem, currentIndex) => (currentItem < difference[index] ? currentIndex : index), 0);
//   return result;
// };

// // НЕ КРИТИЧНО, НО ПРИ БОЛЬШОМ МАССИВЕ ДАННЫХ - МОЖЕТ СТАТЬ ПРОБЛЕМОЙ

// /**
//  * @description разбивает массив, на несколько массивов заданной длины
//  * @param {Object []} collection исходный массив
//  * @param {Number} divideBy длина разбиения
//  * @returns {Object []} преобразованный массив
//  */
// const chunk = (collection, divideBy) => {
//   const result = [];
//   for (let i = 0; i < collection.length; i += divideBy) {
//     result.push(collection.slice(i, i + divideBy));
//   }
//   return result;
// };

// /**
//  * @description преобразует шестнадцетиричный формат числа в числовой
//  * @param {String} param0 шестнадцетиричная строка
//  * @returns {Object {}}
//  */
// const hexToRGB = ([, ...rest]) => {
//   const colors = chunk(rest, 2);
//   const colorsInRGB = ['r', 'g', 'b'];
//   return colorsInRGB.reduce((acc, color, index) => {
//     const colorUnit = colors[index].join('');
//     return { ...acc, [color]: parseInt(colorUnit, 16) };
//   }, {});
// };

// /**
//  * @description преобразует числовой
//  * @param {String} param0 шестнадцетиричная строка
//  * @returns {Object {}}
//  */
// const rgbToHex = (...colors) => {
//   const result = colors.reduce((acc, color) => {
//     const resultColor = color.toString(16);
//     const newAcc = resultColor.length > 1 ? acc + resultColor : `${acc}0${resultColor}`;
//     return newAcc;
//   }, '');
//   return result;
// };

// /**
//  * @description генерируют гистограмму
//  * @param {Number} numberOfPlays количество данных
//  * @param {Object ()} roll функция, которая генерирует случайное число
//  */
// const playGame = (numberOfPlays = 100, roll) => {
//   const totalResults = {
//     1: '', 2: '', 3: '', 4: '', 5: '', 6: '',
//   };
//   for (let i = 0; i < numberOfPlays; i += 1) {
//     totalResults[roll()] += '#';
//   }
//   const result = [];
//   for (const [key, value] of Object.entries(totalResults)) {
//     let column;
//     if (value.length === 0) {
//       column = `${key}|`;
//     } else {
//       column = `${key}|${value} ${value.length}`;
//     }
//     result.push(column);
//   }
//   console.log(`${result.join('\n')}`);
// };

// /**
//  * @description объединяет словари в 1 словарь
//  * @param  {...any} dictionaries
//  * @returns
//  */
// const merge = (...dictionaries) => dictionaries
//   .flatMap((dict) => Object.entries(dict))
//   .reduce((acc, dict) => {
//     const [key, value] = dict;
//     if (!Object.hasOwn(acc, key)) {
//       acc[key] = [];
//     }
//     acc[key].push(value);
//     acc[key] = _.uniq(acc[key]);
//     return acc;
//   }, {});

// /**
//  * @description Преобразование IPv4 в число
//  * @param {String} ip
//  * @returns
//  */
// const ipToInt = (ip) => {
//   const ipBytes = ip.split('.');
//   let sum = 0;
//   for (let i = ipBytes.length - 1, j = 0; i >= 0; i -= 1, j += 1) {
//     const byte = ipBytes[j] * 256 ** i;
//     sum += byte;
//   }
//   return sum;
// };

// /**
//  * @description Преобразование числа в IPv4
//  * @param {String} ip
//  * @returns
//  */
// const intToIp = (number) => {
//   const hexNumber = number.toString(16);
//   const result = _.chunk(hexNumber.split(''), 2)
//     .map((byte) => byte.join(''))
//     .map((byte) => parseInt(byte, 16))
//     .join('.');
//   return result;
// };

// // ПОСМОТРЕТЬ АЛГОРИТМ РЕШЕНИЯ ЗАДАЧИ ПО НАХОЖДЕНИЮ ДЛИНЫ МАКСИМАЛЬНОЙ ПОСЛЕДОВАТЕЛЬНОСТИ
