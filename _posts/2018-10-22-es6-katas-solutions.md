---
layout: post
title:  "ES6 Katas: My Solutions & Annotations"
categories: drafts
---

[Edit this post](https://github.com/jizusun/jizusun.github.io/edit/master/_posts/2018-10-22-es6-katas-solutions.md)

ES6 Katas: Learn ES6 by doing it. Fix failing tests. Keep all learnings.
- Site: <http://es6katas.org/> 
- Source of this site: <https://github.com/tddbin/es6katas.org>
- All Katas: <https://github.com/tddbin/katas>
- Rich Text to Markdown converter: <http://markitdown.medusis.com/>


# Refrerences

- <http://es6-features.org/#Constants>
- <https://babeljs.io/docs/en/learn/>



## Table of Content
{:.no_toc}

* A markdown unordered list which will be replaced with the ToC, excluding the "Contents header" from above
{:toc}

## Promise

### basics (#75)

> A promise represents an operation that hasn`t completed yet, but is expected in the future.

Difficulty: beginner

Links for futher reading
* A well understandable description of the states a promise can be in: <http://www.ecma-international.org/ecma-262/6.0/#sec-promise-objects>
* Mocha - simple async support, including promises: <https://mochajs.org/#asynchronous-code>

```js 

// 75: Promise - basics 
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('a Promise represents an operation that hasn`t completed yet, but is expected in the future', function() {

  it('`Promise` is a global function', function() {
    const expectedType = 'function';
    assert.equal(typeof Promise, expectedType);
  });

  describe('the constructor', function() {
  
    it('instantiating it without params throws', function() {
      const fn = () => { new Promise() };
      assert.throws(fn);
    });  
    
    it('expects a function as parameter', function() {
      const param = function(){};
      assert.doesNotThrow(() => { new Promise(param); });
    });  
    
  });

  describe('simplest promises', function() {
  
    it('resolve a promise by calling the `resolve` function given as first parameter', function(done) {
      let promise = new Promise((resolve) => {
        resolve()
      });
      
      promise
        .then(() => done())
        .catch(() => done(new Error('The promise is expected to resolve.')));
    });
  
    it('the `resolve` function can return a value, that is consumed by the `promise.then()` callback', function(done) {
      let promise = new Promise((resolve) => {
        resolve(42);
      });
      
      promise
        .then(value => {assert.equal(value, 42); done(); })
        .catch(() => done(new Error('The promise is expected to resolve with 42!')));
    });
  
    it('rejecting a promise is done by calling the callback given as 2nd parameter', function(done) {
      let promise = new Promise((_, reject) => {
        reject();
      });
      
      promise
        .then(() => done(new Error('The promise is expected to be rejected.')))
        .catch(() => done());
    });

  });

  describe('an asynchronous promise', function() {
  
    it('can resolve later, also by calling the first callback', function(done) {
      let promise = new Promise((resolve) => {
        setTimeout(() => resolve(), 100);
      });
      
      promise
        .then(() => done())
        .catch(() => done(new Error('The promise is expected to resolve.')));
    });
  
    it('reject it at some later point in time, calling the 2nd callback', function(done) {
      let promise = new Promise((_, reject) => {
        setTimeout(() => reject(), 100);
      });
      
      promise
        .then(() => done(new Error('The promise is expected to be rejected.')))
        .catch(() => done());
    });

  });

  describe('test library (mocha here) support for promises', function() {
    
    it('just returning the promise makes the test library check that the promise resolves', function() {
      let promise = new Promise((resolve, reject) => {
        resolve();
      });
      
      // return the promise to mocha, it has the checking for promise resolving built in, when it receives a promise
      return promise;
    });
  
  });
});

```

### creation (#76)

A promise can be created in multiple ways, learn them all here.

> Difficulty: intermediate

Links for futher reading
- Describing the promise constructor: <http://www.ecma-international.org/ecma-262/6.0/#sec-promise-constructor>
- How `Promise.all()` is specified: <http://www.ecma-international.org/ecma-262/6.0/#sec-promise.all>
- Documenting `Promise.all()`: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all>
- How `Promise.race()` is specified: <http://www.ecma-international.org/ecma-262/6.0/#sec-promise.race>
- Documenting `Promise.race()`: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race>
- How `Promise.resolve()` is specified: <http://www.ecma-international.org/ecma-262/6.0/#sec-promise.resolve>
- Documenting `Promise.resolve()`: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve>
- How `Promise.resolve()` is specified: <http://www.ecma-international.org/ecma-262/6.0/#sec-promise.reject>
- Documenting `Promise.reject()`: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject>

```js
// 76: Promise - creation 
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('a promise can be created in multiple ways', function() {

  describe('creating a promise fails when', function() {
    
    it('using `Promise` as a function', function() {
      function callPromiseAsFunction() { 
        Promise();
      }
      assert.throws(callPromiseAsFunction);
    });
    
    it('no parameter is passed', function() {
      function promiseWithoutParams() {
        new Promise();
      }
      assert.throws(promiseWithoutParams);  
    });
    
    it('passing a non-callable throws too', function() {
      const notAFunction = 123;
      assert.throws(() => { new Promise(notAFunction); });
    });
    
  });
  
  describe('most commonly Promises get created using the constructor', function() {

    it('by passing a resolve function to it', function() {
      const promise = new Promise((resolve) => resolve());
      return promise;
    });

    it('by passing a resolve and a reject function to it', function(done) {
      const promise = new Promise((resolve, reject) => reject());
      
      promise
        .then(() => done(new Error('Expected promise to be rejected.')))
        .catch(done);
    });
    
  });
  
  describe('extending a `Promise`', function() {
    
    it('using `class X extends Promise{}` is possible', function() {
      class MyPromise extends Promise { }
      const promise = new MyPromise(resolve => resolve());
      
      promise
        .then(() => done())
        .catch(e => done(new Error('Expected to resolve, but failed with: ' + e)));
    });
    
    it('must call `super()` in the constructor if it wants to inherit/specialize the behavior', function() {
      class ResolvingPromise extends Promise {
        constructor(...args) {
          super(...args)
        }
      }
      
      return new ResolvingPromise(resolve => resolve());
    });
    
  });
  
  describe('`Promise.all()` returns a promise that resolves when all given promises resolve', function() {
    
    it('returns all results', function(done) {
      const promise = Promise.all([
        new Promise(resolve => resolve(1)),
        new Promise(resolve => resolve(2)),
        new Promise(resolve => resolve(3))
      ]);
      
      promise
        .then(value => { assert.deepEqual(value, [1, 2, 3]); done(); })
        .catch(e => done(new Error(e)));
    });
    
    it('is rejected if one rejects', function(done) {
      const promise = Promise.all([
        new Promise( (resolve, reject) => reject(1))
      ]);
      
      promise
        .then(() => done(new NotRejectedError()))
        .catch(() => done());
    });
    
  });
  
  describe('`Promise.race()` returns the first settled promise', function() {
    
    it('if it resolves first, the promises resolves', function(done) {
      const lateRejectedPromise = new Promise((resolve, reject) => setTimeout(reject, 100));
      const earlyResolvingPromise = new Promise(resolve => resolve('1st :)'));
      const promise = Promise.race([earlyResolvingPromise, lateRejectedPromise]);
      
      promise
        .then(value => { assert.deepEqual(value, '1st :)'); done(); })
        .catch(e => done(new Error('Expected to resolve, but failed with: ' + e)));
    });

    it('if one of the given promises rejects first, the returned promise is rejected', function(done) {
      const earlyRejectedPromise = new Promise((resolve, reject) => reject('I am a rejector'));
      const lateResolvingPromise = new Promise(resolve => setTimeout(resolve, 10));
      const promise = Promise.race([earlyRejectedPromise, lateResolvingPromise]);
      
      promise
        .then(() => done(new NotRejectedError()))
        .catch(value => { assert.equal(value, 'I am a rejector'); done(); })
        .catch(done);
    });
    
  });

  describe('`Promise.resolve()` returns a resolving promise', function() {

    it('if no value given, it resolves with `undefined`', function(done) {
      const promise = Promise.resolve();
      
      promise
        .then(value => { assert.deepEqual(value, void 0); done(); })
        .catch(e => done(new Error('Expected to resolve, but failed with: ' + e)));
    });

    it('resolves with the given value', function(done) {
      const promise = Promise.resolve('quick resolve');
      
      promise
        .then(value => { assert.equal(value, 'quick resolve'); done(); })
        .catch(e => done(e));
    });
    
  });
  
  describe('`Promise.reject()` returns a rejecting promise', function() {

    it('if no value given, it rejects with `undefined`', function(done) {
      const promise = Promise.reject();
      
      promise
        .then(() => done(new NotRejectedError()))
        .catch(value => { assert.deepEqual(value, void 0); done(); })
        .catch(done);
    });

    it('the parameter passed to `reject()` can be used in the `.catch()`', function(done) {
      const promise = Promise.reject('quick reject');
      
      promise
        .then(() => done(new NotRejectedError()))
        .catch(value => { assert.deepEqual(value, 'quick reject'); done(); })
        .catch(done);
    });
    
  });
  
});

class NotRejectedError extends Error {
  constructor() {
    super();
    this.message = 'Expected promise to be rejected.';
  }
}
```

### chaining `then()` (#77)
> Chaining promises can enhance readability of asynchronous code.

Difficulty: advanced

Links for futher reading
* The description of how a value given to `then()` becomes a resolved promise: <https://promisesaplus.com/#point-45>
* Looks like the description in the spec of what `then()` accepts and does with the given value: <http://www.ecma-international.org/ecma-262/6.0/#sec-promisereactionjob>
* A long article introducing promises: <http://www.html5rocks.com/en/tutorials/es6/promises/>


```js

// 77: Promise - chaining 
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('chaining multiple promises can enhance readability', () => {

  describe('prerequisites for understanding', function() {
    
    it('reminder: the test passes when a fulfilled promise is returned', function() {
      return Promise.resolve('I should fulfill.');
    });
  
    it('a function given to `then()` fulfills (if it doesnt throw)', function() {
      const beNice = () => { return 'I am nice' };
      return Promise.resolve()
        .then(beNice)
        .then(niceMessage => assert.equal(niceMessage, 'I am nice'));
    });
    
  });

  describe('chain promises', function() {
    
    const removeMultipleSpaces = string => string.replace(/\s+/g, ' ');
    
    it('`then()` receives the result of the promise it was called on', function() {
      const wordsPromise = Promise.resolve('one   space     between each     word');
      return wordsPromise
        .then(string => removeMultipleSpaces(string))
        .then(actual => {assert.equal(actual, 'one space between each word')})
      ;
    });
    
    const appendPeriod = string => `${string}.`;
    
    it('multiple `then()`s can be chained', function() {
      const wordsPromise = Promise.resolve('Sentence without       an end');
      return wordsPromise
        .then(appendPeriod)
        .then(removeMultipleSpaces)
        .then(actual => {assert.equal(actual, 'Sentence without an end.')})
      ;
    });
    
    const trim = string => string.replace(/^\s+/, '').replace(/\s+$/, '');
    
    it('order of the `then()`s matters', function() {
      const wordsPromise = Promise.resolve('Sentence without       an end ');
      return wordsPromise
        .then(trim)
        .then(appendPeriod)
        .then(removeMultipleSpaces)
        .then(actual => {assert.equal(actual, 'Sentence without an end.')})
      ;
    });
    
    const asyncUpperCaseStart = (string, onDone) => {
      const format = () => onDone(string[0].toUpperCase() + string.substr(1));
      setTimeout(format, 100);
    };
  
    
    it('any of the things given to `then()` can resolve asynchronously (the real power of Promises)', function() {
      const wordsPromise = Promise.resolve('sentence without an end');
      return wordsPromise
        .then(string => new Promise(resolve => asyncUpperCaseStart(string, resolve)))
        .then(string => new Promise(resolve => setTimeout(() => resolve(appendPeriod(string)), 100)))
        .then(actual => {assert.equal(actual, 'Sentence without an end.')})
      ;
    });
  
    it('also asynchronously, the order still matters, promises wait, but don`t block', function() {
      const wordsPromise = Promise.resolve('trailing space   ');
      return wordsPromise
        .then(string => new Promise(resolve => asyncUpperCaseStart(string, resolve)))
        .then(string => new Promise(resolve => setTimeout(() => resolve(trim(string)), 100)))
        .then(string => new Promise(resolve => setTimeout(() => resolve(appendPeriod(string)), 100)))
        .then(actual => {assert.equal(actual, 'Trailing space.')})
      ;
    });
    
  });

});

```


### the API (#78)

> `Promise` API overview.

Difficulty: intermediate

<http://tddbin.com/#?kata=es6/language/promise/api>


```js
// 78: Promise - API overview
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('`Promise` API overview', function() {

  it('`new Promise()` requires a function as param', () => {
    const param = () => {};
    assert.doesNotThrow(() => { new Promise(param); });
  });

  describe('resolving a promise', () => {
    // reminder: the test passes when a fulfilled promise is returned
    it('via constructor parameter `new Promise((resolve) => { resolve(); })`', () => {
      const param = (resolve) => { resolve(); };
      return new Promise(param);
    });
    it('using `Promise.resolve()`', () => {
      return Promise.resolve('all fine');
    });
  });

  describe('a rejected promise', () => {
    it('using the constructor parameter', (done) => {
      const promise = new Promise((_, reject) => { reject(); });
      promise
        .then(() => done(new Error('The promise is expected to be rejected.')))
        .catch(() => done());
    });
    it('via `Promise.reject()`', (done) => {
      const promise = Promise.reject();
      promise
        .then(() => done(new Error('The promise is expected to be rejected.')))
        .catch(() => done());
    });
  });

  const resolvingPromise = Promise.resolve();
  const rejectingPromise = Promise.reject();

  describe('`Promise.all()`', () => {
    it('`Promise.all([p1, p2])` resolves when all promises resolve', () =>
      Promise.all([resolvingPromise, resolvingPromise])
    );
    it('`Promise.all([p1, p2])` rejects when a promise is rejected', (done) => {
      Promise.all([resolvingPromise, rejectingPromise ])
        .then(() => done(new Error('The promise is expected to be rejected.')))
        .catch(() => done())
    });
  });

  describe('`Promise.race()`', () => {
    it('`Promise.race([p1, p2])` resolves when one of the promises resolves', () =>
      Promise.race([resolvingPromise, rejectingPromise])
    );
    it('`Promise.race([p1, p2])` rejects when one of the promises rejects', (done) => {
      Promise.race([rejectingPromise, resolvingPromise])
        .then(() => done(new Error('The promise is expected to be rejected.')))
        .catch(() => done())
    });
    it('`Promise.race([p1, p2])` order matters (and timing)', () =>
      Promise.race([resolvingPromise, rejectingPromise])
    );
  });

});
```

### `promise.catch()` (#79)

Returns a Promise and deals with rejected cases only.

Difficulty: intermediate  

Links for futher reading

- A short description of how `catch` works: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch>
- The actual chapter about `catch`, you need to dive in from here: <http://www.ecma-international.org/ecma-262/6.0/index.html#sec-promise.prototype.catch>
- The description of the actual flow of `catch`: <http://www.ecma-international.org/ecma-262/6.0/index.html#sec-performpromisethen>

```js
// 79: Promise - catch
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!
// Here we use promises to trigger, don't modify the block with the 
// returning promise!

describe('`catch()` returns a Promise and deals with rejected cases only', () => {

  describe('prerequisites for understanding', () => {

    it('*return* a fulfilled promise, to pass a test', () => {
      return Promise.resolve();
      assert(false); // Don't touch! Make the test pass in the line above!
    });

    it('reminder: the test passes when a fulfilled promise is returned', () => {
      return Promise.resolve('I should fulfill.');
    });

  });

  describe('`catch` method basics', () => {
    it('is an instance method', () => {
      const p = Promise.prototype;
      assert.equal(typeof p.catch, 'function');
    });

    it('catches only promise rejections', (done) => {
      const promise = Promise.reject();
      promise
        .then(() => { done('Should not be called!'); })
        .catch(done);
    });

    it('returns a new promise', () => {
      const whatToReturn = () => Promise.resolve();
      const promise = Promise.reject();
      return promise.catch(() =>
        whatToReturn()
      );
    });

    it('converts it`s return value into a promise', () => {
      const p = Promise.reject();
      const p1 = p.catch(() => 'promise?');

      return p1.then(result => assert.equal('promise?', result));
    });

    it('the first parameter is the rejection reason', () => {
      const p = Promise.reject('oops');

      return p.catch(reason => {
        assert.equal(reason, 'oops');
      });
    });
  });

  describe('multiple `catch`es', () => {
    it('only the first `catch` is called', () => {
      const p = Promise.reject('1');
      const p1 = p
          .catch(reason => `${reason} AND 2`)
          .catch(reason => `${reason} AND 3`)
        ;

      return p1.then(result =>
        assert.equal(result, '1 AND 2')
      );
    });

    it('if a `catch` throws, the next `catch` catches it', () => {
      const p = Promise.reject('1');
      const p1 = p
          .catch(reason => { throw Error(`${reason} AND 2`) })
          .catch(err => { throw Error(`${err.message} AND 3`) })
          .catch(err => err.message)
        ;

      return p1.then(result =>
        assert.equal(result, '1 AND 2 AND 3')
      );
    });
  });

});
```

## Array

### `Array.from()` (#29)

Convert a not-array into an array.

Difficulty: tbd

<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from>


```js
// 29: array - `Array.from` static method
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!



describe('`Array.from` converts an array-like object or list into an Array', () => {
 // Converts array-like object: 
 // https://medium.com/front-end-hacking/creating-arrays-from-array-like-objects-5d24815cdbd3
 
  const arrayLike = {0: 'one', 1: 'two', length: 2};
  
  it('call `Array.from` with an array-like object', function() {
    // this also works: 
    // const arr = [].slice.apply(arrayLike)
    const arr = Array.from(arrayLike);

    assert.deepEqual(arr, ['one', 'two']);
  });
  
  it('a DOM node`s classList object can be converted', function() {
    const domNode = document.createElement('span');
    domNode.classList.add('some');
    domNode.classList.add('other');
    
    // Object.prototype.toString.call(domNode.classList)
    // "[object DOMTokenList]"
    
    const classList = Array.from(domNode.classList);
    // we can also 
    // const classList = [...domNode.classList]
    
    // we can also check the equality of array contents with `deepEqual`
    // assert.deepEqual(classList, ["some", "other"])
    
    assert.equal(''+classList, ''+['some', 'other']);
  });
  
  it('convert a NodeList to an Array and `filter()` works on it', function() {
    const nodeList = document.createElement('span');
    const divs = Array.from(nodeList).filter((node) => node.tagName === 'div');

    assert.deepEqual(divs.length, 0);
  });
  
  describe('custom conversion using a map function as second param', () => {
    it('we can modify the value before putting it in the array', function() {
      const arr = Array.from(arrayLike, (value) => value.toUpperCase() );

      assert.deepEqual(arr, ['ONE', 'TWO']);
    });
    
    
    it('and we also get the object`s key as second parameter', function() {
      const arr = Array.from(arrayLike, (value, key) => `${key}=${value}`);
      // Array.from(obj, mapFn, thisArg) has the same result as Array.from(obj).map(mapFn, thisArg)
      // Thus also can be written as:
      // const arr = Array.from(arrayLike).map( (v, i) => `${i}=${v}` )

      assert.deepEqual(arr, ['0=one', '1=two']);
    });
  });
  
});
```


### `Array.of()` (#30)

`Array.of` creates an array with the given arguments as elements.

Difficulty: tbd


```js

// 30: array - `Array.of` static method
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('`Array.of` creates an array with the given arguments as elements', () => {
  
  it('dont mix it up with `Array(10)`, where the argument is the array length', () => {

    // `Array(10)` actually is  [, , , , , , , , , ,]
    // `Array.of(10)` actually is [10]
    // The difference between Array.of() and the Array constructor is in the handling of integer arguments
    const arr = Array.of(10);
    
    assert.deepEqual(arr, [10]);
  });
  
  it('puts all arguments into array elements', () => {
    const arr = Array.of(1, 2);
    // Polyfill:
    // const arrayOf = (...args) => [].slice.call(args);
    assert.deepEqual(arr, [1, 2]);
  });
  
  it('takes any kind and number of arguments', () => {
    const starter = [1, 2];
    const end = [3, '4'];
    const arr = Array.of(...starter, ...end);
    
    assert.deepEqual(arr, [1, 2, 3, '4']);
  });
  
});


```


### `[].fill()` (#31)

`[].fill` can fill up an array with one value.

Difficulty: tbd  

Links for futher reading

- [A discussion in a github issue, about how to use this kata.](https://github.com/tddbin/es6katas.org/issues/9)
- [API doc on MDN.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)

```js
// 31: array - `Array.prototype.fill` method
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!



// The fill method is a mutable method, it will change this object itself, and return it, not just return a copy of it.

describe('`Array.prototype.fill` can fill up an array with one value', () => {

  it('`fill(0)` will populate `0` into each array element', function() {
     const arr = new Array(3).fill(0);
    
    // This can't work
    // const arr = new Array(3).map( _ => 0 )
    // But this can work
    // const arr = [...Array(3)].map( _ => 0)
    // See:  https://stackoverflow.com/questions/5501581/javascript-new-arrayn-and-array-prototype-map-weirdness
    assert.deepEqual(arr, [0, 0, 0]);
  });

  it('fill only changes content, adds no new elements', function() {
    const arr = [undefined].fill(0);
    
    assert.deepEqual(arr, [0]);
  });

  it('second parameter to `fill()` is the position where to start filling', function() {
    const fillPosition = 2;
    const arr = [1,2,3].fill(42, fillPosition);
    
    assert.deepEqual(arr, [1, 2, 42]);
  });

  it('third parameter is the position where filling stops', function() {
    const fillStartAt = 1;
    const fillEndAt = 2;
    const arr = [1,2,3].fill(42, fillStartAt, fillEndAt);
    
    assert.deepEqual(arr, [1, 42, 3]);
  });
  
  // =================
  // More test cases inspired from MDN:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
  
  it('is a mutable method, and will change this object itself', function() {
    const arr = new Array(3);
    arr.fill(8);
    assert.deepEqual(arr, [8,8,8]);
  });
  
  it('when gets passed an object, it will copy the reference and fill the array with references to that object.', function(){
    const arr = Array(3).fill({});
    arr[0].hi = "hi"; 
    assert.deepEqual(arr[2].hi, 'hi');
  });

});
```


### `[].find()` (#32)

`[].find` makes finding items in arrays easier.

Difficulty: tbd

```js
// 32: array - `Array.prototype.find` 
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('`Array.prototype.find` makes finding items in arrays easier', () => {

  it('takes a compare function', function() {
    const found = [false, true].find( item => item === true);
    
    assert.equal(found, true);
  });

  it('returns the first value found', function() {
    const found = [0, 1, 2].find(item => item > 1);

    assert.equal(found, 2);
  });

  it('returns `undefined` when nothing was found', function() {
    const found = [1, 2, 3].find(item => item === 6);

    assert.equal(found, void 0);
  });

  it('combined with destructuring complex compares become short', function() {
    const bob = {name: 'Bob'};
    const alice = {name: 'Alice'};
    const found = [bob, alice].find(({name}) => name === 'Alice');
    
    assert.equal(found, alice);
  });

});

```


### `[].findIndex()` (#33)

`[].findIndex` makes finding items in arrays easier.

Difficulty: tbd

```js
// 33: array - `Array.prototype.findIndex` 
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('`Array.prototype.findIndex` makes finding items in arrays easier', () => {

  it('takes a compare function, returns the index where it returned true', function() {
    //// const foundAt = [false, true].findIndex(item);
    const foundAt = [false, true].findIndex(item => item === true);
    
    assert.equal(foundAt, 1);
  });

  it('returns the first position it was found at', function() {
    //// const foundAt = [0, 1, 1, 1].findIndex(item => item = 1);
    const foundAt = [0, 1, 1, 1].findIndex(item => item === 1);
    
    assert.equal(foundAt, 1);
  });

  it('returns `-1` when nothing was found', function() {
    //// const foundAt = [1, 2, 3].findIndex(item => item > 1);
    const foundAt = [1, 2, 3].findIndex(item => item < 1);
    
    assert.equal(foundAt, -1);
  });

  it('the findIndex callback gets the item, index and array as arguments', function() {
    const three = 3;
    const containsThree = arr => arr.indexOf(three) > -1;
    //// function theSecondThree(index, arr) {
    function theSecondThree(item, index, arr) {
      const preceedingItems = arr.slice(0, index);
      return containsThree(preceedingItems);
    }
    const foundAt = [1, 1, 2, 3, 3, 3].findIndex(theSecondThree);
    
    assert.equal(foundAt, 4);
  });

  it('combined with destructuring complex compares become short', function() {
    const bob = {name: 'Bob'};
    const alice = {name: 'Alice'};
    ////  const foundAt = [bob, alice].findIndex(({name:{length:l}}) => length > 3);
    const foundAt = [bob, alice].findIndex(({name:{length:l}}) => l > 3);
    // the above solution uses more deep/complex destructuring
    // We can also write like this, with high readibility
    // const foundAt = [bob, alice].findIndex(({name}) => name.length > 3);

    assert.equal(foundAt, 1);
  });

});
```


### `[].entries()` (#41)

`[].entries()` returns an iterator object with all entries.

Difficulty: intermediate

```js
// 41: array - entries
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('`[].entries()` returns an iterator object with all entries', function() {
  
  // Do not be confused with `Object.entries()` 
  
  it('returns key+value for each element', function() {
    const arr = ['a', 'b', 'c'];
    const entriesAsArray = Array.from(arr.entries());
    
    assert.deepEqual(entriesAsArray, [[0,"a"], [1,"b"], [2,"c"]]);
  });
  
  it('empty elements contain the value `undefined`', function() {
    const arr = ['one'];
    arr[2] = 'three';
    // It seems Iterator are not as convenient as Array :)
    const [_,secondValue] = Array.from(arr.entries());

    assert.deepEqual(secondValue, [1, void 0]);
  });

  describe('returns an iterable', function() {
    
    it('has `next()` to iterate', function() {
      const arr = ['one'];
      const value = arr.entries().next().value;
      
      assert.deepEqual(value, [0, 'one']);
    });
    
  });
});
```

### `[].keys()` (#42)

`[].keys()` returns an iterator for all keys in the array.

Difficulty: intermediate


```js
// 42: array - `Array.prototype.keys`
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('`Array.prototype.keys` returns an iterator for all keys in the array', () => {

  it('`keys()` returns an iterator', function() {
    const arr = ['a', 'b'];
    const iterator = arr.keys();
    
    assert.deepEqual(iterator.next(), {value: 0, done: false});
    // After a terminating value has been yielded 
    // additional calls to next() should simply continue to return {done: true}.
    assert.deepEqual(iterator.next(), {value: 1, done: false});
  });
  
  it('gets all keys', function() {
    //// const arr = ['a', 'b'];
    const arr = ['a', 'b', 'c'];
    const keys = Array.from(arr.keys());
    
    assert.deepEqual(keys, [0, 1, 2]);
  });
  
  it('empty array contains no keys', function() {
    //// const arr = ['empty me'];
    const arr = [];
    const keys = [...arr.keys()];
    
    assert.equal(keys.length, 0);
  });
  
  it('a sparse array without real values has keys though', function() {
    const arr = [,,];
    //// const keys = [...arr.___()];
    const keys = [...arr.keys()];

    assert.deepEqual(keys, [0, 1]);
  });

  it('also includes holes in sparse arrays', function() {
    const arr = ['a', , 'c'];
    //// const keys = arr.keys;
    const keys = [...arr.keys()];
    
    assert.deepEqual(keys, [0, 1, 2]);
  });
});

```


### `[].values()` (#43)

`[].values()` returns an iterator for all values in the array

Difficulty: intermediate


```js
// 43: array - `Array.prototype.values` 
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('`Array.prototype.values` returns an iterator for all values in the array', () => {

  it('`values()` returns an iterator', function() {
    // const arr = ['k', 'e', 'y'];
    const arr = [];
    const iterator = arr.values();
    
    assert.deepEqual(iterator.next(), {value: void 0, done: true});
  });
  
  it('use `iterator.next()` to drop first value', function() {
    const arr = ['keys', 'values', 'entries'];
    const iterator = arr.values();
    // iterator.___();
    iterator.next();

    assert.deepEqual([...iterator], ['values', 'entries']);
  });
  
  it('empty array contains no values', function() {
    // const arr = [...[...[...[...'1']]]];
    // What a trick!
    const arr = [...[...[...[...[]]]]];
    // const arr = [];
    const values = [...arr.values()];
    
    assert.equal(values.length, 0);
  });
  
  it('a sparse array without real values has values though', function() {
    // const arr = [, 0];
    
    // Tricky !
    const arr = [,,];
    const keys = [...arr.values()];
    
    assert.deepEqual(keys, [void 0, void 0]);
  });
  
  it('also includes holes in sparse arrays', function() {
    // const arr = ['a',];
    const arr = ['a',,'c'];

    assert.deepEqual([...arr.values()], ['a', void 0, 'c']);
  });
  
});
```


## Class

### creation (#22)

Create a class.

Difficulty: beginner

```js
// 22: class - creation
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('Class creation', () => {
  it('is as simple as `class XXX {}`', function() {
    //// let TestClass;
    let TestClass = class {};
    const instance = new TestClass();
    assert.equal(typeof instance, 'object');
  });
  it('a class is block scoped', () => {
    //// class Inside {}
    class Outside {}
    {class Inside {}}
    assert.equal(typeof Inside, 'undefined');
  });
  it('the `constructor` is a special method', function() {
    class User {     
      //// constructor(id) {}

      constructor(id) { this.id = id;   }
    }
    const user = new User(42);
    assert.equal(user.id, 42);
  });
  it('defining a method by writing it inside the class body', function() {
    class User {
      writesTests() { return false }
    }
    const notATester = new User();
    assert.equal(notATester.writesTests(), false);
  });
  it('multiple methods need no commas (opposed to object notation)', function() {
    class User {
      wroteATest() { this.everWroteATest = true; }
      //// isLazy() {  }
      isLazy() { return !this.everWroteATest }
    }
    const tester = new User();
    assert.equal(tester.isLazy(), true);
    tester.wroteATest();
    assert.equal(tester.isLazy(), false);
  });
  it('anonymous class', () => {
    //// const classType = typeof {};
    const classType = typeof class {};
    assert.equal(classType, 'function');
  });
});
```


### accessors (#23)

Getter+setters as class properties.

Difficulty: intermediate


```js
// 23: class - accessors
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('Class accessors (getter and setter)', () => {
  it('a getter is defined like a method prefixed with `get`', () => {
    class MyAccount {
      get balance() { return Infinity; }
    }
    assert.equal(new MyAccount().balance, Infinity);
  });
  it('a setter has the prefix `set`', () => {
    class MyAccount {
      get balance() { return this.amount; }
      set balance(amount) { this.amount = amount; }
    }
    const account = new MyAccount();
    account.balance = 23;
    assert.equal(account.balance, 23);
  });
  
  describe('dynamic accessors', () => {
    it('a dynamic getter name is enclosed in `[]`', function() {
      const balance = 'yourMoney';
      class YourAccount {
        get [balance]() { return -Infinity; }
      }
      assert.equal(new YourAccount().yourMoney, -Infinity);
    });
    it('a dynamic setter name as well', function() {
      const propertyName = 'balance';
      class MyAccount {
        get [propertyName]() { return this.amount; }
        //// set propertyName(amount) { this.amount = 23; }
        set [propertyName](amount) { this.amount = 23; }
      }
      const account = new MyAccount();
      account.balance = 42;
      assert.equal(account.balance, 23);
    });
  });
});

```

### static (#24)

Use of the static keyword inside a class.

Difficulty: beginner

```js
// 24: class - static keyword
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('Inside a class you can use the `static` keyword', () => {
  describe('for methods', () => {
    class UnitTest {}
    it('a static method just has the prefix `static`', () => {
      class TestFactory {
        //// makeTest() { return new UnitTest(); }
        static makeTest() { return new UnitTest(); }
      }
      assert.ok(TestFactory.makeTest() instanceof UnitTest);
    });
    it('the method name can be dynamic/computed at runtime', () => {
      const methodName = 'createTest';
      class TestFactory {
        static [methodName]() { return new UnitTest(); }
      }
      assert.ok(TestFactory.createTest() instanceof UnitTest);
    });
  });
  describe('for accessors', () => {
    it('a getter name can be static, just prefix it with `static`', () => {
      class UnitTest {
        static get testType() { return 'unit'; }
      }
      assert.equal(UnitTest.testType, 'unit');
    });
    it('even a static getter name can be dynamic/computed at runtime', () => {
      const type = 'test' + 'Type';
      class IntegrationTest {
        //// get type() { return 'integration'; }
        static get [type]() { return 'integration'; }
      }
      assert.ok('testType' in IntegrationTest);
      assert.equal(IntegrationTest.testType, 'integration');
    });
  });
});

```


### extends (#25)

How to do inheritance, using `extends`.

Difficulty: beginner

```js
// 25: class - extends
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('Classes can inherit from another using `extends`', () => {
  describe('the default super class is `Object`', () => {
    it('a `class A` is an instance of `Object`', () => {
      class A {}
      assert.equal(new A() instanceof Object, true);
    });
    it('when B extends A, B is also instance of `Object`', () => {
      class A {}
      class B extends A {}
      assert.equal(new B() instanceof A, true);
      assert.equal(new B() instanceof Object, true);
    });
    it('a class can extend `null`, and is not an instance of Object', () => {
      class NullClass extends null {}
      let nullInstance = new NullClass();
      assert.equal(nullInstance instanceof Object, false);
    });
  });
  describe('instance of', () => {
    it('when B inherits from A, `new B()` is also an instance of A', () => {
      class A {}
      class B extends A {}
      assert.equal(new B() instanceof A, true);
    });
    it('extend over multiple levels', () => {
      class A {}
      class B extends A {}
      class C extends B {}
      assert.equal(new C instanceof A, true)
    });
  });
});

```
### more extends (#26)

More in depth `extends` stuff

Difficulty: advanced


```js
// 26: class - more-extends
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('Classes can inherit from another', () => {
  it('extend an `old style` "class", a function, still works', () => {
    let A = function() {};
    class B extends A {}
    assert.equal(new B() instanceof A, true);
  });
  
  describe('prototypes are as you know them', () => {
    class A {}
    class B extends A {}
    it('A is the prototype of B', () => {
      const isIt = A.isPrototypeOf(B);
      assert.equal(isIt, true);
    });
    it('A`s prototype is also B`s prototype', () => {
      const proto = B.prototype;
      // Remember: don't touch the assert!!! :)
      assert.equal(A.prototype.isPrototypeOf(proto), true);
    });
  });

  describe('`extends` using an expression', () => {
    it('e.g. the inline assignment of the parent class', () => {
      let A;
      //// class B extends (A = {}) {}
      class B extends (A = class{}) {}
      assert.equal(new B() instanceof A, true);
    });
    it('or calling a function that returns the parent class', () => {
      const returnParent = (beNull) => beNull ? null : class {};
      //// class B extends returnParent {}
      class B extends returnParent('foo') {}
      assert.equal(Object.getPrototypeOf(B.prototype), null);
    });
  });
});
```

### super in method (#27)

Use of `super` inside a method.

Difficulty: intermediate

```js
// 27: class - super inside a method
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('Inside a class use `super` to access parent methods', () => {
  it('use of `super` without `extends` fails (already when transpiling)', () => {
    //// class A {hasSuper() { return super; }}
    class A {hasSuper() { return false; }}
    assert.equal(new A().hasSuper(), false);
  });
  it('`super` with `extends` calls the method of the given name of the parent class', () => {
    class A {hasSuper() { return true; }}
    class B extends A {hasSuper() { return super.hasSuper(); }}
    assert.equal(new B().hasSuper(), true);
  });
  it('when overridden a method does NOT automatically call its super method', () => {
    class A {hasSuper() { return true; }}
    class B extends A {hasSuper() { }}
    assert.equal(new B().hasSuper(), void 0);
  });
  it('`super` works across any number of levels of inheritance', () => {
    class A {iAmSuper() { return true; }}
    class B extends A {}
    class C extends B {iAmSuper() { return super.iAmSuper(); }}
    assert.equal(new C().iAmSuper(), true);
  });
  it('accessing an undefined member of the parent class returns `undefined`', () => {
    class A {}
    class B extends A {getMethod() { return super.foo; }}
    assert.equal(new B().getMethod(), void 0);
  });
});

```

### super in constructor (#28)
Use of `super` inside the constructor.

Difficulty: intermediate

```js
// 28: class - super in constructor
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('Inside a class`s constructor `super()` can be used', () => {
  it('`extend` a class and use `super()` to call the parent constructor', () => {
    class A {constructor() { this.levels = 1; }}
    class B extends A {
      constructor() {
        super();
        this.levels++;
      }
    }
    assert.equal(new B().levels, 2);
  });
  it('`super()` may also take params', () => {
    class A {constructor(startValue=1, addTo=1) { this.counter = startValue + addTo; }}
    class B extends A {
      constructor(...args) { 
        super(...args);
        this.counter++; 
      }
    }
    assert.equal(new B(42, 2).counter, 45);
  });
  it('it is important where you place your `super()` call!', () => {
    class A {inc() { this.countUp = 1; }}
    class B extends A {
      inc() {
        ////super.inc();
        this.countUp = 2;
        ////
        super.inc();
        return this.countUp;
      }
    }
    assert.equal(new B().inc(), 1);
  });
  it('use `super.constructor` to find out if there is a parent constructor', () => {
    class A {constructor() {"parent"}}
    class B extends A {
      constructor() {
        super();
        //// this.isTop = '' + super.konstructer;
        this.isTop = '' + super.constructor;
      }
    }
    assert.equal(new B().isTop, 'class A {constructor() {"parent"}}');
  });
});
```

## Destructuring 

### array (#10)

Destructuring arrays allows for more concise.

Difficulty: beginner

<https://github.com/tddbin/katas/blob/master/katas/es6/language/destructuring/array.js>

### string (#11)

Destructuring can also be done on strings.

Difficulty: beginner

<https://github.com/tddbin/katas/blob/master/katas/es6/language/destructuring/string.js>


### object (#12)

Destructuring objects is a core concepts for modules and more.

Difficulty: beginner

<https://github.com/tddbin/katas/blob/master/katas/es6/language/destructuring/object.js>


### defaults (#13)

When destructuring you can also use default values.

Difficulty: beginner

<https://github.com/tddbin/katas/blob/master/katas/es6/language/destructuring/defaults.js>


### parameters (#14)

Destructuring function parameters.

Difficulty: intermediate

<https://github.com/tddbin/katas/blob/master/katas/es6/language/destructuring/parameters.js>

### assign (#15)

Assign variables while destructuring.

Difficulty: intermediate

<https://github.com/tddbin/katas/blob/master/katas/es6/language/destructuring/rename.js>


## Generator

### creation (#49)

There are many ways to create a generator

Difficulty: tbd

Links for futher reading

- Describes the `function*` declaration: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*>

<https://github.com/tddbin/katas/blob/master/katas/es6/language/generator/creation.js>

### iterator (#50)
Generators return iterable objects

Difficulty: tbd

- <https://github.com/tddbin/katas/blob/master/katas/es6/language/generator/iterator.js>


### yield expressions (#51)

The yield keyword is used to pause and resume a generator function

Difficulty: tbd
Links for futher reading
- Describing the `yield` keyword: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield>

- <https://github.com/tddbin/katas/blob/master/katas/es6/language/generator/yield.js>

## Number

### `Number.isInteger()` (#55)

`Number.isInteger()` determines if a value is an integer.

Difficulty: beginner



