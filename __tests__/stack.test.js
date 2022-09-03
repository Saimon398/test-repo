import fill from '../src/stack.js';

test('fill main flow', () => {
  // 1: общая работоспособность
  expect(fill([1, 2, 3, 4, 5], '*', 0, 3)).toEqual(expect.arrayContaining(['*', '*', '*', 4, 5]));

  // 2: отрицательные индексы - не работает с ними
  expect(fill([1, 2, 3, 4, 5], '*', -1, -2)).toEqual(expect.arrayContaining([1, 2, 3, 4, 5]));

  // 3: индексы по умолчанию
  expect(fill([1, 2, 3, 4, 5], '*')).toEqual(expect.arrayContaining(['*', '*', '*', '*', '*']));

  // 4: пустая коллекция
  expect(fill([], '*', 0, 4)).toHaveLength(0);
});
