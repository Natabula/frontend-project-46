import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';
import parse from './parsers.js'

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => { 
    return readFileSync(getFullPath(filepath), 'utf-8');
}
const getExtension = (filepath) => {
    return path.extname(filepath).slice(1);
}

const gendiff = (filepath1, filepath2) => {
    const obj1 = parse(readFile(filepath1), getExtension(filepath1));
    const obj2 = parse(readFile(filepath2), getExtension(filepath2));

    const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])].sort();

    const diff = keys.map((key) => {
        if(!Object.hasOwn(obj2, key)) {
            return `  - ${key}: ${obj1[key]}`;
        }
        if (!Object.hasOwn(obj1, key)) {
            return `  + ${key}: ${obj2[key]}`;
        }
        if (obj1[key] !== obj2[key]) {
            return `  - ${key}: ${obj1[key]}\n` + `  + ${key}: ${obj2[key]}`;
        
        }
        return `    ${key}: ${obj1[key]}`;
    })
    return `{\n${diff.join('\n')}\n}`;
};

export default gendiff;
