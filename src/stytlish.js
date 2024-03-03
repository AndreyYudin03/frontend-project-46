import _ from 'lodash';

const stringify = (object) =>
  `${JSON.stringify(object, null, 4).replace(/["|,]/g, '')}`;

const formatter = (astTree, depth = 1) => {
  const spacer = '    '.repeat(depth);
  const format = astTree
    .map((node) => {
      if (_.isArray(node.value)) {
        return `${spacer}${node.key}: \n${formatter(node.value, depth + 1)}`;
      }
      if (!node.hasOwnProperty('status')) {
        return `${spacer}${node.key}: ${stringify(node.value)}`;
      }
      if (node.status === 'deleted') {
        return `${spacer}- ${node.key}: ${stringify(node.value)}`;
      }
      if (node.status === 'added') {
        return `${spacer}+ ${node.key}: ${stringify(node.value)}`;
      }
      // unchanged
      return `  ${spacer}${node.key}: ${stringify(node.value)}`;
    })
    .join('\n');
  return `{\n${format}\n}`;
};

export default formatter;
