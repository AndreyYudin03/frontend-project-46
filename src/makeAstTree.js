import _ from 'lodash';

const findDifferences = (file1, file2) => {
  const sortedKeys = _.sortBy(_.union(_.keys(file1), _.keys(file2)));

  return sortedKeys.map((key) => {
    const [value1, value2] = [file1[key], file2[key]];

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
    if (_.isUndefined(value1)) {
      return { key, value: value2, status: 'added' };
    }
    if (_.isUndefined(value2)) {
      return { key, value: value1, status: 'deleted' };
    }
    // changed
    const changedKey = {
      key,
      value: { before: value1, after: value2 },
      status: 'changed',
    };
    return changedKey;
  });
};

export default findDifferences;
