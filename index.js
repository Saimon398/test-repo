// // Информация о пользователе может быть представлена объектом со свойствами
import yup from 'yup';

// // Simple 
// const student = {
//   name: 'Alex',
//   birthday: '12.03.1996',
//   encryptedPassword: 'somepassword398',
//   socialNetworks: {
//     twitter: 'twitter.otadameskapizm.com',
//     facebook: 'facebook.com'
//   },
//   currentGroup: 'fullstack-development',
//   finishedCourses: ['functions', 'objects', 'oop'],

//   addFinishedCourse (finishedCourse) {
//     this.finishedCourses.push(finishedCourse);
//   }
// };

// // Первый подход работы - процедурное программирование
// const setPassword = (student, newPassword) => {
//   student.encryptedPassword = newPassword;
// };
// const addFinishedCourse = (student, finishedCourse) => {
//   student.finishedCourses.push(finishedCourse);
// };
// addFinishedCourse(student, 'arrays');
// setPassword(student, 'newpassword');

// // Добавлять методы
// student.addFinishedCourse('tests');

// /**
//  * Инкапсуляция - объединение функций и данных в рамках одной структуры,
//  * внутреннее состояние которой скрыто от внешнего мира.
//  * 
//  * Существует такое понятие, как контекст - this. Он работает по разному
//  * для обычных и стрелочных функций. Он может изменится у метода в JS.
//  * Если мы передаем в один метод ссылку на другой метод - позднее привязывание
//  * Function.ptototype.call(thisArg, [arg1, ...])
//  * 
//  * Контекст обычных функций завиист от места вызова, а стрелочных - от места их определения
//  */

// // Задание 3

// // Контекст
// const bind = (context, fn) => {
//   return (...args) => fn.apply(context, args);
// };


// /**
//  * Прототипы - это механизм, который оказывает влияние на то, как работают 
//  * объекты в JS. В языке с каждым объектом связан прототип - обычный объект, 
//  * который хранится в специальном служебном поле [[prototype]].
//  * 
//  * 
//  * Как работает вызов свойств?. Если в объекте свойство не было найдено, 
//  * то он ищет в прототипе, потом в прототипе прототипа и т д 
//  * 
//  * 
//  * В итоге - прототип - это объект, который находится в свойстве prototype
//  * Прототипы - низкоуровневый механизм. При использовании приходиться писать
//  * много однообразного кода, особенно для реализации цепочек. По этой причине
//  * внедрили класс 
//  */

// // Упаковка и Распаковка (Boxing)

// // КЛАССНАЯ ЗАДАЧА!!!
// // const magic = (...numbers) => { // Принимает на вход любое число аргументов
// //   const sum = numbers.reduce((acc, number) => acc += number, 0); // Суммирует эти аргументы
// //   const innerMagic = (...rest) => magic(sum, ...rest); // Функция, которая принимает любое число аргументов - и добавляет к ним сумму
// //   innerMagic.valueOf() = () => sum;
// //   return innerMagic;
// // };

// // Класс с валидаторами - Хранение конфигурации 
// // class PasswordValidator {
// //   constructor(options = {}) {
// //     this.options = {
// //       minLength: 8,
// //       containNumbers: true,
// //       ...options,
// //     }
// //   }
// //   validate (password) {
// //     const errors = {};
// //     if(password.length < this.options.minLength) {
// //       errors.minLength = 'too small';
// //     }
// //     if(this.options.containNumbers) { // Требование выключено или включено
// //       if(!hasNumber(password)) {
// //         errors.containNumbers = 'should contain at least one number';
// //       }
// //     }
// //     return errors;
// //   }
// // };


// // Иногда нужно временно установить опции, которые отличаются от тех, что были 
// // переданы в конструктор. Есть 3 возможных решения 

// // Первое - Создание нового объекта
// // Такой способ ведет к тому, что придется дублировать общие опции, а тестирование
// // станет затруднительным


// // Вариант 2 - Сеттер. Ведет к проблемам

// // А здесь мы можем забыть его включить
// // Такой код, в котором сначала что-то меняется, а потом еще раз говорит о проблеме
// // с архитектурой

// // Вариант 3 - Передача дополнительного параметра на время вызова



// // class Truncate {
// //   static defaultOptions = {
// //     separator: '...',
// //     length: 200,
// //   };
// //   constructor (options = {}) {
// //     this.options = { ...this.constructor.defaultOptions, ...options };
// //   }

// //   truncate (text, userOptions = {}) {
// //     const { length, separator } = { ...this.options, ...userOptions };
// //     return (text.length <= length) ? text : `${text.substring(0, length)}${separator}`;
// //   }

// // };


// // Объекты-сущности

