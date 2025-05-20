install: 
	npm ci

publish:
	npm publish --dry-run

help:
	node bin\gendiff.js -h
lint:
	npx eslint .

lint-fix:
	npx eslint --fix .
tests:
	npm test 
test-coverage:
	npm test -- --coverage