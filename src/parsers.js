import yaml from 'js-yaml';

const getData = (data, fileExtension) => {
  if (fileExtension === '.json') {
    return JSON.parse(data);
  }
  if (fileExtension === '.yaml' || fileExtension === '.yml') {
    return yaml.load(data);
  }
  throw new Error('unknown file extension');
};

export default getData;
