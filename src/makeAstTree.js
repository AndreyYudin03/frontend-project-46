import _ from 'lodash';

const findDifferences = (file1, file2) => {
  const allKeys = _.union(_.keys(file1), _.keys(file2));
  const sortedKeys = _.sortBy(allKeys);

  return sortedKeys.map((key) => {
    const value1 = file1.hasOwnProperty(key) ? file1[key] : undefined;
    const value2 = file2.hasOwnProperty(key) ? file2[key] : undefined;

    if (_.isEqual(value1, value2)) {
      return { key, value: value1, status: 'unchanged' };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
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
