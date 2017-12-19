#!/usr/bin/env bash
# this is a DEV script
#
# use this DEV script to fully build the bundle with dev config
export VERSION="1.1.0"
export PROXY_PRODUCTS="http://localhost:8080/api/products"
export PROXY_ITEMS="http://localhost:8080/api/items"
export PROXY_ORDERS="http://localhost:8080/api/orders"

export API_PRODUCTS="http://localhost:9000/api/products"
export API_ITEMS="http://localhost:9000/api/items"
export API_ORDERS="http://localhost:9100/api/orders"

set -e
set -o pipefail

npm run build-dev
#mvn clean install
#./java -Dserver.port=$PORT -Dspring.profiles.active=dev $JAVA_OPTS -jar target/gundulf-$VERSION.jar
mvn clean spring-boot:run -Dserver.port=$PORT -Drun.profiles=dev
