import _ from 'lodash';

const stringify = (obj, externalDepth, internalDepth = 1) => {
  const externalSpacer = '    '.repeat(externalDepth);
  const internalSpacer = `${externalSpacer}${'    '.repeat(internalDepth)}`;
  if (typeof obj === 'string') {
    return obj;
  }
  if (_.isObject(obj)) {
    const keys = Object.keys(obj);
    const pairs = keys.map(
      (key) => `${internalSpacer}${key}: ${stringify(obj[key], externalDepth + 1)}`,
    );
    return `{\n${pairs.join('\n')}\n${externalSpacer}}`;
  }
  return `${obj}`;
};

const stylishFormatter = (astTree, depth = 1) => {
  const nestingLevel = depth;
  const spacer = '    '.repeat(depth);
  const format = astTree
    .map((node) => {
      switch (node.status) {
        case 'nested':
          return `${spacer}${node.key}: {\n${stylishFormatter(
            node.value,
            depth + 1,
          )}\n${spacer}}`;
        case 'changed':
          return `${spacer.slice(0, spacer.length - 2)}-${spacer.slice(-1)}${
            node.key
          }: ${stringify(node.value.before, nestingLevel)}\n${spacer.slice(
            0,
            spacer.length - 2,
          )}+${spacer.slice(-1)}${node.key}: ${node.value.after}`;
        case 'deleted':
          return `${spacer.slice(0, spacer.length - 2)}-${spacer.slice(-1)}${
            node.key
          }: ${stringify(node.value, nestingLevel)}`;
        case 'added':
          return `${spacer.slice(0, spacer.length - 2)}+${spacer.slice(-1)}${
            node.key
          }: ${stringify(node.value, nestingLevel)}`;
        case 'unchanged':
          return `${spacer}${node.key}: ${stringify(node.value, nestingLevel)}`;
        default:
          throw new Error(`Unknown node status: ${node.status}`);
      }
    })
    .join('\n');
  return depth === 1 ? `{\n${format}\n}` : format;
};

export default stylishFormatter;
