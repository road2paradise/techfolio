#!/bin/bash

# Run Docker container
docker run -p 3001:80 -it --env-file=../development.env mycoolwebapi