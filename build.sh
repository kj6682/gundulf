#!/usr/bin/env bash
set -e
set -o pipefail

npm run build
mvn clean install
