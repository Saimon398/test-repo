import { beforeAll, beforeEach, describe, expect, test } from '@jest/globals';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 *            Алгоритм тестирования
 * 
 * 1)  Считать файлы перед форматированием
 * 2)  Создать новый файл, и сохранить его во временной директории
 * 3)  Данные полученные, после чтения отформатировать и записать в
 *     временно сохраненный файл
 * 4)  Считать и сравнить
 * 
 * 
 *      Перед каждым созданием нового временного файла
 *      нужно удалять старый
 */
/**
 * Путь до файла
 */
const __filename = fileURLToPath(import.meta.url);

/**
 * Путь до каталога с файлом
 */
const __dirname = path.dirname(__filename);

/**
 * Путь до временной директории, куда нужно сохранять 
 * отформатированный файл, чтобы потом сравнить
 */
const tmpdir = os.tmpdir();

/**
 * Находит путь до фикстуры, которые надо считывать
 */
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

/**
 * Фикстура с оригинальными данными
 */
const filename = 'before.html';

/**
 * Путь, где будет лежать временный файл
 */
const dest = path.join(tmpdir, filename);

/**
 * Путь до оригинальных данных
 */
const src = getFixturePath(filename);

let expected;

beforeAll(async () => {
  expected = await fs.readFile(getFixturePath('after.html'), 'utf-8');
});

// Перед каждыми тестами происходит копирование данных из 
// оригинала в копию, которая лежит во временном каталоге

// Здесь не происходит удаление - каждый раз просто будет происходить перезапись
// содержимого. Потом будет форматирование и сравнение с результатом
beforeEach(async () => {
  await fs.copyFile(src, dest);
});

test('prettifyHTML', async () => {
  await prettifyHTMLFile(dest); // Форматируем копию
  const actual = await fs.readFile(dest, 'utf-8'); // Считываем данные из копии
  expect(actual).toBe(expected); // Сравниваем отформатированную копию и фикстуру с отформатированными данными
});


/**
 * Для избежания побочных эффектов также используется метод инверсии зависимостей 
 * Когда функция принимает в себя объекты или функции в качестве параметра
 * Данный объект или функция называются stub - заглушками. Они используются для того, 
 * чтобы сменить поведение объекта-функции параметра на другое во избежание 
 * побочного эффекта при тестировании.
 */

describe('get files count', () => {
  // Заглушка, которая будет передана в качестве параметра
  const stub = () => {};

  test('flat files count', () => {
    expect(getFilesCount(getFixturePath('flat'), stub)).toEqual(3);
  });

  test('nested files count', () => {
    expect(getFixturePath('nested'), stub).toEqual(4);
  });

});


/**
 * Инверсия зависимостей - мощная штука. 
 * Она также работает с HTTP-запросами. Предположим, что 
 * у нас есть функция, которая анализирует приватные репозитории на GitHub
 * и возвращает те, что являются форками. 
 */

// Библиотека для работы с GitHub API
import Octokit from '@octokit/rest';

const getPrivateForksNames = async (username) => {

  const client = new Octokit();
  // Клиент выполняет запрос на GitHub и возвращает список приватных репозиториев
  // указанной организации
  // Данные хранятся в свойстве data возвращаемого ответа

  // В данной константе хранятся только приватные репозитории
  const { data } = await client.repos
    .listForOrg({
      username,
      type: 'private',
    });

  // Оставляем только имена форков
  return data.filter(repo => repo.fork).map(repo => repo.name);
};

// Теперь нужно ее протестировать
// Что мы хотим от этой функции - возвращаение массив приватных форков. 

// Это идеальный тест
test('getPrivateForksNames', async () => {
  const privateForks = await getPrivateForksNames('hexlet');
  expect(privateForks).toEqual(expect.arrayContaining([/* Массив имен */]));
});

/**
 * К сожалению не все так просто, так как внутри функции выполняется запрос HTTP
 * Из-за этого могут возникать определенные проблемы
 * 
 * 1) Нестабильная сеть может тормозить тесты 
 * 2) У сервисов, которые похожи на GitHub, установлены лимиты на запросы 
 * 3) Реальные данные на GitHub не статичны - они могут менятся со временем
 * 
 * 
 * Используем инверсию зависимостей. 
 * 
 * Для использования инверсии зависимости добавим вторым аргументом функции 
 * сам клиент Octokit. Это позволит подменить его в тестах. 
 * 
 */

import Octokit from '@octokit/jest';

const getPrivateForksNames = async (username, client = new Octokit()) => {
  // ...
};

// Теперь нам придется реализовать ненастоящий Octokit, 
// который ведет себя аналогично (но не выполняет сетевые запросы)

// Также нам нужно описать данные, которые вернет вызов listForOrg

class OctokitFake {
  // Здесь мы описываем данные, которые должны вернуться в тесте
  constructor(data) {
    this.data = data;
  }

  repos = {
    listForOrg: () => {
      // Структура возврата должна совпадать с реальным клиентом
      return Promise.resolve({ data: this.data }); // Так как метод асинхронный
    }
  }
};

test('getPrivateForksNames', async () => {
  const data = 'Ответ от GitHub';
  const client = new OctokitFake(data);

  const username = 'Имя пользователя на GitHub';
  const privateForks = await getPrivateForksNames(username, client);
  expect(privateForks).toEqual('то, что мы ожидаем увидеть');
});

/**
 * Здесь нужно использовать заглушку 
 */

// Как работает сама функция 

