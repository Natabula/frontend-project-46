install: 
	npm ci

publish:
	npm publish --dry-run

help:
	node bin\gendiff.js -h