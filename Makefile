lint:
	npx eslint . # Проверяет код на соотвествие стандарту Airbnb
install:
	npm ci
test: 
	NODE_OPTIONS=--experimental-vm-modules npx jest .
test-coverage:
	npm run coverage
