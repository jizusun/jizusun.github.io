---
layout: post
title:  "Lynda.com: Google Cloud Platform Essential Training"
categories: drafts
---

* Author: [Lynn Langit](https://www.lynda.com/Lynn-Langit/3308983-1.html)
* Released: 3/20/2017 
* Duration: 3h 56m
* Skill Level: Intermediate
* Course URL: <https://www.lynda.com/Google-Cloud-Platform-tutorials/Google-Cloud-Platform-Essential-Training/540539-2.html>

> Which of the cloud computing, storage, database, and networking services of the Google Cloud Platform fits your business requirements? IT professionals—including architects, network admins, and technology stakeholders—can discover the offerings of this leading cloud platform and learn how to use Google Cloud Console and other tools in this course. Lynn Langit shows how to work with virtual machines, Docker containers, relational data stores, NoSQL data, BigQuery, and more. Lynn shares practical tips for saving money, planning deployments, and exploring compatible integration options. She also explains how services work together in common implementation scenarios and architectural patterns.

> Topics include:
> - Google Cloud Platform benefits
> - Compute services
> - Database and storage services
> - Data pipeline services
> - Machine learning and visualization
> - Networking and developer tools
> - Implementation solutions
> - Architecture optio

```javascript

toc = [];

level_1 = $$("ul.course-toc > li[role='presentation']").map(item => {
    let h2 = "## " + item.querySelector('h4.ga').innerHTML;
    toc = toc.concat([h2])
    let h3 = [...item.querySelectorAll('a.ga.item-name.video-name')]
                   .map(item => '### ' + item.innerHTML.trim());
    toc = toc.concat(h3);
});

text = toc.join("\n\n")
console.log(text)
copy(text)

```


## Table of Content
{:.no_toc}

* A markdown unordered list which will be replaced with the ToC, excluding the "Contents header" from above
{:toc}


## Introduction

### Welcome

### What you should know

### A note about working with cloud services

## 1. What Is the Google Cloud Platform?

### Cloud and compute services

### Storage and data services

### Big data services

### Other services

## 2. Why Use the Google Cloud?

### Save time and money with cloud services

### Explore Google's autoscaling and infrastructure

### Understand Google's compliance options

### Get to know the personality of the Google Cloud Platform

### Find helpful tools and libraries

## 3. Getting Started with the Google Cloud

### Set up your account

### Navigate to the GCP console

### Work with location and projects

### Understand Google Cloud Billing

### Use APIs

### Use Google Cloud security:  IAM

### About gcloud

### Set up command-line access with gcloud

### Use walk-throughs and tutorials

### Compare GCP to AWS

## 4. Using Google Compute Services

### Understand Compute Service options

### Use Google Compute Engine (GCE)

### Use Cloud Launcher to set up an Eclipse Che IDE

### Use GCE resources

### Use Container Engine: GKE

### Use Container Engine/GKE and Kubernetes, part 1

### Use Container Engine/GKE and Kubernetes,  part 2

### Use Google App Engine

### Understand Google Cloud functions

### Understand Google Compute Services

## 5. Using Google Database and Storage Services

### Understand storage and database options

### Use Google Cloud Storage

### Use the Google Cloud Storage JSON API

### Use Google Cloud SQL

### Use Google Cloud Datastore

### Use Google Cloud Bigtable

### Use Google BigQuery

### Compare Bigtable to BigQuery

### Understand Google Cloud Storage services

## 6. Using Google Data Pipeline Services

### Understand data pipelines

### Use Google Pub/Sub

### Use Google Dataproc

### Use Google Dataflow

### Use the Google Genomics API

### Understand Google Data Pipeline services

## 7. Using Google Machine Learning and Visualization

### Understand Google Machine Learning and Viz

### Use the Cloud Vision API

### Use the Google Cloud Datalab

### Use Datalab examples

### Summarizing Machine Learning and Viz

## 8. Using Networking and Developer Tools

### Understand networking and developer tools

### Use Google Cloud networking services

### Use Stackdriver Monitoring

### Understand source code repositories

### Summary of networking and developer tools

## 9. Implementing Solutions: Architectures and Practices

### Use reference architectures

### Disaster recovery architecture

### Web/API application architectures

### Big data and data warehouse

### Internet of Things

### Bioinformatics

### Review your launch checklist

### Explore some other resources

## Conclusion

### Next steps