/**
 * @description Функция, которая возвращает языки для каждого репозитория
 * @param {String} username Имя аккаунта
 * @param {Object} client Библиотека для работы с GitHub API
 * @returns {Object []}
 */
const getUserMainLanguages = async (username, client = new Octokit()) => {
  // Тут возвращается массив из репозиториев-объектов со свойствами
  const { data } = await client.repos.listForUser({ username });
  return data.map((repo) => ({ language: repo.language }));
};

// Пропишем stub-класс для тестирования
class OctokitFake {
  constructor (data) { // Сюда он будет получать данные для тестирования
    this.data = data;
  }

  repos = {
    listForUser: () => {
      return Promise.resolve({ data: this.data }); // В качестве параметра выступают начальные данные (операция)
    },
  }
}

// Пропишем сам тест

test('getUserMainLanguage', async () => {
  const data = [
    { language: 'ruby' },
    { language: 'php' },
    { language: 'java' },
    { language: 'php' },
    { language: 'js' },
  ];
  const client = new OctokitFake(data);
  const mainLanguage = await getUserMainLanguage('linus', client);
  expect(mainLanguage).toEqual('php');
});

test('getUserMainLanguage when empty', async () => {
  const client = new OctokitFake([]);
  const mainLanguage = await getUserMainLanguage('user-without-repos', client);
  expect(mainLanguage).toBeNull();
});


// Манкипатчинг

/**
 * Была функция, которая выводила список приватных форков
 */

const getUserPrivateForks = (username, client = new Octokit()) => {
  const { data } = client.repos
    .listForOrg({
      username, 
      type: 'private'
    }); // Выводится список всех приватных репозиториев
  return data
    .filter((repo) => repo.fork)
    .map((fork) => fork.name);
};


/**
 * Чтобы ее протестировать нужно было поставить заглушку - стаб
 * для того, чтобы избежать HTTP-запросов при тестировании
 * 
 * Иногда инверсия зависимостей подхожит идеально, а иногда
 * она очень усложнаяет код. Есть способ, который позволяет 
 * добраться до нужных вызовов и без инверсии зависимостей.
 * 
 * Прототипная модель JS позволяет менять поведение объектов без
 * прямого доступа к ним. Для этого достаточно заменить методы 
 * в прототипе.
 */

/**
 * Поменяем объект-repos так, чтобы он не делал сетевой запрос 
 * После такого Octokit поменяет свое поведение по всей программе - BE CAREFUL
 */



/**
 * Property-Based Тестирование
 * 
 * 
 * Данное тестирование основано на свойствах - подход 
 * к функциональному тестированию, который помогает проверить, 
 * соотвествует ли тестируемая функция заданному свойству.
 * Для этого подхода не нужно задавать все тестовые примеры. Его задача - 
 * сопоставлять характеристики на выходе с заданным свойством
 * 
 * Мы описываем инвариант в стиле - для любых данных, таких, что .....
 * выполняется условие 
 * 
 * for all (z, y, x, ...)
 * such as precondition (x, y, z, ...) holds
 * property (x, y ...) is true
 */

const divide = (a, b) => a / b;

const { equal } = require('assert');
equal(divide(4, 2), 2);
equal(divide(18, 3), 6);

/**
 * Тесты проходят. Но здесь проверяется работа функции только 
 * в 2-х случаях. Может оказаться, что при других парах входных
 * данных, функция работает неверно. 
 * 
 * Чтобы решить эту проблему, нужно написать тест, который фокусируется 
 * на свойствах в целом. Эти свойства должны быть истинными для любой реализации
 * 
 * У операции деления есть свойство a/c + b/c = (a + b) / c
 * 
 */

// Не будем завязываться на конкретные значения 
const a = Math.random() * 1000;
const b = Math.random() * 1000;
const c = Math.random() * 1000;

const left = divide(a + b, c);
const right = divide(a,c) + divide(b,c);

// Будем запускать этот тест много раз, и в какой то момент он упадет при нулях
// Значит нужно добавить проверку на нули - это и есть тестирование на основе свойств

/** 
 * В реальной жизни никто не гоняет тесты в ручную в цикле. Есть фреймворки
 * Они охватывают все типы данных. 
 * Сокращают тестовые примеры
 * 
 * 
 * Протестируем с помощью fast-check реализацию функции contains(), 
 * которая проверяет содержиться ли подстрока в строке
 * 
 * У строк можно выделить 2 свойства
 * 1) Она всегда содержит саму себя в качестве подстроки
 * 2) Строка a + b + c всегда содержит подстроку b, независимо от содержания a,b,c
 */



// Тестируемый код
import fc from 'fast-check';

const contains = (text, pattern) => text.indexOf(pattern) >= 0; // Если -1 - значит вхождения в строку нет

// Описываем свойства через фреймворк

test('string should always contain itself', () => {
  fc.assert(
    fc.property(
      fc.string(),
      text => contains(text, text)
    )
  );
});

test('string should always contain its substring', () => {
  fc.assert(
    fc.property(
      fc.string(), fc.string(), fc.string(),
      (a, b, c) => contains(a + b + c, b)
    )
  )
});

/**
 * fc.assert(<property>, (, parameters)) - выполняет тестрирование и
 * проверяет, что свойство остается верным для всех созданных библиотекой строк a, b, c
 * fc.property(генератор проверяемых значений, функция, которая это проверяет)
 */


/**
 * У отсортированных массивов минимальный элемент - 1
 * Максимальный элемент - крайний
 * Предыдущий элемент, всегда меньше или равен следующему
 * 
 */





































