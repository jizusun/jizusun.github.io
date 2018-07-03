---
layout: post
title:  "Lynda.com: Mastering Web Developer Interview Code"
categories: readings
---

* Author: Ray Villalobos
* Released: 6/27/18/2017
* Duration: 8h 40m
* Skill Level: Beginner
* Course URL: <https://www.lynda.com/Web-Development-tutorials/Mastering-Web-Developer-Interview-Code/580663-2.html>

> Whether you're actively looking for a new job, or you just want to keep your coding skills sharp, it's important to refresh your understanding of the kinds of front-end and full-stack developer code that potential employers value. In this weekly series, senior staff author explores essential coding skills that every developer should have in their toolkit. In addition to taking you through a series of brief, practical exercises, this course includes interviews with hiring managers and industry professionals that can help demystify the interview process for web developers, and provide you with examples of how others in the field have navigated their careers. Tune in every Tuesday for a new tip.

## Table of Content
{:.no_toc}

* A markdown unordered list which will be replaced with the ToC, excluding the "Contents header" from above
{:toc}



## New This Week

### Create a list of URLs from these links

<http://jsbin.com/lofodid/edit?html,output>

Performance improvement: 
- <https://stackoverflow.com/questions/24878392/why-is-appending-to-an-element-not-yet-in-the-dom-faster-than-using-a-javascript>
- <https://jsperf.com/javascript-fragments-tests>

```javascript

var myTarget = document.querySelector('#myLinks');
var arr = [
	{ name: "LinkedIn", link: "http://linkedin.com/in/planetoftheweb"},
	{ name: "Blog", link: "http://raybo.org"},
	{ name: "Twitter", link: "http://twitter.com/planetoftheweb"}
]

arr.forEach(function(item){
	var el = document.createElement('a');
	el.href = item.link;
	el.innerText = item.name;

	myTarget.appendChild(el);
})

```

Resources:
- MDN: forEach
- Four Semesters of Computer Science in 5 Hours
- Functional-Lite JavaScript
- Learning Functional Programming



## Introduction

### Welcome

### What you should know

### Using the exercises for this course



## 1. Phase One

### How do you manipulate the DOM?

### Create a practical example of closures