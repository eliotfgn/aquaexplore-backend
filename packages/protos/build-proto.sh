#!/bin/bash

protoc --proto_path=src src/*.proto --plugin=./node_modules/.bin/protoc-gen-ts_proto \
 --ts_proto_out=dist \
 --ts_proto_opt=nestJs=true

node ./generate-index.js