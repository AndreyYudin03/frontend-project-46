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
      if (node.status === 'nested') {
        return `${spacer}${node.key}: {\n${stylishFormatter(
          node.value,
          depth + 1,
        )}\n${spacer}}`;
      }
      if (node.status === 'changed') {
        return `${spacer.slice(0, spacer.length - 2)}-${spacer.slice(-1)}${
          node.key
        }: ${stringify(node.value.before, nestingLevel)}\n${spacer.slice(
          0,
          spacer.length - 2,
        )}+${spacer.slice(-1)}${node.key}: ${node.value.after}`;
      }
      if (node.status === 'deleted') {
        return `${spacer.slice(0, spacer.length - 2)}-${spacer.slice(-1)}${
          node.key
        }: ${stringify(node.value, nestingLevel)}`;
      }
      if (node.status === 'added') {
        return `${spacer.slice(0, spacer.length - 2)}+${spacer.slice(-1)}${
          node.key
        }: ${stringify(node.value, nestingLevel)}`;
      }
      // unchanged
      return `${spacer}${node.key}: ${stringify(node.value, nestingLevel)}`;
    })
    .join('\n');
  return depth === 1 ? `{\n${format}\n}` : format;
};

export default stylishFormatter;
