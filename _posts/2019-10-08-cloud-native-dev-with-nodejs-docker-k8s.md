---
layout: post
title: "Lynda.com: Cloud Native Development with Node.js, Docker, and Kubernetes"
categories: draft
---

* Author: [Chris Bailey](https://www.lynda.com/Chris-Bailey/1992561333-1.html)

* Updated: 7/15/2019 

* Duration: 1h 48m

* Skill Level: Intermediate 

* Course URL:  https://www.lynda.com/Node-js-tutorials/Cloud-Native-Development-Node-js-Docker-Kubernetes/808675-2.html

* Description: 

  >  While the vast majority of Node.js apps are deployed and run in the  cloud, few leverage all that modern cloud computing platforms have to  offer. If you're looking to take the next step in your cloud computing  journey, then this course is for you. Join Chris Bailey as he shows  developers how to go from merely hosting apps in the cloud to building  and deploying cloud native apps. Chris begins by providing an overview  of what it means to be cloud native and create Node.js apps that exploit  the cloud's features. He then steps through how to take an existing  Node.js app and package it with Docker, deploy the app to Kubernetes,  and enhance it with cloud native capabilities, including support for  self-healing and metrics. 
  >
  >  
  >
  >  Topics include: 						
  >
  >  - Using Node.js in the cloud
  >  - Creating a Node.js app
  >  - Building a production Dockerfile
  >  - Deploying an app to Kubernetes using Helm
  >  - Adding self-healing capabilities
  >  - Building custom charts and graphs 
  >  - Adding support for metrics and request tracking


## Table of Content
{:.no_toc}

* A markdown unordered list which will be replaced with the ToC, excluding the "Contents header" from above
{:toc}

## Introduction

### The power of cloud native

### What you should know

## 1. What Is Cloud Native?

### What does "cloud native" mean?

### Node.js in the cloud

### Cloud native Node.js

## 2. Creating the App

### Creating your Node.js app

### Add a Dockerfile

- dockerfile template: https://github.com/CloudNativeJS/docker

- install `brew` on `macOS`, and `brew install wget`

- cat `Dockerfile`
  - `FROM node:10`  (`cat /etc/os-release`: debian 9, `uname -r`:  the container shares the host kernel ), more at [GitHub: nodejs/docker-node](https://github.com/nodejs/docker-node/blob/master/README.md#image-variants)
  
  - ```bash
    node@d4cb68ddd497:/app$ cat /etc/os-release  
    PRETTY_NAME="Debian GNU/Linux 9 (stretch)"
    NAME="Debian GNU/Linux"
    VERSION_ID="9"
    VERSION="9 (stretch)"
    VERSION_CODENAME=stretch
    ID=debian
    HOME_URL="https://www.debian.org/"
    SUPPORT_URL="https://www.debian.org/support"
    BUG_REPORT_URL="https://bugs.debian.org/"
    
    node@d4cb68ddd497:/app$ uname -a
    Linux d4cb68ddd497 5.2.11-1-MANJARO #1 SMP PREEMPT Thu Aug 29 07:41:24 UTC 2019 x86_64 GNU/Linux
    node@d4cb68ddd497:/app$ uname -r
    5.2.11-1-MANJARO
    ```
  
  - `COPY package*.json ./` ; `RUN npm install --production`; `COPY . /app` : copy the source code as late as possible,   so that when running `docker  build` only the last few steps(layers) are executed
  
- add `.dockerignore`

- `docker build -t nodeserver -f Dockerfile .` with tag `nodeserver`

- `docker run -i -p 3000:3000 -t nodeserver` 
  
  - `-i, --interactive: Keep STDIN open even if not attached`
  - with port forwarding
  -  `-t, --tty: Allocate a pseudo-TTY`
  
- Run the image in the background and attach it with `bin/bash`

- ```bash
  # -d, --detach: Run container in background and print container ID
  # --rm  Automatically remove the container when it exits
  [jizu@jizu-manjora-vm ~]$ docker run --rm -d nodeserver 
  d4cb68ddd49736be577c4c0f7f3ae2d51734a15ea79500c32ad521f48830a204
  
  [jizu@jizu-manjora-vm ~]$ docker ps
  CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
  d4cb68ddd497        nodeserver          "docker-entrypoint.s…"   5 seconds ago       Up 3 seconds        3000/tcp            amazing_pascal
  
  [jizu@jizu-manjora-vm ~]$ docker exec -it amazing_pascal /bin/bash
  node@d4cb68ddd497:/app$ ps aux 
  USER        PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
  node          1  2.5  0.6 734156 42592 ?        Ssl  08:52   0:00 npm
  node         18  0.0  0.0   4280   712 ?        S    08:52   0:00 sh -c node ./bin/www
  node         19  0.7  0.6 565016 38288 ?        Sl   08:52   0:00 node ./bin/www
  node         26  5.7  0.0  18200  3240 pts/0    Ss   08:53   0:00 /bin/bash
  node         33  0.0  0.0  36632  2764 pts/0    R+   08:53   0:00 ps aux
  ```

### Build a dev and debug Dockerfile

- `Dockerfile-run`
- `Dockerfile-tools`, see https://github.com/CloudNativeJS/docker#using-dockerfile-tools
  - `ENV NODE_HEAPDUMP_OPTIONS nosignal`, see: https://github.com/RuntimeTools/appmetrics/issues/517
- `Dockerfile`: production use

### Build a production Dockerfile

### Tagging and version control

## 3. Deploying to Kubernetes

### Docker vs. Kubernetes

### Add a Helm chart

### Deploy to Kubernetes

### Deploy multiple instances

## 4. Adding Support for Health

### Liveness and readiness endpoints

### Add a liveness check

### Add a readiness check

### See it in Kubernetes

## 5. Add Support for Metrics

### Introduction to Prometheus

### Deploy Prometheus to Kubernetes

### Deploy Grafana to Kubernetes

### Build charts for your applications

## 6. Add Support for Request Tracking

### Introduction to OpenTracing

### Adding OpenTracing to the app

### Deploy OpenTracing to Kubernetes

## Conclusion

### Next steps