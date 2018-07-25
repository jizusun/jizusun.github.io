---
layout: post
title:  "Lynda.com: Python : Programming Efficiently"
categories: drafts
---


* Author: Michele Vallisneri
* Released: 2/8/2017
* Duration: 2h 15m
* Course URL: <https://www.lynda.com/Python-tutorials/Python-Programming-Efficiently/534425-2.html>

> Cut down on your development time by learning how to write elegant code in an efficient manner, specifically in Python—the popular and pragmatic object-oriented language. Michele Vallisneri explains how to make your Python code more expressive and concise, and leverage the most powerful features of the language. He shines a spotlight on some of the strongest third-party packages you can take advantage of, discusses object-oriented and functional programming, and shares strategies for improving the performance of your code. Michele illustrates these concepts with many intriguing examples, showing how to make 3D images and videos using photographs taken by a NASA rover on Mars, map the rover's progress through Martian topography, draw and paint fractals, and more.

> Topics include:
> * Designing efficient loops
> * Exploiting Python collections
> * Writing Pythonic code
> * Choosing the best libraries for your tasks
> * Downloading webpages with requests
> * Parsing HTML with Beautiful Soup
> * Manipulating images with Pillow
> * Making videos and drawing on maps with matplotlib
> * Serving webpages with Jinja2 and Flask
> * Working with Python classes
> * Taking advantage of functional techniques
> * Profiling CPU and memory use
> * Exploiting parallelism

## 1. Installation and Setup
### 1.1 Install Anaconda Python distribution
* Required Packages: `numpy, matplotlib, ipython, jupyter notebook, requests, bs4, pillow, flask, basemap, geopy, line_profiler, memory_profiler`
* `conda install -c conda-forge basemap`
* `conda install -c conda-forge line_profiler | pip install geopy memory_profiler`
### 1.2 Jupyter notebooks

## 2. Writing Python Efficiently

### 2.3 Design efficient loops
#### Learning Objectives
* Understanding Python iterators
* Parsing a file line  by line
* Understanding derived iterators (range, enumerate, zip, and reversed)
* Exploiting the power of itertools

#### Mastering Python loops
* Iterator: Objects that defines `__next()`

```python
import math, json, collections, itertools
import numpy as np
import matplotlib.pyplot as pp
%matplotlib inline
from mpl_toolkits.basemap import Basemap
import geopy

# Melbourne / Stockholm (1956)
for game in open("games.txt"):
    words = game.split()
    city = ' '.join(words[:-1])
    year = words[-1].strip('()')
    print(city, year)

# Geopy , Nominatim
geolocator = geopy.geocoders.Nominatim()
location = {}
for city in cities:
    print("Locating", city)
    locations[city] = geolocator.geocode(city.split('/')[0])
# fix the geolation
locations['Rome'] = geolocator.geocode('Rome, Italy')
locations['Athens'] = geolocator.geocode('Athens, Greece')
# http://www.matplotlib.org/basemap
pp.figure((figsize=(10,5))
world = Basemap()
world.drawcoastlines(linewidth=0.25)
world.drawcountries(linewidth=0.25)
for city, pos in locations.items():
    world.plot(pos.longtitude, pos.latitude, 'r.', markersize=10, latlon=True)
# enumerate
for i, city in emumerate(cities[:10]):
    print(i, city)
# zip
for year, city in zip(years[:10],cities):
    print(year, city)
```

* Useful Iterators in Itertools
1. Concatenate: `itertools.chain(iter1, iter2)`
2. Duplicate: `i1, i2 = itertools.tee(iter, 2)`
3. Running sum: `itertools.accumulate(iter)`
4. Element-by-element product: `itertools.product(iter1, iter2)`
5. Permutations: `itertools.permutations(string)`
6. Combinations: `itertools.combinations(string)`

### 2.4 Comprehensions and generators

#### Learning Objectives
* Writing list, dist, and set comprehensions
* Use Python generator expressions
* Designing Python generators
#### List/Set comprehension
```python
# Using loop
results = []
for city, year in zip(cities, years):
    if int(year) > 1945:
        results.append(city + ': ' + year)
# f(element) for element in iterator if condition(element)
results = [city + ': ' + year for city, year in zip(cities, years) if int(year) > 1945]
# make python dict
cities_by_year = {year: city for city, year in zip(cities, years)
# set comprehension
cities_after_1930 = {city for year,city in cities_by_year.items() if int(year) > 1930 }
```


### 2.5 Exploit Python Collecitons


