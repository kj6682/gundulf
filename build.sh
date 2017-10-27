#!/usr/bin/env bash
#
# use this PROD script to prepare the release of the bundle
#
set -e
set -o pipefail

npm run build
mvn clean install
