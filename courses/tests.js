/**
 * FUNCTIONS
 */

import _ from 'lodash';

// Код всегда должен быть протестирован - это очень важно!!!

const capitalize = (string) => {
  const firstChar = string[0].toUpperCase();
  const restOfText = string.slice(1);
  return `${firstChar}${restOfText}`;
};

// Автоматические тесты

if (capitalize('hello') !== 'Hello') {
  throw new Error('Function doesnt work');
}
