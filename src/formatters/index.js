import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (node, format) => {
    switch(format) {
        case 'stylish': 
          return stylish(node);
        case 'plain':
            return plain(node);
        case 'json':
            return JSON.stringify(node);
        default:
            throw new Error(`Unknown format: '${format}'`);
    }
};

export default formatter;