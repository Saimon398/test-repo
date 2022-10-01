// // import fs from 'fs';
// // import _ from 'lodash';
// // /**
// //  * Допустим, что мы хотим прочитать содержимое файла и распарсить его,
// //  * как JSON. Очевидно, что в синхронном коде это тяжело сделать, 
// //  * так как программа остановится, пока файл не прочтется
// //  */

// const { test, expect, describe } = require("@jest/globals");


// // /**
// //  * Возвращает данные, преобразованные из JSON
// //  */
// // const readJSONSync = (filename) => {
// //   return JSON.parse(fs.readFileSync(filepath, 'utf-8')); 
// // };

// // /**
// //  * Чтобы операции Input/Output не замедляли нашу программу, 
// //  * мы сделаем фунции асинхронными. Однако, идея с коллбек-функциями
// //  * ведет ко многим трудностями - отслеживание ошибок
// //  */

// // // Здесь мы не сможем отследить ошибку парсинга
// // const readJSON = (filename, callback) => {
// //   fs.readFile(filename, 'utf-8', (error, data) => {
// //     // Отслеживаем ошибку
// //     if(error) return callback(error);
// //     // Если ошибки нет, то спокойно вызываем callback
// //     // чтобы увидеть результат выполнения
// //     callback(null, JSON.parse(data));
// //   });
// // };

// // const readJSON2 = (filename, callback) => {
// //   fs.readFile(filename, 'utf-8', (error, data) => {
// //     // Если возникает ошибка в чтении файла
// //     if(error) return callback(error);

// //     // Если файл прочитался без ошибок, то
// //     // нужно отследить ошибку парсинга полученных данных
// //     try {
// //       data = JSON.parse(data);
// //     } catch (ex) {
// //       return callback(ex);
// //     }
// //     return callback(null, data);
// //   });
// // };

// // /**
// //  * Основная идея, что промис - это объект, который хранит в себе 
// //  * состояния выполнения асинхронной операции
// //  * 
// //  * pending - начальное состояние (операция еще не закончена)
// //  * fulfilled - операция выполнена успешно
// //  * rejected - операция выполнена с ошибкой
// //  * 
// //  * 
// //  * Не всегда все библиотеки, скрипты поддерживают интерфейс промисов
// //  * Иногда приходится создавать его в ручную
// //  */

// // const readFile = (filename, enc) => {
// //   return new Promise ((resolve, reject) => {
// //     fs.readFile(filename, 'utf-8', (error, data) => {
// //       if (error) reject(error);
// //       else resolve(data);
// //     });
// //   });
// // };

// // // Задачи на промисы. 

// // /**
// //  * При написании обычного кода, команды пишутся друг за другом
// //  * Вызываются они в том же порядке
// //  * 
// //  * Предположим, что getUsers, getTasks, tasksDist - асинхронные
// //  * Каждая асинхронная функция должна быть вызвана, после окончания 
// //  * работы предыдущей асинхронной функции !!! 
// //  * 
// //  * 1) Самый простой способ - передать последующие функции в качестве
// //  * функций обратного вызова (callback). Нужно передавать во все функции, 
// //  * так как мы не знаем порядок их выполнения ----> CallBack Hell
// //  * 
// //  * 2) Существует более лаконичное решение - последовательная цепочка
// //  * вызовов асинхронных функций. 
// //  * 
// //  */

// // /**
// //  * Выполнение нескольких синхронных операций последовательно, когда каждая операция
// //  * зависит от результатов предыдущих операций. 
// //  * 
// //  * Функции-callback, которые вызываются асинхронными функциями, содержит null, как
// //  * первый аргумент и результаты в следующих аргументах. Каждая функция в последовательности
// //  * (кроме первой) как аргументы использует результаты предыдущих функций, а callback-функция 
// //  * является последним аргументом. Когда асинхронные операции завершаются, вызывается
// //  * финальная callback-функция, аргументы которой err и результат последней операции
// //  */

// // const unionFiles = (inputPath1, inputPath2, outputPath, callback) => {
// //   // Массив асинхронных функций, которые выполняются последовательно друг за другом
// //   async.waterfall([

