---
layout: post
title:  "Lynda.com: Building and Deploying a Full-Stack React Application"
categories: drafts
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
- <https://github.com/tictacturing/tictacturing>

![final](https://user-images.githubusercontent.com/4011348/42628897-1634d520-8604-11e8-8f36-34c7f52dabdc.png)

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

```
yarn add react-router@3.0.2
```


### Creating children routes

### Implementing Material-UI

```
yarn add material-ui
```

### Deploying to Heroku

- Buildpack for Heroku: <https://github.com/mars/create-react-app-buildpack>

```
heroku login
heroku create $APP_NAME --buildpack https://github.com/mars/create-react-app-buildpack.git
heroku config:set GRAPHQL_ENDPOINT=https://api.graph.cool/relay/v1/xxxxxxx

git push heroku master
heroku open
```
static.json
```
{
    
}
```

## 2. Deployment Environments

### Planning our development process

- 3 kinds of components
 
| Containers  | Components | Presentational |
| ------------- | ------------- | ------------ |
| Connected to the store  | Manage their own state | Don't manage state (stateless) |
| Pass data to children | Pass props to presentational components  | Change styling based on props |


![image](https://user-images.githubusercontent.com/4011348/42251293-1dd8f50a-7f69-11e8-93ec-1401860c8f76.png)

- Template Container
    + Drawer
        + LoggingStuff
        + DrawerList
            + DrawerItem
    + Drawer Toggler
    + Header
    + View (of the game)
        + TicTacTocGame
            + Board
                + Square


### Building a nav drawer

- Create `src\components\NavDrawer.js`

### Nav drawer functionality

- add a placeholder for Login Container
- create a new state `open` for  the `open` prop of the drawer
- create a `onTouchTap` event handler to toggle the `open` state

### Nav drawer links

```
import <Link> from 'react-router'
```

### Presentational components

```
yarn add styled-components
```

### Using styled-components

```javascript
import React from 'react'
import styled from 'styled-components'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Menu from 'material-ui/svg-icons/navigation/menu'

const StayVisible = styled.div`
    position: absolute;
    margin-left: ${(props) => (props.open) ? `${props.width}px` : 'none'};
    transition: margin .2s
`

export const NavToggleButton = (props) => {
    return (
        <StayVisible
            {...props}
        >
            <FloatingActionButton >
                <Menu/>
            </FloatingActionButton>
            
        </StayVisible>
    )
}
```

### Styling for mobile

`media.js`
```javascript
import {css} from 'styled-components'

export const media = {
    handheld: (...args) => css`
        @media (max-width: 800px) {
            ${ css(...args) }
        }
    `
}
```

`styled\Template.js`
```javascript
import React from 'react'
import styled from 'styled-components'
import {media} from '../utils/media'


export const Header = styled.header`
    text-align: center;
    font-size: 2em;
    font-family: 'Roboto', sans-serif;
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    width: 80%;
    min-height: 80vh;
    ${media.handheld`
        width: 100%;
    `}  
`

export const Main = (props) => {
    return (
        <Container>
            {props.children}
        </Container>
    )
}
```

## 3. App Functionality

### Canvas setup

```
yarn add react-konva konva
```

### Building boards

- <https://github.com/tictacturing/tictacturing/tree/02_05_end>
- the state of `component/TicTacToe.js`
    - `size`: the .8 of `window.innerHeight` or `window.innerWeight`
    - `rows`: the rows of the board
    - `unit`: `size /rows`
- Use `react-konva` to draw the board, which is a styled component
    - `styled\TicTacToe.js`: export `Board` component
    - `import {Layer, Line} from 'react-konva'`


### Creating squares

- <https://github.com/tictacturing/tictacturing/tree/02_06_end>

### Square functionality

Create all squares, and every time we clicked on them we could see the index of the square that we clicked on.

### Building AI

- Helper functions:
    + `combos`: the 2-d array of all the possible winning combination
    + `winChecker`: use `Array.prototype.find` to check if the `gameState` matches any of the `combos`
    + `random`: to generate a random integer
    + `makeAiMove`: take an open square and move there at random
- <https://github.com/tictacturing/tictacturing/tree/02_07_end>

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

### Sign-in mutations

### Adding Relay to our authentication flow

## 5. Creating Components

### Creating an authentication button

### Creating a Turing test

### Recording the game

### Connecting a profile to Relay

### Protecting routes with authentication

## Conclusion

### Next steps

