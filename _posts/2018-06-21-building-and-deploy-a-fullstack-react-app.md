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

### 00_01. Welcome
- a scalable React and Relay application, complete with a database and authentication
- with graphQL 
- authentication with Auth0
- tic-tac-toe 
- <https://github.com/tictacturing/tictacturing>

![final](https://user-images.githubusercontent.com/4011348/42628897-1634d520-8604-11e8-8f36-34c7f52dabdc.png)


### 00_02. What you should know
- React
- Relay, Styled components, Material-UI, React Router, Git, npm, and the command line
- GitHub, Heroku, AuthO, Graphcool
- Atom, Yarn, Chrome

### 00_03. Installing local dependencies

```
"dependencies": {
    "auth0-lock": "^10.11.0",
    "konva": "^1.3.0",
    "material-ui": "^0.16.7",
    "react": "^15.4.2",
    "react-dom": "^15.4.2",
    "react-konva": "^1.1.1",
    "react-relay": "^0.10.0",
    "react-relay-network-layer": "^1.3.9",
    "react-router": "^3.0.2",
    "react-router-relay": "^0.13.5",
    "react-tap-event-plugin": "^2.0.1",
    "styled-components": "^1.4.2"
  }
```
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
( <https://github.com/prismagraphql/babel-plugin-react-relay>, but it's **DEPRECATED** now)
- `webpack.config.dev.js`: `cacheDirectory: false`
- `start.js`: comment all `clearConsole()`
- `package.json`: add `react-relay` as babel plugin

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

```bash
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
- `move`: 
    + `this.setState`: `(prevState, props) => stateChange`: <https://reactjs.org/docs/react-component.html#setstate>
    + turn over the `yourTurn`
    + use `splice` to mark the move in `gameState`: <https://stackoverflow.com/questions/32543455/javascript-replace-directly-with-index-vs-array-splice>
    + use `this.winChecker` to get the wining solution array, and then get the winner from `gameState`
    + if `foundWin !! !gameState.includes(false)`, then `gameOver`
    + if `!yourTurn && !gameOver`, then make AI move
- `makeAiMove`: wait 1 seconds (`setTimeout`)before the actual move

### Profile page styles
- Exercise file provided: `src/styled/Profile.js`
    - `Container, Name, Game, ListHeader, GameList, GameRecord, Column, ColumnLabels`
- `src/containers/Profile.js`
    - `defaultProps`
    - layout:
```html
Container
    Name
    GameList
        GameListHeader
        ColumnLabels
            Column(Outcome, Guest, Guessed Correctly, Date )
        {this.records}
```

### Profile page records
- Connect all this dummy data into our list
    - get records() : `this.props.user.games.map`
- layout:
```html
GameRecord
    Column(Outcome, Guest, Guessed Correctly, Date )
```

## 4. Implementing Libraries

### 04_01. Authentication setup
- <https://github.com/tictacturing/tictacturing/tree/03_00_end>
- `Passport`( <https://github.com/jaredhanson/passport>) 
    + > Passport is Express-compatible authentication middleware for Node.js.
- Auth0
    + `yarn add auth0-lock@10 -T`
    + `src/utils/auth.js`: authDomain, clientId
- Create Client (New Application): <https://manage.auth0.com/#/> 

### 04_02. Authentication class
- <https://github.com/tictacturing/tictacturing/tree/03_01_end>
- `import Auth0Lock from 'auth0-lock'` ( "auth0-lock": "^10.11.0")
    - <https://auth0.com/docs/libraries/lock/v10/api>
    - <https://auth0.com/docs/libraries/lock/v10>
- `src/utils/auth.js`
- class: `AuthService`
    + `constructor`: `new Auth0Lock()` 
    + `authProcess`
    + `showLock`
    + `setToken`: set `idToken` and `exp` into localStorage
    + `isCurrent`: check if the `exp` is valid by comparing with current timestamp
    + `getToken`: return it before checking with `isCurrent`
    + `logout`: remove `idToken` and `exp` from localStorage, and reload the page


### 04_03. Relay authorization headers
- `yarn add react-relay react-relay-network-layer react-router-relay`
- `src/index.js`

```diff
+ import Relay from 'react-relay'
+ import useRelay from 'react-router-relay'
- import {Router, browserHistory} from 'react-router'
+ import {Router, browserHistory, applyRouterMiddleware} from 'react-router'
+ import {RelayNetworkLayer, urlMiddleware} from 'react-relay-network-layer'
+ import {relayApi} from './config/endpoints'
+ import auth from './utils/auth'

+ const createHeaders = () => {
+    let idToken = auth.getToken()
+    return idToken 
+       ? {Authorization: `Bearer ${idToken}` } 
+       : {}
+}
```


### 04_04. Injecting the Relay network layer
- <https://github.com/relay-tools/react-router-relay>
    + > This library does not support React Router v4, because React Router v4 does not provide the necessary integration points for efficient data fetching with Relay. Additionally, rendering performance will be better with React Router v2 than with React Router v3, as the link subscription logic in React Router v3 triggers unnecessary rerenders with Relay.
- <https://github.com/relay-tools/react-relay-network-layer>
- some code
    ```javascript
    Relay.injectNetworkLayer(
        new RelayNetworkLayer([
            urlMiddleware({
                url: (req) => relayApi,
            }),
            next => req => {
                req.headers = {
                    ...req.headers,
                    ...createHeaders()
                }
                return next(req)
            },
        ],{disableBatchQuery: true})
    )

    ReactDOM.render(
        <Router
            environment={Relay.Store}
            render={applyRouterMiddleware(useRelay)}
            history={browserHistory}
            routes={Routes}
        />,
        document.getElementById('root')
    )
    ```

### 04_05. Setting up models on Graphcool
- <https://console.graph.cool/>
- new Model `Game`
    - `id`
    - `createdAt`
    - `updatedAt`
    - `p1Guess`, Emum(ROBOT, HUMAN), required
    - `p1GuessCorrect`: Boolean, required
- new relationship
    + 1 `User` (related field: `p1games`) to many `Game` (related field: `p1players`)
    + name: `Player1Games`
    + Short description: 
- new relationship
    + 1 `user` (field: `winner`) to many `game` (field: `winner`)
    + name: `UserWins`
- new field for `User` model
    - `email`: string, required
- configure everyone's permission for CRUD
- configure Auth0 as the auth provider 
    + Integrations -> Auth0
    + <https://manage.auth0.com/#/applications>

### 04_06. Viewer queries and Relay containers
- References:
    +  <https://graphql.org/>
    + <http://facebook.github.io/relay/docs/en/introduction-to-relay.html>
    + <https://www.howtographql.com/>
- `src/routes/index.js`: <https://github.com/relay-tools/react-router-relay#usage>

    ```js
    const viewerQueries = {
        viewer: () => Relay.QL`query { viewer }`
    }
    ```

- `src/containers/Template.js`: <https://facebook.github.io/relay/docs/en/classic/classic-api-reference-relay-container.html>

    ```js
    import Relay from 'react-relay'

    // code here

    export default Relay.createContainer(
        Template, {
            fragment: {
                viewer: () => Relay.QL`
                    fragment on Viewer {
                        user {
                            id
                        }
                    }
                `,
            }
        }
    )
    ```

### 04_07. Creating user mutation

- `src/mutations/CreateUser.js`: <https://facebook.github.io/relay/docs/en/classic/classic-guides-mutations.html>
    + extends from `Relay.Mutation`
    + `getVariables`:
    + `getMutation`: 
    + `getFatQuery`: 
    + `getConfigs`: 

### 04_08. Sign-in mutations

- `src/mutations/SigninUser.js`: 
    + `getVariables`:
    + `getMutation`: `signinUser` 
    + `getFatQuery`: 
    + `getConfigs`: 

### 04_09. Adding Relay to our authentication flow
- `src/utils/auth.js`

```js
import CreateUser from '../mutations/CreateUser'
import SigninUser from '../mutations/SigninUser'
```

- Promise: 
    + `createUser`: `Relay.Store.commitUpdate`
    + `signinUser`: 
- `AuthService.authProcess`: first try `signinUser`, and if failed ,then `createUser`

## 5. Creating Components

### 05_01. Creating an authentication button

- `src/components/AuthButton.js`

```js
import RaisedButton from 'material-ui/RaisedButton'

if (this.props.authenticated) {
  return ()
} else {
  return ()
}

```

- pass props from `routes` -> `template` -> `navDrawer` -> `NavButton`

```html
<!-- Template.js -->
<NavDrawer
  auth={this.props.route.auth}
  authenticated={this.props.viewer.user}
/>
<!-- NavDrawer.js -->
<AuthButton
  auth={this.props.auth}
  authenticated={this.props.authenticated}
/>
```
### Creating a Turing test

### Recording the game

### Connecting a profile to Relay

### Protecting routes with authentication

## Conclusion

### Next steps

