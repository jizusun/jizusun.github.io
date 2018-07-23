---
layout: post
title:  "React.js: What you might ask when getting started"
categories: drafts
---


### Why import like this `import React from 'react'` without explicitly using `React`?

- Because JSX was trans-compiled like `React.createElment(...)`

### How to use React with Babel in a single HTML page?

- You can use `unpkg.com` to load `UMD` version of `React`, `ReactDOM`, `babel`.
- See also: <https://jizusun.github.io/demo/react-router-demo#/>

### What's the difference between React Router v4 and earlier version? How to install?

- React Router v3

	- `yarn add react-router@^3`
	- Docs: <https://github.com/ReactTraining/react-router/tree/v3/docs>
- React Router v4

	- `yarn add react-router-dom`
	- Docs: <https://reacttraining.com/react-router>

### What's the difference between Material UI v0.x and v1?

- <https://github.com/mui-org/material-ui>
- Installation
	- Stable channel v1: `yarn add @material-ui/core`
	- v0.x (Migration to v1): `yarn add material-ui`
- Changelog: 


### How does HMR works, and how to get it with `create-react-app` and `react-router`?

- <https://github.com/jizusun/ssr-web-utils/commit/f06583ca4b73dc21544bfc7305a188b19dc0e768>

