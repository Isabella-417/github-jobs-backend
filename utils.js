const filterParams = (object, keyToFilter) => {
  return Object.keys(object)
    .filter((key) => key.includes(keyToFilter))
    .reduce(
      (newObj, currKey) => ((newObj[currKey] = typeof object[currKey] === 'string'? object[currKey].toUpperCase() : object[currKey]) , newObj),
      {}
    );
};

module.exports = {
  filterParams,
};