// //     // Каждая из функция тащит за собой реультат выполнения предыдущей асинхронной функции
// //     (callback) => fs.readFile(inputPath1, 'utf-8', (error1, data1) => callback(error1, data1)),
// //     (data1, callback) => fs.readFile(inputPath2, 'utf-8', (error2, data2) => callback(error2, data1, data2)),
// //     (data1, data2, callback) => fs.writeFile(outputPath, `${data1}${data2}`, (error) => callback(error))
// //   ],
// //   callback);
// // };


// // /**
// //  * Реализуйте функцию, которая принимает на вход путь
// //  * 
// //  * Нужно будет получить массив промисов и потом сделать Promise.all() 
// //  * и получить массив данных
// //  */

// // /**
// //  * @description Выводит информацию о файлах внутри директории
// //  * @param {String} dirpath Путь до директории, который будем просматривать
// //  */
// // const ls = async (dirpath) => {

// //   // Делаем из относительного пути - аболютный
// //   const absolutePath = path.resolve(dirpath);

// //   // Собирает информацию о файле/директории
// //   const stat = await fs.stat(absolutePath);

// //   // Проверяем является ли данный файл директорией или файлов
// //   if(stat.isFile()) {

// //     // Если является файлом, то возвращаем массив с одним объектом
// //     return [{ filepath: absolutePath, mode: stat.mode }];
// //   }

// //   // Если это директория, то нужно собрать все имена внутрилежащих файлов
// //   const filenames = await fs.readdir(absolutePath); 

// //   // После этого собрать все пути до файлов 
// //   const filepaths = filenames.sort().map((filename) => path.join(absolutePath, filename));

// //   // Нужно собрать всю статистику по всем файлам - у нас после readir возвращаются промисы
// //   const stats = await Promise.all(filepaths.map(fs.stat));

// //   return _.zipWith(filepaths, stats, (filepath, { mode }) => ({ filepath, mode }));

// // };


// // Тестирование 

// /**
//  * Основные тесты, которые нужно писать - тесты на успешные сценарии работы. 
//  * Однако, в некоторых ситуациях код должен возвращать ошибки, которые тоже нужно 
//  * проверять. 
//  */

// test('test mistakes in a wrong way', () => {
//   try {
//     functionWithException(0); // Эта функция функция выбрасывает исключения
//   } catch (error) {
//     // Если возникает ошибка, то она попадает в блок catch и проверяется на !null
//     expect(error).not.toBeNull(); // 
//   } 
// });

// /**
//  * Такой код пытается протестировать ситуацию, при которой 
//  * functinWithException() выбрасывает исключеник
//  * 
//  * Но если функция пройдет верно, то тест просто пройдет мимо, так как 
//  * исключение не попадет в блок catch
//  * 
//  * В Jest есть определенный матчер, который самостоятельно отлавливает 
//  * исключения и проверяет, что оно вообще было сгенерировано
//  */


// // Тестирование ошибок
// describe('check negative cases', () => {
//   test('file does not exist', () => {
//     expect(() => read('./unknownfile')).toThrow('Such file does not exist');
//   });

//   test('checking directory', () => {
//     expect(() => read('/etc')).toThrow('This is a directory');
//   });
// });


/**
 * Фикстуры
 * 
 * Часто бывает, что нужно тестировать данные, которые являются объемными
 * Их лучше всего хранить в папке фикстуры (__fixrtures__). 
 * Когда фикстур больше одной, то в коде тестов начинает появляться 
 * много похожих вызовов, которые считывают файлы.
 * 
 * В таком случае лучше вынести построение пути в отдельную функцию, 
 * а заодно воспользоваться правильным способом склеивания путей.
 */ 


/**
 * Побочные эффекты.
 * Проще всего тестировать код, который состоит из чистых 
 * функций - данные на вход, результат на выходе. 
 */

