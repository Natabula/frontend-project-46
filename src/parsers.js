import YAML from 'js-yaml';

const parse = (data, format) => {
    switch (format) {
        case 'json':
          return JSON.parse(data);

        case 'yaml':
        case 'yml':
          return YAML.load(data);

        default:
            throw new Error(`Unknown format: ${format}`);
    }
};

export default parse;