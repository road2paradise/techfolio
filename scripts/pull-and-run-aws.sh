#!/bin/bash

# Run image stored in AWS ECR

# First kill all running docker containers.
echo "Killing all locally running docker containers"

docker kill $(docker ps -q)
# First pull image(s)
echo "Authenticating Docker to ECR repository"
./docker-login.sh

echo "Pulling latest image from ECR"
docker pull 056331603841.dkr.ecr.ap-southeast-2.amazonaws.com/bff:latest
docker tag 056331603841.dkr.ecr.ap-southeast-2.amazonaws.com/bff:latest bff-latest

echo "Running"
docker run -p 5164:80 -p 7232:443 -it --env-file=../development.env bff-latest