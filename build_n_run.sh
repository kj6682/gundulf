#!/usr/bin/env bash
# this is a DEV script
#
# use this DEV script to fully build the bundle with dev config

set -e
set -o pipefail

npm run build-dev
mvn clean install
java -Dserver.port=$PORT -Dspring.profiles.active=dev $JAVA_OPTS -jar target/gundulf-1.0.0.jar
