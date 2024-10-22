#!/bin/bash
PROTO_FILES=$(find src/ -name "*.proto")

if [ -z "$PROTO_FILES" ]; then
  echo "No .proto files found in src/"
  exit 1
fi

protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto \
 --ts_proto_out=dist \
 --ts_proto_opt=nestJs=true \
 -I=src/ "$PROTO_FILES"

 node ./generate-index.js