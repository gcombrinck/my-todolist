#!/bin/sh

docker build -t gcombrinck/node-web-app . && docker run -p 49160:8080 -d gcombrinck/node-web-app