---
layout: post
title: "Lynda.com: Docker: Continuous Delivery"
categories: draft
---

* Author: [Arthur Ulfeldt](https://www.lynda.com/Arthur-Ulfeldt/4456007-1.html)

* Updated: 5/15/2019 

* Duration: 2h 12m

* Skill Level: Intermediate 

* Course URL:  https://www.lynda.com/Docker-tutorials/Docker-Continuous-Delivery/672474-2.html

* Description: 

  >  Continuous integration and continuous deployment (CI/CD) allow developers to work more collaboratively and catch bugs earlier in the development lifecycle. Docker—a leading software container platform—can greatly simplify continuous deployment by allowing for safer, more reliable deployment and testing environments. In this course, join Arthur Ulfeldt as he explains how to use Docker to build deployment systems. Arthur steps through how to build your CI/CD toolbox, including how to build a minimal Jenkins installation and build Docker images for CI. He also covers essential continuous deployment and integration concepts; shows how to build a simple example of continuous deployment with Docker; discusses integration testing; and more.
  >
  > Topics include:
  >
  > - How Docker can greatly simplify continuous deployment
  > - Building your CI/CD toolbox
  > - Continuous deployment using hosted Docker
  > - Deploying to AWS with Jenkins
  > - Goals and expectations for integration testing
  > - Creating an integration test job


## Table of Content
{:.no_toc}

* A markdown unordered list which will be replaced with the ToC, excluding the "Contents header" from above
{:toc}
## Introduction

### Welcome

### What you should know

### Exercise files

## 1. Continuous Delivery

### Continuous delivery with Docker

### Use Docker to build a composable architecture

### Common Docker CI/CD tools

## 2. Build Your CI/CD Toolbox

### Jenkins overview

- Install Jenkins on AWS EC2

- ```bash
  sudo usermod -a -G docker ec2-user
  sudo usermod -a -G jenkins ec-user
  sudo reboot
  ssh -i ~/.ssh/amazon-key.pem ec2-user@ec2-ip.compute-1.amazonaws.com
  docker run hello-world
  sudo -u jenkins docker run hello-world
  ```

### Set up a Docker registry

- Connects all steps  of Pipeline

- Choosing a Host

  - Traditional host with local storage
  - Existing service such as Nexus
  - Amazon Elastic Container Registry
  - Docker Hub

- Amazon ECR(Elastic Container Registry)

  - Service => IAM Management Console => Roles
  - Create `AmazonEC2ContainerRegistryPowerUser`, Attach/Replace IAM Roles
  - AWS ECS: Create Repository `hello-world`

- Jenkins Job Build Configuration
  - ```bash
    docker run hello-world
    # aws
    aws ecr get-login --no-include-email --region us-east-1 > ./login
    source ./login
    # docker 
docker tag hello-world:latest 08978789.dkr.us-east-1.amazon.com/hello-world:latest
    docker push 08978789.dkr.us-east-1.amazon.com/hello-world:latest
    ```
    

### Build Docker images for CI



### Make a build job

## 3. Deployment

### Overview of deployment

### Build a first deployment job

### DNS-based deployment

### Continuous deployment using hosted Docker

### Deploy to AWS with Jenkins

### Automated testing using Docker and AWS

### Monitoring and reverting

## 4. Integration Testing

### Goals and expectations for integration testing

### Create an integration test job

### Wire up an integration test job

### Deploy an integration test job

### Set up a Jenkins pipeline

### Security concerns

## Conclusion

### Next steps