// /**
//  * Время жизни - подобные объекты создаются не ради одноразового испольхования,
//  * а живут какое то время. Например, пользователи создаются при регистрации,
//  * а потом живут в системе до удаления. 
//  * 
//  * 
//  * Идентификация. При работе с сущностями вводят искусственные идентификаторы, 
//  * которые формирует база данных
//  */

// class Url {
//   constructor(url) {
//     this.url = new URL(url);
//   }

//   getScheme () {
//     const protocolWithPoint = this.url.protocol;
//     return protocolWithPoint.substring(0, protocolWithPoint.length - 1);
//   }

//   getHostName () {
//     return this.url.hostname;
//   }

//   getQueryParams () {
//     return this.
//   }
// }
// const url1 = new Url('https://yandex.ru');

// console.log(url1.getHostName());


// Нужно написать класс-обертку, который является API для URL
export default class Url {
  constructor(url) {
    this.url = new URL(url);
    this.url.scheme = this.url.protocol.slice(0, -1);
    this.url.queryParams = Object.fromEntries(this.url.searchParams);
  }

  getScheme() {
    return this.url.scheme;
  }

  getHostName() {
    return this.url.hostname;
  }

  getQueryParams() {
    return this.url.queryParams;
  }

  getQueryParam(key, defaultValue = null) {
    return this.url.searchParams.get(key) ?? defaultValue;
  }

  toString() {
    return this.url.toString();
  }

  equals(url) {
    return (this.toString() === url.toString());
  }
}


// Текущий интерфейс
// Существует ровно 2 способа создать такой интерфейс на техническом 
// уровне

// Первый способ - на вохврате this 

// class Collection {
//   constructor (collection) {
//     this.collection = collection;
//   }

//   map(callback) {
//     this.collection = this.collection.map(callback);
//     return this;
//   }

//   filter(callback) {
//     this.collection = this.collection.filter(callback);
//     return this;
//   }

//   all() {
//     return this.collection;
//   }
// };


// Здесь мы поменяли коллекцию - это серьезный недостаток
// cars
//   .filter((car) => car.year > 2013)
//   .map((car) => car.model);


// На практике используется другой подход

// class Collection {
//   constructor (collection) {
//     this.collection = collection;
//   }
//   map(callback) {
//     const newColl = this.collection.map(callback);
//     return new Collection(newColl);
//   }

//   filter(callback) {
//     const newColl = this.collection.filter(callback);

//     return new Collection(newColl);
//   }

//   all() {
//     return this.collection;
//   }
// };

const countries = [
  { name: 'Miami', country: 'usa' },
  { name: 'samarA', country: '  ruSsiA' },
  { name: 'Moscow ', country: ' Russia' },
];

const normalize = (citiesByCountries) => {
  return citiesByCountries
  .map(({ name, country }) => {
    return { name: name.toLowerCase(), country: country.toLowerCase() };
  })
  .map(({ name, country }) => {
    return { name: name.trim(), country: country.trim() };
  })
  .map(({name, country}) => [country, name])
  .sort()
  .reduce((acc, [country, city]) => {
    const citiesAcc = acc[country] ?? []; // Если его нет, то создаем свойство
    const cities = citiesAcc.concat(city); // После добавления (или в старый) добавлям город
    const uniqueCities = new Set(cities); // Удаляем повторения
    return { ...acc, [country]: [...uniqueCities]};
  }, {});
};

// Конфигурация с параметрами, Текущий интерфейс, Обертка, Сборщик, Прокси

// Сборщики - библиотка yup для проверки валидности данных
// Задание на проверку валидности книг в библиотеке
// Создаем схему проверки книг
// const schema = yup.object().shape({
//   name: yup.string().required(), // Имя должно обязательно присутствовать 
//   author: yup.string().required(), // Автор-строка 
//   pagesCount: yup.number().positive().integer(), // Число страниц
//   link: yup.string().min(1).url(),
//   genre: yup.string().oneOf(genres),
// });

// const getInvalidBooks = (books) => books.filter((book) => !schema.isValidSync(book));

// const proxy = new Proxy(target, handler); // target - объект, для которого нужно сделать прокси-объект
// handler - объект с обработчиками

// Объект с обработчиками

// class Course {
//   constructor(name) {
//     this._name = name;
//   }
 
//   getName() {
//     return this._name;
//   }
// };

// const validateProperty = (target, name) => {
//   if(!(name in target)) {
//     throw new Error(`${name} does not exist`);
//   }
//   if (name.startsWith('_')) {
//     throw new Error(`${name} is protected`);
//   }
// };

// const protect = (course) => {
//   const handlers = {
//     get: (target, name) => {
//       // Здесь проверяется на валидность
//       validateProperty(target, name);
//       const property = target[name];

//       return typeof property === 'function' ? property.bind(course) : property;
//     },

//     set: (target, name, value) => {
//       validateProperty(target, name);
//       target[name] = value;

//       return true;
//     }
//   }
// }




