const filterParams = (object, keyToFilter) => {
  return Object.keys(object)
    .filter((key) => key.includes(keyToFilter))
    .reduce(
      (newObj, currKey) => ((newObj[currKey] = object[currKey].toUpperCase()), newObj),
      {}
    );
};

module.exports = {
  filterParams,
};
