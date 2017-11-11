#!/usr/bin/env bash
#
# use this PROD script to prepare the release of the bundle
#
export VERSION="1.1.0"
set -e
set -o pipefail

npm run build
mvn clean install
git add .
git commit -m"release $VERSION.2"
git push heroku master
git push origin master
