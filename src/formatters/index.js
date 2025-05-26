import stylish from './stylish.js';

const formatter = (node, format) => {
    switch(format) {
        case 'stylish': 
          return stylish(node);
    }
};

export default formatter;