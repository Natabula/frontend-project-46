import path from 'path';
import { readFileSync } from 'fs';
import { cwd } from 'process';
import compareDeep from './compareDeep.js'; 
import parse from './parsers.js'
import formatter from './formatters/index.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => { 
    return readFileSync(getFullPath(filepath), 'utf-8');
}
const getExtension = (filepath) => {
    return path.extname(filepath).slice(1);
}

const gendiff = (filepath1, filepath2, format = 'stylish') => {
    const obj1 = parse(readFile(filepath1), getExtension(filepath1));
    const obj2 = parse(readFile(filepath2), getExtension(filepath2));

    const diff = compareDeep(obj1, obj2);

    return formatter(diff, format);
};

export default gendiff;
