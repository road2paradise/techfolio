# Logs
## 2/7/2023
Right now all the lambda does is pull content everytime its called. Created a github issue to listen to a specific event.
## 29/6/2023
Decided to code this in python as I have never used python before in any personal projects.

The goal / outcome of this is to:
- Respond to contentful publish events
- Perform a fetch on all published models on contentful
- Serve them as a json blob to AWS S3.