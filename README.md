# Techfolio :computer:
[![Build and push image](https://github.com/road2paradise/techfolio/actions/workflows/build-and-deploy.yml/badge.svg?branch=master)](https://github.com/road2paradise/techfolio/actions/workflows/build-and-deploy.yml)

# Whats going on?
29/6/2023 - Did some research and after hosting my backend on AWS using ECS , I decided to go back to the drawing board with my design and decided to use contentful webhooks + Lambda's to serve content. Contentful will publish webhooks to my lambda and my lambda will trigger a fetch to fetch all my static content from Contentful API's and dump them into s3 where my static website will be pulling content from. 
- This becomes fully serverless , no need to worry about $$$
- No backend
- No maintenance, only front end components
- Lambda's only trigger on publishing new content on Contentful - saving heaps of $$$.

22/6/23 - Did some content / domain modelling for my Contentful content types. Learnt how to work with Rich text fields in Contentful and using a helpful `HtmlRenderer` function to map between rich text and html.

21/6/23 - Did some reading on Terraform, got bored so looked at automating generating typescript client from my backend.

:white_check_mark: Have learnt how to manually generate - this will work for now. In future I want to do what I have seen in my workplace where we auto generate our clients as part of CI.

![](./assets/poc.PNG)

18/6/23 - Currently working on Terraform and fixed github actions. :thinking:

## Summary
This is a website designed to showcase some of my tech skills that I've learnt over my career as a Software Developer.

## About me
:watch: I am currently a Software Engineer at Xero working as a Full Stack developer in the Ecosystems team. Our main product is the [XERO APP STORE](https://apps.xero.com/nz) where partners are able to develop against and users are able to utilize the Xero API. Our team focuses on the Billing aspect (Referrals, Subscriptions) and also the Partner Experience to on-board new apps!


## Things you must do to ensure the project is able to be run
- To generate contentful types automagically simply fill in the `.env.development` file using the duplicate template adding in your own things
- 
# Technologies used

## BFF (Backend for front end)
My BFF is written in C# .NET Core 6.0

This is a [pattern](https://blog.bitsrc.io/bff-pattern-backend-for-frontend-an-introduction-e4fa965128bf) that I learnt at Xero. 

The BFF does the following:
- Call the relevant microservices APIs and obtain the needed data
- Format the data based on the frontend representation
- Send the formatted data to the frontend

## 
