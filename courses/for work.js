// /**
//  * @description Return difference between two objects
//  * @param {Object} first First object
//  * @param {Object} second Second object
//  * @param {String} replacer Fill in the indent between left edge and line
//  * @param {Number} space Indent size
//  * @returns
//  */
// const gendiff2 = (first, second, replacer = ' ', space = 1) => {
//   const unionKeys = Object.keys({ ...first, ...second })
//     .sort();
//   const lines = unionKeys
//     .map((key) => {
//       if (!Object.hasOwn(first, key)) {
//         return `${replacer.repeat(space)}+ ${key}: ${second[key]}`;
//       }
//       if (!Object.hasOwn(second, key)) {
//         return `${replacer.repeat(space)}- ${key}: ${first[key]}`;
//       }
//       if (first[key] === second[key]) {
//         return `${replacer.repeat(space * 3)}${key}: ${first[key]}`;
//       }

//       return `${replacer.repeat(space)}- ${key}: ${first[key]}\n + ${key}: ${second[key]}`;
//     });
//   return [
//     '{',
//     ...lines,
//     '}',
//   ].join('\n');
// };
