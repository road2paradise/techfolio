#!/bin/bash

# Run image stored in AWS ECR

# First kill all running docker containers.
echo "Killing all locally running docker containers"

docker kill $(docker ps -q)
# First pull image(s)
echo "Authenticating Docker to ECR repository"
./docker-login.sh

echo "Pulling latest image from ECR"
docker pull 056331603841.dkr.ecr.ap-southeast-2.amazonaws.com/mycoolwebapi:latest
docker tag 056331603841.dkr.ecr.ap-southeast-2.amazonaws.com/mycoolwebapi:latest mycoolwebapi-latest

echo "Running"
docker run -p 3001:80 -it --env-file=../development.env mycoolwebapi-latest