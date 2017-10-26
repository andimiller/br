build:
	npm install --save-dev babel-cli
	./node_modules/.bin/babel src --out-dir dst
	sed -i -r 's/(.*)\.([0-9]+)$/echo "\1.$((\2+1))"/ge' VERSION
	versionfile := VERSION
	version := $(shell cat ${versionfile})
	docker build . -tag andimiller/br:${version}

