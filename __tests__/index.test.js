import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { expect, test } from '@jest/globals';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const expectedDiff = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

describe('gendiff', () => {
  test('should correctly compare two JSON files', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');

    const result = gendiff(filepath1, filepath2);
    expect(result).toEqual(expectedDiff);
  });

  test('should correctly compare two JSON files', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');

    const result = gendiff(filepath1, filepath2);
    expect(result).toEqual(expectedDiff);
  })
});