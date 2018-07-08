---
layout: post
title:  "Scripts for scrapping the course information on Lynda.com"
categories: drafts
---



```javascript

toc = [];

$$("ul.course-toc > li[role='presentation']").forEach(item => {
    const h2 = "## " + item.querySelector('h4.ga').innerHTML,
    	  h3 = [...item.querySelectorAll('a.ga.item-name.video-name')]
                   .map(item => '### ' + item.innerHTML.trim());
    toc = toc.concat([h2])
    toc = toc.concat(h3);
});

text = toc.join("\n\n")
console.log(text)
copy(text)

```