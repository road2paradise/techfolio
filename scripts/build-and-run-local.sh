#!/bin/bash

# Killing all running docker images
echo "Killing all running docker containers"
docker kill $(docker ps -q)

# Build Docker image
echo "Building local docker image."
cd ../MyCoolWebAPI
docker build -t mycoolwebapi-local .

#!/bin/bash

# Run Docker container
echo "Running docker using local docker image"
docker run -p 3001:80 -it --env-file=../development.env mycoolwebapi-local