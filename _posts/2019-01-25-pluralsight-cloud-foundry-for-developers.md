---
layout: post
title: "PluralSight: Cloud Foundry for Developers"
categories: drafts
---

<https://app.pluralsight.com/library/courses/cloud-foundry-developers/table-of-contents>

> Cloud Foundry is a popular and powerful open-source Platform-as-a-Service for modern web applications. This course describes the best practices for designing PaaS applications, and walks through the deployment and management of a multi-tier web application.

## Table of Content
{:.no_toc}

* A markdown unordered list which will be replaced with the ToC, excluding the "Contents header" from above
{:toc}


## PaaS and Cloud Foundry Introduction

### Introduction

### Cloud Application Delivery Models

### Why Platform-as-a-Service Matters
- The new "middleware for the cloud era"
- Application-centric
- Faster time to market
- DevOps-friendly
- Different (language) runtimes, same policies

### Deploy an Application
- Install Node.js
- Install Cloud Foundry CLI
- Sign up for free Pivotal.io account
- Push applications

### DEMO: Deploy an Application
- Pivotal Web Services: <http://run.pivotal.io>
- `cf login https://api.run.pivotal.io`
- `manifest.yml`
- `cf push`

### Designing for PaaS
Twelve Factor App: http://12factor.net
- Code is Version Controlled
- Dependencies are Declared and Isolated
- Configuration is Stored in the Environment
- Backing Services as Attached Resources
- Build and Run stages are Separated
    - Build may be complex, started by devs
    - Run is simple and completed unattached
- Application Executed as Stateless Processes
    - Avoid sticky sessions
- Services are Exported via Port Binding
- Application Scaled Out via Process Model
- Processes are Disposable


### Designing for PaaS - Additional Considerations
- Rely on asynchronous messaging, using queueing
- Compose applications out of services
- Access portability requirements （move from `dev` to `prod` or move from one PaaS to another）

### PaaS Anti-patterns
- Relying on the local file system
- Building services that scale **up** (PaaS typically meant to scale **out** more and more instances)
- Manually coordinating builds
- Hard-coding configurations
- Cramming everything into one app (monolithic app)

### About Cloud Foundry
> An open-source Platform-as-a-Service for running orchestrated polyglot applications in an public or private environment

### Cloud Foundry Architecture

Also see:
- https://docs.cloudfoundry.org/concepts/diego/dea-vs-diego.html
- https://docs.cloudfoundry.org/concepts/diego/diego-architecture.html

