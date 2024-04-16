import yaml from 'js-yaml';

const getData = (data, fileExtension) => {
  switch (fileExtension) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown file extension: ${fileExtension}`);
  }
};
export default getData;
