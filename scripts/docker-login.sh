#!/bin/bash
aws ecr get-login-password --region ap-southeast-2 | docker login --username AWS --password-stdin 056331603841.dkr.ecr.ap-southeast-2.amazonaws.com