#! /usr/bin/env bash

docker save daveoblog:latest | bzip2 | pv | ssh orpen-vpn docker load
ssh orpen-vpn docker-compose -f /home/davido/daveblog/docker-compose.yml up -d