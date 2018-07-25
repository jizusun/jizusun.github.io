---
layout: post
title:  "Lynda.com: Learning Redux"
categories: drafts
---

* Author:   Alex Banks
* Released: 12/23/2016
* Duration: 2h 59m
* Course URL: <https://www.lynda.com/React-js-tutorials/Learning-Redux/540345-2.html>

> Redux is a JavaScript library for managing client data in apps. You can use Redux together with React or with any other view library. Inspired by Flux, Redux attempts to make state mutations predictable by imposing certain restrictions on how and when updates can happen. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to understand and debug. This course helps you understand Redux and its role in dynamic JavaScript applications. Instructor Alex Banks demonstrates Redux by building the data layer for a small sample app, and integrating that data into existing React components. Along the way, you'll learn how to create and combine reducers, build middleware, make action creators, and put it all together to drive a component-based interface.
> Topics include:

>     What is Redux?
>     Building object and array reducers
>     Combining reducers
>     Creating a store
>     Creating middleware
>     Building action creators
>     Incorporating React components

##  Introduction

### The history of Redux
*  Flux is an alternative to MVC, MVP, or MVVM
* Scalability of MVC pattern

    ![scaling of mvc pattern](https://user-images.githubusercontent.com/4011348/39079425-049d71fc-454d-11e8-9a27-8ff3bb66ea6d.png)

* Scalability of Flux pattern: Unidirectional

    ![scaling of flux pattern](https://user-images.githubusercontent.com/4011348/39079433-1d90cc72-454d-11e8-91f1-b4203460884c.png)

## 1. What is redux

### 1.2 How Redux works
* Redux is a Flux libray
* Only one store: "The single source of truth"
* There's no need to for dispatcher
* Modularity: one object, but obtained through functions
* Functional Programming
    * Pure functions
    * Immutability
    * Composition
* Composition with Reducer

    ![image](https://user-images.githubusercontent.com/4011348/39092052-f54fa816-4635-11e8-94da-890661ecd944.png)

### 1.3 Plan a Redux app
![image](https://user-images.githubusercontent.com/4011348/39092232-fd5834c8-463b-11e8-86be-e022c8de2c53.png)
![image](https://user-images.githubusercontent.com/4011348/39092338-4e9ade60-463e-11e8-9f33-e8b4910c961d.png)


## 2. Understanding Reducers 
### 2.1 Run Redux with Babel-node
1. Dev environment setup
```bash
npm init
npm install babel-cli --save-dev
npm install babel-preset-latest --save-dev
npm install babel-preset-stage-0 --save-dev
```
2.  Create a `.babelrc`
```
{
    presets: ['latest', 'stage-0']
}
```

### 2.2 Build your first reducer
### 2.3 Create object reducers
### 2.4 Create array reducers
### 2.5 Composing reducers
### 2.6 Challenge: Build reducers
### 2.7 Combine reducers

## 3: The Store

