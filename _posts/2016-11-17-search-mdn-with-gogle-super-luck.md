---
layout: post
title:  "Search Mozilla Developer Network with Google Super Luck in Chrome"
categories: tweaks
---

Install [brookhong/Surfingkeys](https://github.com/brookhong/Surfingkeys) extension in your Chrome, then add the following snippet to your **Surfingkeys settings** (just hit ``se``) 
```
mapkey('gm', 'Google MDN with I\'m feeling luck', function(){
    var query = window.getSelection().toString() || response.data;
    var url = `https://www.google.com/search?q=${query}+site:developer.mozilla.org&btnI`
    tabOpenLink(url);
})
```
As it stands out, when hit ``gm`` after selecting a Javascript/CSS jargon, Chrome first visit Google with **I'm Feeling Luck** (indicated by ``&btnl`` URL query string), then directly jumped to the most relevant page on MDN(Mozilla Developer Network).

For example, if I select ``Object.defineProperty`` in a web page, then hit ``gm``, the browser will jump to <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty>

Also, as far as I'm concerned, **Surfingkeys** is more hackable than its equivalence, e.g., **cVim** or **Vimium**.

![output-final](https://cloud.githubusercontent.com/assets/4011348/20375470/49b4e3e2-acba-11e6-99fa-db90df127c56.gif)


Refs:
1. <http://www.alfredforum.com/topic/5927-force-im-feeling-lucky/>
2. <https://github.com/brookhong/Surfingkeys#search-selected-with>
3. <https://github.com/brookhong/Surfingkeys/blob/master/content_scripts/content_scripts.js#L242>

Notes: 
1. Gif screencast recorded by [edouard-lopez/record-gif.sh](https://github.com/edouard-lopez/record-gif.sh)