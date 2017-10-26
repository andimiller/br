#!/bin/bash

echo "installing babel-cli"
npm install --save-dev babel-cli
npm install --save-dev babel-plugin-transform-async-functions
npm install --save-dev babel-plugin-syntax-async-functions
echo "building js"
./node_modules/.bin/babel src --out-dir dst --plugins syntax-async-functions transform-async-functions
echo "bumping version number"
sed -i -r 's/(.*)\.([0-9]+)$/echo "\1.$((\2+1))"/ge' VERSION
version=`cat VERSION` 
echo "committing and pushing it"
git add VERSION
git commit -m "bump to ${version} for release"
git push
echo "building docker image"
docker build . -t andimiller/br:${version}
echo "pushing docker image"
docker push andimiller/br:${version}