// describe('buildUser test', () => {
//   test('buildUser fields', () => {
//     const user1 = buildUser();
//     expect(user1).toEqual(expect.objectContaining({
//       email: expect.any(String),
//       firstName: expect.any(String),
//       lastName: expect.any(String),
//     }));
//   });
//   test('buildUser random', () => {
//     const user1 = buildUser();
//     const user2 = buildUser();
//     expect(user1).not.toEqual(user2);
//   });
//   test('buildUser override', () => {
//     const newData1 = { email: 'test@email.ru' };
//     const user1 = buildUser(newData1);
//     expect(user1).toMatchObject(newData1);
//   });
// });

/**
 * Наиболее типичный побочный эффект - взаимодействие с файлами (файловые операции)
 * В основном, это либо чтение файлов. Либо запись в них. 
 * 
 * При тестировании функций, которые читают файлы, должно выполняться ровно одно условие
 * Функция должна позволять менять путь до файла. В таком случае достаточно создать файл нужной 
 * структуры в фикстурах. Это похоже на то, что было в проекте 2. 
 */

import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // Путь к файлу, в котором происходит вызов
const __dirname = dirname(__filename); // Путь к каталогу, в котором лежит файл, в котором происходит вызов 
console.log(__filename);
console.log(__dirname);

import { test, expect, beforeAll, afterEach, beforeEach } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Так как механика теста у нас одинаковая, то можно создать массив 
 * данных, которые будут тестироваться
 */

const formats = ['csv', 'json', 'yaml'];

/**
 * После этого написать функцию, которая будет находить путь до файла
 */
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

/**
 * Объявить внешнюю переменную, так как перед выполнением
 * тестов мы будем считывать содержимое (оно асинхронное)
 */

let expected;

// Перед запуском каждого теста, ожидание пока разрешится промис
// Прочитает файл, а потом запустит тест
beforeAll(async () => {
  expected = await fs.readFile(getFixturePath('result.html'), 'utf-8');
});

/**
 * Прописываем сам тест
 */

test.each(formats)('%s', async (format) => {
  const filePath = getFixturePath(`list.${format}`);
  const received = await toHtmlList(filePath);
  expect(received).toEqual(expected.trim());
})


/**
 * Для тестирования функций, которые читают файлы 
 * достаточно функции, которая будет менять 
 * путь до читаемого файла 
 */

/**
 * С записью файлов все гораздо сложнее
 * Главная проблема - отсуствие идемпотентности - каждый новый вызов 
 * может привести к ошибке - переполнению файла, отсутствию файла и т д
 * 
 */

/**
 * Допустим, что мы пишем тесты на функцию, которая дописывает все 
 * переданные в нее сообщения в файл - обновляет лог
 */

const log = makeLogger('development.log'); // Создание лога
await log('first message');

// cat development.log

// first message

await log('second message');

// cat development.log

// first message
// second message

/**
 * Все это означает, что каждый запуск тестов будет отличаться
 * При первом - создается файл для записи логов
 * При последующих - заполнение файла
 * 
 * 
 * При правильной организации тестов, каждый тест работает в 
 * идентичном окружении на каждом запуске. Для этого, можно 
 * удалять файл после каждого теста.
 */


test('log', async () => {
  const log = makeLogger('development.log');

  await log('first message');
  const data1 = await fs.readFile('development.log', 'utf-8');
  expect(data1).toEqual('first message');

  await log('second message');
  const data2 = await fs.readFile('development.log', 'utf-8');
  expect(data2).toEqual(/*...*/);
});

// После выполнения каждого теста файл удаляется
afterEach(async () => {
  await fs.unlink('development.log');
});

/**
 * В большинстве случаев такое решение работает нормально, но не во всех
 * Есть только один надежный способ делать очистку - делать ее до теста!!!
 * Здесь фигурирует одна сложность, то что при первом запуске тестов - файла нет
 * Это значит, что прямой вызов unlink - приведет к ошибке
 */

import _ from 'lodash';

beforeEach(async () => {
  await fs.unlink('development.log')
    .catch(_.noop);
});

