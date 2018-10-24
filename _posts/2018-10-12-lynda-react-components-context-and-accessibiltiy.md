---
layout: post
title:  "Lynda.com: Components, Context, and Accessibility"
categories: drafts
---

* Author:  [Eve Porcello]()
* Released: 
* Duration: 
* Skill Level: 
* Course URL: <>

> Course Description


## Table of Content
{:.no_toc}

* A markdown unordered list which will be replaced with the ToC, excluding the "Contents header" from above
{:toc}


### Welcome

### What you should know before watching this course

* Course: Learning React.js / React.js Essential Training

### Using the exercises files

* Editor: Atom

### What's new in React 16

* Improved async rendering
* Return arrays of elements
* Better error handling
* Smaller file size 

### Rendering arrays

```html
<html>
    <head>
        <script src="https://unpkg.com/@babel/standalone/babel.js"></script>
        <script src="https://unpkg.com/react/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom/umd/react-dom.developmemt.js"></script>
    </head>
    <body>
        <div id="root"></div>
        <script type="text/babel">
            // TODO
        </script>
    </body>
</html>
```

Rendering flat arrays

```js
const Greetings = () => {
    return [
        <li key="1">Hello!</li>,
        <li key="2">Hey!</li>,
        <li key="3">Yo!</li>
    ]
}

ReactDOM.render(
    <Greetings />,
    document.getElementById('root')
)

```

Rendering dynamic arrays

```js
const data = [
    { greeting: 'Hello', id: 1 },
    { greeting: 'Hey!', id: 2 },
    { greeting: 'Yo!', id: 3 },
]

const Greetings = ({data})  => {
    return data.map(item => {
        return (
            <li key={item.id}>{item.greeting}</li>
        )
    })
}

ReactDOM.render(
    <Greetings data={data} />,
    document.getElementById('root')
)
```


### setState() changes

```js
const NowEating = props => <h1>{props.meal}</h1>

class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            meal: "Spaghetti"
        }
    }
    render() {
        return {
            <div>
                <NowEating meal={this.state.meal} />
            </div>
        }
    }
}
```


```js
const NowEating = props => <h1>{props.meal}</h1>

class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            meal: "Spaghetti"
        }
        this.addSideDish = this.addSideDish.bind(this)
    }

    addSideDish() {
        // this.setState({
        //     meal: "Spaghetti and Salad"
        // })

         this.setState(prevState => {
             return { 
                 meal: `${prevState.meal} & Salad`
             }
         })
    }
    render() {
        return {
            <div>
                <NowEating meal={this.state.meal} />
                {
                    this.state.meal === "Spaghetti"
                    ? <button onClick={this.addSideDish}Add Side Dish</button>
                    : null
                }
            </div>
        }
    }
}
```

Refactor: States as static properties

```js
const NowEating = props => <h1>{props.meal}</h1>

class Menu extends React.Component {
    state = {
        meal: "Spaghetti"
    }
    // arrow function would not cause the problem of 'this'
    addSideDish = () => {
         this.setState(prevState => {
             return { 
                 meal: `${prevState.meal} & Salad`
             }
         })
    }
    render() {
        return {
            <div>
                <NowEating meal={this.state.meal} />
                {
                    this.state.meal === "Spaghetti"
                    ? <button onClick={this.addSideDish}Add Side Dish</button>
                    : null
                }
            </div>
        }
    }
}
```

### Compound components

### Uncontrolled components

