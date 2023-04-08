# MyCoolWebAPI
[![Build and push image](https://github.com/road2paradise/MyCoolWebAPI/actions/workflows/build-and-deploy.yml/badge.svg)](https://github.com/road2paradise/MyCoolWebAPI/actions/workflows/build-and-deploy.yml)
## Welcome

**Welcome to my cool web api. This REST api is intended to fetch content hosted in contentful which will be used on my personal CV website.**

## High level architecture options

Currently it is deployed on a lambda with a function URL to fetch everything I have on Contentful of a specific type.

8/04/2023 - Decided to explore using ECS and ECR and to use Docker to run my application.

**Problems**
- **Cold starts** - takes 3 seconds to fetch from a cold start - potentially look at a caching option or just directly call contentful in my front end project.

**Benefits**
- Don't have to host my web api on an instance and waste money


## TO RUN LOCALLY
Add a `development.env` at the root of the project with the correct aws credentials.
