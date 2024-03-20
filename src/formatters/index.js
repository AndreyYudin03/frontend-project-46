import stylishFormat from './stylish.js';
import plainFormat from './plain.js';
import jsonFormat from './json.js';

const formatter = (astTree, format) => {
  switch (format) {
    case 'stylish':
      return stylishFormat(astTree);
    case 'plain':
      return plainFormat(astTree);
    case 'json':
      return jsonFormat(astTree);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default formatter;
