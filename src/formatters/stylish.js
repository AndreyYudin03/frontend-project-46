import _ from 'lodash';

const spacesCount = 4;
const offsetLeft = 2;

const indent = (depth) => ' '.repeat(depth * spacesCount - offsetLeft);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const keys = Object.keys(value);
  const output = keys.map(
    (key) => `${indent(depth + 1)}  ${key}: ${stringify(value[key], depth + 1)}`
  );
  return `{\n${output.join('\n')}\n  ${indent(depth)}}`;
};
const iter = (tree, depth) =>
  tree.map((node) => {
    const createString = (value, sign) =>
      `${indent(depth)}${sign} ${node.key}: ${stringify(value, depth)}\n`;
    switch (node.status) {
      case 'added':
        return createString(node.value, '+');
      case 'deleted':
        return createString(node.value, '-');
      case 'unchanged':
        return createString(node.value, ' ');
      case 'changed':
        return `${createString(node.value.before, '-')}${createString(
          node.value.after,
          '+'
        )}`;
      case 'nested':
        return `${indent(depth)}  ${node.key}: {\n${iter(
          node.value,
          depth + 1
        ).join('')}${indent(depth)}  }\n`;
      default:
        throw new Error(`This status does not exist: ${node.status}`);
    }
  });

const getFormatStylish = (tree) => `{\n${iter(tree, 1).join('')}}`;

export default getFormatStylish;
