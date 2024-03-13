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

const plainFormatter = (astTree) => {
  const format = astTree
    .map((node, index) => {
      const keyFullPath = '';
      if (node.status === 'nested') {
        return plainFormatter(node.value);
      }
      if (node.status === 'changed') {
        return `Property '${astTree[index].key}' was updated. From ${stringify(
          node.value.before,
        )} to ${stringify(node.value.after)}`;
      }
      if (node.status === 'deleted') {
        return `Property '${astTree[index].key}' was removed`;
      }
      if (node.status === 'added') {
        return `Property '${
          astTree[index].key
        }' was added with value: ${stringify(node.value)}`;
      }
      // unchanged
      // return `${spacer}${node.key}: ${stringify(node.value, nestingLevel)}`;
    })
    .join('\n');
  return format;
};

export default plainFormatter;
