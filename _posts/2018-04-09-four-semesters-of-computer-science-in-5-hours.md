---
layout: post
title:  "Lynda.com: Four Semesters of Computer Science in 5 Hours"
categories: drafts
---

* Author: Brian Holt
* Released: 6/2/2017
* Duration: 4h 46m
* Skill Level: Intermediate
* Course URL: <https://www.lynda.com/JavaScript-tutorials/Four-Semesters-Computer-Science-5-Hours/604270-2.html>

> Get a practical introduction to computer science concepts and take your knowledge of JavaScript to the next level. This course starts by exploring recursion, followed by how to use sorting algorithms. Next, the main elements of data structure interfaces are explained followed by demonstrations of how to implement list, tree, and table structures. Then, functional programming is covered, including use of map, reduce, and filter. For each section of the course, exercises are provided so you can practice.

> Note: This course was created by Frontend Masters. It was originally released on 07/12/2016. We're pleased to host this training in our library.

> Topics include:
> * Big O
> * Recursion
> * Sort: Bubble, insertion, and merge,
> * Quicksort
> * Median values
> * Interfaces
> * Set, map, stack, and queue
> * Array lists and linked lists
> * Binary search tree
> * AVL tree
> * Single rotation and double rotation
> * Hash table
> * Functional programming
> * Map, reduce, and filter

## Table of Content
{:.no_toc}

* A markdown unordered list which will be replaced with the ToC, excluding the "Contents header" from above
{:toc}

## 1. Big O and Resursion

### 1.1 Introduction
* [http://bit.ly/4semesters](http://bit.ly/4semesters)
* Also: <a href="/demo/4semesters" target="_blank">https://jizusun.github.io/demo/4semesters</a>
* clickbait title
* Some knowledge of ES6 required
* https://mitpress.mit.edu/books/introduction-algorithms

### 1.2 Big O
> Think of the O as a vacuum that sucks in all the unimportant information and just leaves you with the important stuff. 

### 1.3 Finding Big O
* O(n): without exponential terms
* O(n<sup>2</sup>): nested loop
* O(1)
* O(log n): merge sort, quick sort

### 1.4 Recursion
* a bit of cost because of many callings of functions
* readibility over performance, and refactor it later if you figure it's a big bottleneck 

### 1.5 Recursion Example
* Codepen : <http://codepen.io/btholt/pen/rxwEVQ?editors=001>

### 1.6 Exercise 1: Recursion
* Factorial: 
```
function factorial(n) {
    if (n < 2) return 1;
    return n * factorial(n-1;)
}
```

## 2. Sorting Algorithms
### Bubble sort

- The outer loop continues running as long as there are numbers swapped in the previous iteration, which is always going to run at least once.
- The inner loop is gonna go through and swap numbers if they're out of order
- Big O: O(n<sup>2</sup>)
- sort in ascending order
```
5, 7, 6, 4
first outer loop
5, [6, 7], 4 
5, 6, [4, 7]
second outer loop
5, [4, 6], 7
third outer loop
[4, 5], 6, 7
```

### Exercise 2: Bubble sort

- Exercise: <http://codepen.io/btholt/pen/PZKPjj?editors=001>
- Answer (Visualization): <http://codepen.io/btholt/pen/KdYPqa?editors=001>

### Exercise 2: Solution
```javascript
const bubbleSort = (nums) => {
  do {
    let swapped = false;
    for (let i = 0; i < nums.length; i++) {
      // snapshot(nums);
      if (num[i] > num[i+1]) {
        const t = num[i];
        num[i] = num[i+1];
        num[i+1] = t;
        swapped = true;
      }
    }
  } while (swapped)
  // snapshot(nums);
}
```

### Insertion sort

- It's really great for arrays that are very close to sorted. But where it falls apart is if the array is not sorted at all.
- Example 
```
5, 3, 6
the 1st element as a sub-array
[5], 3, 6

```


### Exercise 3: Insertion sort

### Exercise 3: Solution

### Merge sort

### Exercise 4: Merge sort

### Exercise 4: Solution

### Median values

### Quicksort

### Exercise 5: Quicksort

### Exercise 5: Solution

## 3. Data Structure Interfaces

### Interfaces

### Set

### Map

### Stack

### Queue

## 4. Implementing Data Structures

### Array list

### Exercise 6: Array list

### Exercise 6: Solution

### Linked list

### Exercise 7: Linked list

### Exercise 7: Solution, part 1

### Exercise 7: Solution, part 2

### Binary search tree

### Exercise 8: Binary search tree

### Exercise 8: Solution

### AVL tree

### Single rotation

### Double rotation

### Exercise 9: Solution, part 1

### Exercise 9: Solution, part 2

### Hash table

## 5. Functional Programming 101

### Functional programming concepts

### Map

### Reduce

### Filter

