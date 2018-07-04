---
layout: post
title:  "Lynda.com: Building and Deploying a Full-Stack React Application"
categories: readings
---

* Author: Carl Peaslee
* Updated: 6/26/2017
* Duration: 4h 17m
* Skill Level: Intermediate 
* Course URL:  <https://www.lynda.com/React-js-tutorials/Building-Deploying-Full-Stack-React-Application/558648-2.html>

> React—a popular JavaScript framework—boasts a number of developer-friendly tools that can help you quickly and efficiently turn your ideas into fully-functioning applications. If you already have a solid grasp of the essentials of full-stack JavaScript web development, this practical, project-based course can help you get acquainted with React. Follow Carl Peaslee as he walks through how to plan, configure, create, and deploy a scalable, full-stack React and Relay application. As Carl explains how to lay out a UX roadmap, construct the foundation of an application, implement authentication, and connect your app to a remote database, you can practice what you learn by building a site where users can play simple games.
Topics include:

> * Installing local dependencies
> * Generating a starter project
> * Deploying to Heroku
> * Planning your development process
> * Using styled-components
> * Styling for mobile
> * Setting up models on Graphcool
> * Creating Relay mutations
> * Adding Relay to your authentication flow
> * Protecting routes with authentication



## Table of Content
{:.no_toc}

* A markdown unordered list which will be replaced with the ToC, excluding the "Contents header" from above
{:toc}

## Introduction

### Welcome
- a scalable React and Relay application, complete with a database and authentication
- with graphQL 
- authentication with Auth0
- tic-tac-toe 

### What you should know
- React
- Relay, Styled components, Material-UI, React Router, Git, npm, and the command line
- GitHub, Heroku, AuthO, Graphcool
- Atom, Yarn, Chrome

### Installing local dependencies
- create-react-app

## 1. Planning

### Design overview of the app
- MVP Core Features
    + Authenticated login
    + Play against a simple bot
    + Guess if opponent is human
    + Store game records
- Ideas for Later
    + Integrate with Facebook
    + Play live against a person
    + Show users a leaderboard
    + Use a real machine learning API

### Generating a starer project
-  Using `create-react-app`

### Creating a Git repository
- Author's GitHub profile: <https://github.com/carlpeaslee>

### Preparing for Relay
- <https://www.graph.cool>: **API Endpoints - Relay**
- Eject webpack config: `yarn run eject`
- Add as a dev dependency: `yarn add -D babel-plugin-react-relay`
- `webpack.config.dev.js`: `cacheDirectory: false`
- `start.js`: comment all `clearConsole()`
- `package.json`: add `react-relay` as babel plugin
- More at <https://github.com/prismagraphql/babel-plugin-react-relay>, but it's DEPRECATED now

### Setting up React Router

### Creating children routes

### Implementing Material-UI

### Deploying to Heroku

## 2. Deployment Environments

### Planning our development process

### Building a nav drawer

### Nav drawer functionality

### Nav drawer links

### Presentational components

### Using styled-components

### Styling for mobile

## 3. App Functionality

### Canvas setup

### Building boards

### Creating squares

### Square functionality

### Building AI

### Finishing the game

### Profile page styles

### Profile page records

## 4. Implementing Libraries

### Authentication setup

### Authentication class

### Relay authorization headers

### Injecting the Relay network layer

### Setting up models on Graphcool

### Viewer queries and Relay containers

### Creating user mutation

### Signin mutations

### Adding Relay to our authentication flow

## 5. Creating Components

### Creating an authentication button

### Creating a Turing test

### Recording the game

### Connecting a profile to Relay

### Protecting routes with authentication

## Conclusion

### Next steps

