#! /usr/bin/env bash

rm -rf output/
mkdir -p output output/posts

cp -r ./content/images ./output/
cp -r ./layout/public/* ./output/

source ~/.nvm/nvm.sh
nvm use $(cat ./generator/.nvmrc)
node generator/index.js

docker build -f docker/Dockerfile -t daveoblog:latest .
