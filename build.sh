#! /bin/bash

# build the source of landing page
cd ./frontend
npm install
npm run-script build

# publish landing page in docusaurus static folder
cp -R ./build/img ./build/static/js ./build/static/css ../website/static
cp ./build/index.html ../website/static

# prepoces generated index.html removing 'static/' from paths to follow docusaurus conventions
cd ../website/static
sed -i '' 's/\/static\//\//g' index.html
