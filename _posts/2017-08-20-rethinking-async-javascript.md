---
layout: post
title:  "Lynda.com(Frontend Masters) - Rethinking Async Javascript"
categories: drafts
---

* Author: Kyle Simpson
* Released: Intermediate
* Duration: 6h 22m
* Skill Level: Intermediate
* Course URL: <https://www.lynda.com/JavaScript-tutorials/Rethinking-Asynchronous-JavaScript/604266-2.html>

> Get comfortable with the latest evolutions of the JavaScript language and new ES6 features. This course provides the opportunity to follow along with Kyle Simpson, so you can gain new programming skills. Learn to use work with callbacks, handle inversion of control, and use thunks. Find out how to leverage promises—including native promises and a promise API—and how to work with abstractions, sequences, and gates. See how to use generators, observables, CSP, and more.

> Note: This course was created by Frontend Masters. It was originally released on 3/29/2016. We're pleased to host this training in our library.

> Topics include:
> * Parallel and asynchronous code
> * Working with callbacks
> * Using thunks
> * Exploring promise flow control
> * Abstractions, sequences, and gates
> * Generators
> * Messaging
> * Observables, events, and sequences
> * CSP
> * Blocking channels


## Table of Content
{:.no_toc}

* A markdown unordered list which will be replaced with the ToC, excluding the "Contents header" from above
{:toc}

## 1. Parallel vs. Async

### Course introduction

### Single threaded JavaScript

### Concurrency

## 2. Callback

### Callback misery

### Exercise 1

### Exercise 1: Solution

### Callback problems: Inversion of control

### Callback problems: Not reasonable

### Non fixes

## 3. Thunks

### Synchronous and asynchronous thunks

### Exercise 2

### Exercise 2 solution

### Thunks and closure

## 4. Promises

* Use the vertical chaining, avoid the Promise callback
```
Promise.reject()
.catch(function(){
  // to do when fail
})
```
### Native promises

### Promise api

### Promise flow control

### Exercise 3

### Exercise 3 solution

### Exercise 3 questions, part 1

### Exercise 3 questions, part 2

### Exercise 4

### Exercise 4 solution

### Abstractions

### Sequences and gates

### Exercise 5 and 6

### Exercise 5: Solution

### Exercise 6: Solution

## 5. Generators

### Generator example

### Messaging

### Messaging questions

### Async generators

### Promises and generators

### Exercise 7

### Exercise 7: Solution

### Quiz

## 6. Observables

### Events and promises

### Observables

### Reactive sequences

### Exercise 8

### Exercise 8: Solution, part 1

### Exercise 8: Solution, part 2

## 7. CSP

### Concurrency and channels

### Blocking channels

### Event channels

### Exercise 9

### Exercise 9: Solution

### Recap

### Exercise 10

### Wrap-up