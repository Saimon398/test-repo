import pageLoader from '../asynchronic.js';
import os from 'os';
import path from 'path';
import fs from 'fs/promises';
import nock from 'nock';
import { fileURLToPath } from 'url';
import { test, beforeEach, expect } from '@jest/globals';


// Отключаем возможность всех сетевых запросов 
nock.disableNetConnect();

// Создаем данные для тестирования
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

// Создаем глобальные переменные
const url = 'https://ru.hexlet.io/courses';
let tmpDirname;
let expected;

beforeEach(async () => {
  // Перед каждым тестом будет создаваться директория, в которой будет хранится страница
  tmpDirname = await fs.mkdtemp(path.join(os.tmpdir(), 'page-loader-'));
  // Считываем данные из фикстуры
  expected = await fs.readFile(getFixturePath('expected.html'), 'utf-8');
});

test('page loader', async () => {
  nock('https://ru.hexlet.io')
    .get('/courses')
    .reply(200, expected);

  await pageLoader(url);
  const [actual] = await fs.readdir(tmpDirname, 'utf-8');
  const received = await fs.readFile(path.resolve(tmpDirname, actual), 'utf-8');
  expect(received).toEqual(expected);
});



