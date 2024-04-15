import _ from 'lodash';

const stringify = (nodeValue, externalDepth, internalDepth = 1) => {
  const pairToString = (key, value, spacer) => `${spacer}${key}: ${stringify(value, spacer.length / 4)}`;

  const externalSpacer = '    '.repeat(externalDepth);
  const internalSpacer = `${externalSpacer}${'    '.repeat(internalDepth)}`;

  if (typeof nodeValue === 'string') {
    return nodeValue;
  }

  if (_.isObject(nodeValue)) {
    const keys = Object.keys(nodeValue);
    const pairs = keys.map((key) => pairToString(key, nodeValue[key], internalSpacer));
    return `{\n${pairs.join('\n')}\n${externalSpacer}}`;
  }

  return `${nodeValue}`;
};

const stylishFormatter = (astTree, depth = 1) => {
  const nestingLevel = depth;
  const indent = '    '.repeat(depth);
  const format = astTree
    .map((node) => {
      switch (node.status) {
        case 'nested':
          return `${indent}${node.key}: {\n${stylishFormatter(
            node.value,
            depth + 1,
          )}\n${indent}}`;
        case 'changed':
          return `${indent.slice(0, indent.length - 2)}-${indent.slice(-1)}${
            node.key
          }: ${stringify(node.value.before, nestingLevel)}\n${indent.slice(
            0,
            indent.length - 2,
          )}+${indent.slice(-1)}${node.key}: ${stringify(
            node.value.after,
            nestingLevel,
          )}`;
        case 'deleted':
          return `${indent.slice(0, indent.length - 2)}-${indent.slice(-1)}${
            node.key
          }: ${stringify(node.value, nestingLevel)}`;
        case 'added':
          return `${indent.slice(0, indent.length - 2)}+${indent.slice(-1)}${
            node.key
          }: ${stringify(node.value, nestingLevel)}`;
        case 'unchanged':
          return `${indent}${node.key}: ${stringify(node.value, nestingLevel)}`;
        default:
          throw new Error(`Unknown node status: ${node.status}`);
      }
    })
    .join('\n');
  return depth === 1 ? `{\n${format}\n}` : format;
};

export default stylishFormatter;
