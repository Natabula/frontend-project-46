import { fileURLToPath } from 'url'
import { join, dirname } from 'path'
import { expect, test } from '@jest/globals'
import gendiff from '../index.js'
import { readFileSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename => join(__dirname, '..', '__fixtures__', filename)
const readFile = filename => readFileSync(getFixturePath(filename), 'utf-8')

const testData = [
  ['file1.json', 'file2.json', 'stylish', 'expectedResultStylish.txt'],
  ['file1.yaml', 'file2.yaml', 'stylish', 'expectedResultStylish.txt'],
  ['file1.yml', 'file2.yml', 'plain', 'expectedResultPlain.txt'],
  ['file1.json', 'file2.yaml', 'plain', 'expectedResultPlain.txt'],
  ['file1.json', 'file2.yml', 'json', 'expectedResultJson.txt'],
  ['file1.yaml', 'file2.yml', 'json', 'expectedResultJson.txt'],
]

describe.each(testData)('Comparison check:', (fileName1, fileName2, format, expectedResult) => {
  test(`correct diff for ${fileName1} === ${fileName2} in ${format}`, () => {
    const file1 = getFixturePath(fileName1)
    const file2 = getFixturePath(fileName2)

    const received = gendiff(file1, file2, format)
    const expected = readFile(expectedResult)

    expect(received).toEqual(expected)
  })
})

test('Comparison check default format', () => {
  const file1 = getFixturePath('file1.json')
  const file2 = getFixturePath('file2.json')

  const received = gendiff(file1, file2)
  const expected = readFile('expectedResultStylish.txt')

  expect(received).toEqual(expected)
})