test('log', async () => {
  const log = makeLogger('development.log');

  await log('first message');
  const data1 = await fs.readFile('development.log', 'utf-8');
  expect(data1).toEqual(/* ... */);

  await log('second message');
  const data2 = await fs.readFile('development.log', 'utf-8');
  expect(data2).toEqual(/* ... */);
});

/**
 * Другой вопрос при записи файлов, куда их потом сохранять
 * Нужно избегать записи файлов прямо внутри проекта. 
 * 
 * Можно сохранять файлы во временную директорию из модуля Node:OS
 * os.tmpdir(), чтобы избежать ошибки в окружении или ВФС
 * 
 * ВИРТУАЛЬНАЯ ФАЙЛОВАЯ СИСТЕМА - Просмотреть такое !!!!
 */


/**
 * Далеко не всегда результат работы с функцией связан с побочным эффектом
 * Иногда побочный эффект - это просто какое то дополнительное действие, которое
 * мешает протестировать основную логику
 */

const params = {
  email: 'lala@example.ru',
  password: 'qwerty',
};

registerUser(params); // Функция зарегистрировала пользователя

// Главное, что нас волнует, это правильная регистрация пользователя
/**
 * Типичная регистрация сводится к добавлению пользоватебя в БД - 
 * запись о новом пользователе. Именно это и нужно проверять - 
 * наличие записи о новом пользователе с правильно заполненными данными
 */

/**
 * Как правило, БД в тестах не прячут. Идемпотентность в ней достигается 
 * за счет транзакций. Перед тестом она начинается, а после откатывается
 * Благодаря этому каждый тест запускается в идентичом окружении. 
 */

const ctx = connecttoDB();

// Перед каждым тестом начинается транзакция
beforeEach(() => ctx.beginTransaction());

test('register user', () => {
  // Идет добавление в БД
  const id = registerUser({ name: 'Mike' });
  const user = User.find(id);
  expect(user).toHaveProperty('name', 'Mike');
})

afterEach(() => ctx.rollbackTransaction()); // После идет откат в исходное состояние


/**
 * Регистрацию пользователя в БД можно проверить, а вот отправку
 * приветственного письма - это сложнее
 */

/**
 * Допустим есть функция, которая регистрирует пользователя
 */

const registerUser = (params) => {
  const user = new User (params); // Создается новый пользователь с данным
  // Если все в порядке, то отправляется письмо и возвращается результат операции
  if(user.save()) {
    sendEmail('registration', { user });
    return true;
  }
  return false;
};

/**
 * Первый подход, который мы можем использовать - это отключить 
 * отправку письма в тестовой среде
 */

if (process.env.NODE_ENV !== 'test') {
  sendEmail('registration', { user });
}

/**
 * Такой подход считается плохой практикой, так как код
 * знает, где он выполняется.
 * 
 * Следующий способ - поддержка режима тестирования внутри самой библиотеки.
 * На этапе инициализации тестов можно сделать так
 */

// setup.js в Jest - делается в конфиге Jest
import sendEmail from './emailSender.js';
sendEmail.test = true;

/**
 * Теперь в любом другом месте, где импортируется и используется 
 * sendEmail(), реальная отправка происходить не будет
 * 
 * Это довольно таки популярное решение, но бывает так, что 
 * используемые библиотеки не поддерживают режим тестирования
 * Он основан на инверсии зависимостей. Программу можно изменить так, чтобы 
 * она вызывала функцию sendEmail как параметр
 */

// Пример

const registerUser = (params, send = sendEmail) => {
  const user = new User(params);
  if(user.save()) {
    send('registration', { user });
    return true;
  }
  return false;
};

// Тест

const fakeSendEmail = (...args) => {
  /* Письмо можно вывести в терминал */

};

test('registerUser', () => {
  const id = registerUser({ name: 'Mike' }, fakeSendEmail);
  const user = User.find(id);
  expect(user).toHaveProperty('name', 'Mike');
});



// Протестировать функцию, которая считает количество всех файлов в директории
/**
 * Нужно реализовать stub (фейковый объект) для того, чтобы имитировать запрос
 * к серверу 
 */






































