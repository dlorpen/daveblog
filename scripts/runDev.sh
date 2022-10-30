#! /usr/bin/env bash

yes | docker container prune
docker run -p 8080:80 --name daveblog daveoblog:latest
