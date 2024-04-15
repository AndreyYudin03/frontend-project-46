import _ from 'lodash';

const findDifferences = (file1, file2) => {
  const sortedKeys = _.sortBy(Object.keys({ ...file1, ...file2 }));

  return sortedKeys.map((key) => {
    const value1 = Object.prototype.hasOwnProperty.call(file1, key)
      ? file1[key]
      : undefined;
    const value2 = Object.prototype.hasOwnProperty.call(file2, key)
      ? file2[key]
      : undefined;

    if (_.isEqual(value1, value2)) {
      return { key, value: value1, status: 'unchanged' };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        key,
        value: findDifferences(value1, value2),
        status: 'nested',
      };
    }
    if (typeof value1 === 'undefined') {
      return { key, value: value2, status: 'added' };
    }
    if (typeof value2 === 'undefined') {
      return { key, value: value1, status: 'deleted' };
    }
    const changedKey = {
      key,
      value: { before: value1, after: value2 },
      status: 'changed',
    };
    return changedKey;
  });
};

export default findDifferences;
