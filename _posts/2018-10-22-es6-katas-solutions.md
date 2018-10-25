---
layout: post
title:  "ES6 Katas: My Solutions & Annotations"
categories: drafts
---

ES6 Katas: Learn ES6 by doing it. Fix failing tests. Keep all learnings.
- <http://es6katas.org/> 
- source of this site: <https://github.com/tddbin/es6katas.org>
- all Katas: <https://github.com/tddbin/katas>

Rich Text to Markdown converter: <http://markitdown.medusis.com/>


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
      
      assert.deepEqual(arr, ['0=one', '1=two']);
    });
  });
  
});
```