![cf-arch](https://user-images.githubusercontent.com/4011348/51781893-66fada80-215a-11e9-80b8-c6d66cb4d64d.png)


### Cloud Foundry Security

### Cloud Foundry and Containers

- `Warden` with Linux container technology
- Getting integrated into next-gen of Cloud Foundry

### Cloud Foundry Community

### Course Objectives

### Reference Architecture for This Course

### Summary

## Deploying and Managing Applications (Part I)

### Introduction

- Accessing Cloud Foundry Spaces
- About Application Services
- Deploying and Exploring Applications
- Scaling and Updating Applications
- Troubleshooting Applications

### Understanding Orgs, Roles, Spaces, and Permissions

- an `org` has a default `space`
- a `user` can have multiple `role`s

### How Roles Work

### Logging into Your Space (CLI)

### DEMO: Logging into Your Space (CLI)
```sh
cf api https://api.run.pivotal.io
cf login
cf spaces: dev, testing
cf space dev
```

### Logging into Your Space (UI)

### DEMO: Logging into Your Space (UI)

### About Application Services
- Connecting all services as attached resources not assuming they're local
- On-demand resources = service instances
    - **Managed** Service Instances (integrated with CF via the `servicebroker`)
    - **User Provided** Service Instances
- Multiple deployment options (binding services to apps)

### Creating a Service Instance
- `cf marketplace`

```
service               plans                                              description                                                                                                                                                                          broker
mongodb               v3.0-small, v3.0-medium, v3.4-small, v3.4-medium   Store JSON-like documents in a document-oriented database.                                                                                                                           service-fabrik-broker
redis                 v3.0-small, v3.0-medium                            Use Redis to store data structures, in-memory.                                                                                                                                       service-fabrik-broker
xsuaa                 application, broker                                Manage application authorizations and trust to identity providers.                                                                                                                   xsuaa
application-logs      lite                                               Create, store, access, and analyze application logs.                                                                                                                                 sleeve-broker
connectivity          lite                                               Establishes a secure and reliable connectivity between cloud applications and on-premise systems.                                                                                    connectivity
jobscheduler          lite                                               Allows you to define and manage your jobs that run on one-time or recurring schedules                                                                                                jobscheduler-broker
auditlog              standard                                           Broker for Audit Log Service.                                                                                                                                                        auditlog
metering              standard                                           Resource consumption service based on cf-abacus                                                                                                                                      abacus-broker
feature-flags         lite                                               Feature Flags service for controlling feature rollout                                                                                                                                feature-flags-broker
destination           lite                                               Provides a secure and reliable access to destination configurations                                                                                                                  destination-service-broker
saas-registry         application, service                               Service for application providers to register multitenant applications and services                                                                                                  saas-registry
html5-apps-repo       app-runtime                                        Enables storage of HTML5 applications and provides runtime environment for HTML5 applications.                                                                                       html5-apps-repo-sb
lps-service           service                                            Service for integrating with LPS Service                                                                                                                                             saas-registry
credstore             small                                              Secure repository for credentials, cryptographic keys and certificates.                                                                                                              credstore
auditlog-api          default                                            Auditlog API                                                                                                                                                                         auditlog-api
auditlog-management   default                                            Auditlog Management - Retrieve logs and change retention                                                                                                                             auditlog-management-broker
metering-service      default                                            Metering-as a Service on SAP Cloud platform enables services to meter their usage information, so it can be used later for commercial purposes like billing or license compliance.   metering-broker

TIP: Use 'cf marketplace -s SERVICE' to view descriptions of individual plans of a given service.
```
- `cf create-service mongolab sandbox mymongo`
- `cf services`

### DEMO: Creating a Service Instance

### Deploying and Exploring Applications

### Creating YAML Manifests
- Describe push activities
- Looks locally for `manifest.yml`
- Required and optional parameters

### Exploring Manifests
```yaml
---
# comment in a manifest
Applications:
    - name: donationwebsite
    # buildpack: http://github.com/heroku/heroku-buildpack-play.git
    # stack: windows2012
    # domain: donation.com
    # host: manage
    # command: node app.js
    # instances: 3
    # memory: 512M
    # path: ./web/
    # timeout: 60
```

### Creating a YML Manifest

### DEMO: Creating a YAML Manifest
```yaml
---
applications:
- name: psdonationwebservice
  memory: 128MB
  instances: 1
  command: node ./bin/www
services:
- mymongo
```

### What Happens During Deployment?
- Cloud controller creates record
- Cloud controller stores metadata
- Cloud controller stores app files
- App start command issued
- Cloud controller chooses staging DEA
- Staging DEA stages and streams
- Staging DEA caches package
- Cloud Controller chooses runtime DEA

### Deploying Applications via the CLI
- `cf push <appname> -i 2`: overrides `manifest.yml`, meaning two instances

### Finish Environment Buildout
- Install Ruby
- Install MongoDB
- Install MongoVue
- Install Fiddler
- Test application locally

### DEMO: Finish Environment Buildout
- Start MongoDB
```
cd "c:\Program Files"
cd "MongoDB 2.6 Standard"
md \data\db
cd bin
mongod
```
- Fiddler Web Debugger

## Deploying and Managing Applications (Part II)

### Deploying Applications via CLI

### DEMO: Deploying Applications via CLI

- ??? `uploading droplet`
- Rails application <==> Node.js Web Service <==> MongoDB

### Exploring Running Applications

- Org quotas
- Events and logs
- App health and allocation


### Scaling and Updating Applications

- Scaling Up and Down
    - Change disk or memory
    - Affects all instances
- Scaling In and Out 
    - Create and destroy instances
    - Auto load balanced
    - No built-in auto scale

### Scaling Application Commands

```sh
cf scale <appname> -m 512M
```

### Scaling Applications

### DEMO: Scalin g Applications
```sh 
cf apps
cf app <appname>
cf scale <appname> -i 3 #instance 3
```

### Deploying Updated Applications
- App instances **automatically stopped** then started after doing `cf push`
```
cf files <appname>
```

### DEMO: Deploying Updated Applications

### Troubleshooting Applications
- Application deployment fails
- Application won't start
- Tracking unexpected consumption
- Application crashes

### Using Logs
- Types of logs
- View log file list
- View individual log files
- Dump log in the CLI

### DEMO: Using Logs
- View log list
- Dump logs to CLI
- Filter logs
```
cf logs <appname> --recent
cf events <appname>
```
### Summary

## Cloud Foundry Advanced Topics

### Introduction
- Using environment variables
- Background applications
- Perform No-Downtime Updates
- Application Crash and Recovery

### (Updated) Reference Architecture for This Course
![image](https://user-images.githubusercontent.com/4011348/51963021-13abc380-249d-11e9-937b-e88ca5190699.png)


### Using Environment Variables
- How runtime communicates with app
- Set by system or user

### Retrieving and Setting Environment Variables
```sh
cf env <appname>
cf set-env <appname> <variable_name> <variable_value>
```

manifest.yml

```yml
env:
    NODE_ENV: production
    TRACING: OFF
```

### DEMO: Retrieving and Setting Environment Variables
- AWS SQS (Queue) and put access tokens as environment variables in `manifest.yml`

### Background Applications
- Promote asynchronous processing
- Offload work
- Separate scalable tier
- More responsive applications

### Building and Deploying Background Apps
-  Design instantiation mechanism
    - Polling
    - Event-driven
- Test locally
- Add to manifest 
    - Use `--no-route` attribute
- Test in Cloud Foundry
- Agenda
    - Create SQS Queue
    - Inspect background app code
    - Update manifest
    - Push background app
    - Push changes to services app
    - Test new architecture

### DEMO: Building and Deploying Background Apps
- Exercise file: `Mod3/before/DonationPoller`
- `cf push` with `no-route: true` would make it a worker  

### Performing No-downtime Updates
- Standard
    - Application offline during update
    - Roll-forward on failure
    - Simpler
    - More disruptive
- Blue-Green    
    - Dual environment
    - Roll-back on failure
    - More complex
    - No disruption

### Blue-green Deployment Architecture
- Make a change to our application
- Deploy to a secondary container
- Swap routes

### DEMO: Blue-green Deployment

### Application Crash and Recovery

### DEMO: Application Crash Recovery

### Summary

