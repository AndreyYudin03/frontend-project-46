import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const plainFormatter = (astTree, key = []) => {
  const format = astTree
    .map((node) => {
      const keys = [...key, node.key];
      const keyFullPath = keys.join('.');
      switch (node.status) {
        case 'nested':
          return plainFormatter(node.value, keys);
        case 'changed':
          return `Property '${keyFullPath}' was updated. From ${stringify(
            node.value.before,
          )} to ${stringify(node.value.after)}`;
        case 'deleted':
          return `Property '${keyFullPath}' was removed`;
        case 'added':
          return `Property '${keyFullPath}' was added with value: ${stringify(
            node.value,
          )}`;
        case 'unchanged':
          return null;
        default:
          throw new Error(`Unknown node status: ${node.status}`);
      }
    })
    .filter(Boolean)
    .join('\n');
  return format;
};

export default plainFormatter;
