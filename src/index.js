import path from 'path';
import { readFileSync } from 'fs';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = readFileSync(getFullPath(filepath), 'utf-8');
const getExtension = path.extname(filepath).sliсe(1);

const gendiff = (filepath1, filepath2) => {
    const data1 = parse(readFile(filepath1), getExtension(filepath1));
    const data2 = parse(readFile(filepath2), getExtension(filepath2));
};

export default gendiff;
