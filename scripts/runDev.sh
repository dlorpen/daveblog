#! /usr/bin/env bash

yes | docker container prune
docker image ls | grep none | awk '{print $3}' | xargs docker image rm

docker run -p 8080:80 --name daveblog daveoblog:latest
