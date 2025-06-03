install: 
	npm ci

publish:
	npm publish --dry-run

help:
	node bin\gendiff.js -h
runStylish:
	gendiff --format stylish '.\__fixtures__\file1.json' '.\__fixtures__\file2.json'

runPlain:
	gendiff --format plain '.\__fixtures__\file1.json' '.\__fixtures__\file2.json'

runJson:
	gendiff --format json '.\__fixtures__\file1.json' '.\__fixtures__\file2.json'
lint:
	npx eslint .

lint-fix:
	npx eslint --fix .
tests:
	npm test 
test-coverage:
	npm test -- --coverage