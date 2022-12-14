/**
 * @description fills collection from index to index by given value
 * @param {Object []} collection collection to be filled
 * @param {any} filler given value
 * @param {Number} fromIndex start index
 * @param {Number} toIndex end index
 * @returns {Object []} filled collection
 */
export default (collection, filler, fromIndex = 0, toIndex = collection.length) => {
  const newCollection = [...collection];
  // lasy calculations
  if (newCollection.length === 0 || (fromIndex < 0 && toIndex < 0)) {
    return newCollection;
  }
  for (let i = fromIndex; i < toIndex; i += 1) {
    newCollection[i] = filler;
  }
  return newCollection;
};
