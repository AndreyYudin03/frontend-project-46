import _ from 'lodash';

const findDifferences = (file1, file2) => {
  const allKeys = _.sortBy(Object.keys({ ...file1, ...file2 }));

  return allKeys.map((key) => {
    const value1 = file1[key];
    const value2 = file2[key];

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

    if (!(key in file1)) {
      return { key, value: value2, status: 'added' };
    }

    if (!(key in file2)) {
      return { key, value: value1, status: 'deleted' };
    }

    return {
      key,
      value: { before: value1, after: value2 },
      status: 'changed',
    };
  });
};

export default findDifferences;
