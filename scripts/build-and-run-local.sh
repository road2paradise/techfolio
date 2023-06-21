#!/bin/bash

# Killing all running docker images
echo "Killing all running docker containers"
docker kill $(docker ps -q)

# Build Docker image
echo "Building local docker image."
cd ../_bff
docker build -t bff-local .

#!/bin/bash

# Run Docker container
echo "Running docker using local docker image"
docker run -p 7232:80 -it --env-file=../development.env bff-local