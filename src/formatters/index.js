import stylishFormat from './stylish.js';
import plainFormat from './plain.js';

const formatter = (astTree, format) => {
  switch (format) {
    case 'stylish':
      return stylishFormat(astTree);
    case 'plain':
      return plainFormat(astTree);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default formatter;
