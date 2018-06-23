---
layout: post
title:  "SAP UI5: Tutorials"
categories: readings
---

# Table of Content
{:.no_toc}

* A markdown unordered list which will be replaced with the ToC, excluding the "Contents header" from above
{:toc}


## Get started: Setup and Tutorials

### Development Environment

### Hello World

### Walkthrough

### Troubleshooting

### Data Binding

### OData V4

### Navigation and Routing

[Visit the docs](http://veui5infra.dhcp.wdf.sap.corp:8080/sapui5-sdk-dist/#/topic/1b6dcd39a6a74f528b27ddb22f15af0d)

[Visit the samples (sap.ui.core.tutorial.navigation)](http://veui5infra.dhcp.wdf.sap.corp:8080/sapui5-sdk-dist/#/entity/sap.ui.core.tutorial.navigation)

[Visit the sample code (openui5/src/sap.ui.core/test/sap/ui/core/demokit/tutorial/navigation/)](https://github.com/SAP/openui5/tree/master/src/sap.ui.core/test/sap/ui/core/demokit/tutorial/navigation)

- The navigation is persisted in the hash instead of the server path or URL parameters
- Routes:
    + `employees/{employeeId}`: Employee Details
    + `employees`: Employee List 
    + `(empty pattern)`: Home
    + `employee/overview:?query`: Employee Overview
    + `(bypassed)`: NotFound
    + `employees/{employeeId}/resume:?query`: Employee Resume
- Configuration via the descriptor file `manifest.json` requires UI5 v1.30+

#### Step 1. Set Up the Initial App

- Home Page: `index.html` bootstraps the UI5, the location for our custom resources, initialize the `MockServer`, finally we initiated our component with `ComponentContainer`, assign it to a `Shell`, and place the shell into the body
- Data: two oData entities
    + `Employees`: navigation property to a resume referenced by a `ResumeID`
    + `Resumes`:  
- Configuration of the App, in the `webapp/manifest.json` descriptor file
    + `sap.app`: `i18n`, `title`, `description`, `dataSources.uri` corresponds with `rootUri` in our `MockServer`, `dataSources.settings.localUri` is the path of local `metadata.xml`
    + `sap.ui5`:  `rootView` , `models` to define two models `i18n` and a default model ""

#### Step 2. Enable Routing
#### Step 3. Catch Invalid Hashes
#### Step 4. Add a Back Button to Not Found Page
#### Step 5. Display a Target Without Changing the Hash
#### Step 6. Navigate to Routes with Hard-Coded Patterns
#### Step 7. Navigate to Routes with Mandatory Parameters
#### Step 8. Navigate with Flip Transition
#### Step 9. Allow Bookmarkable Tabs with Optional Query Parameters
#### Step 10. Implement Lazy Loading
#### Step 11. Assign Multiple Targets
#### Step 12. Make a Search Bookmarkable
#### Step 13. Make Table Sorting Bookmarkable
#### Step 14. Make Dialogs Bookmarkable
#### Step 15. Reuse an Existing Route
#### Step 16. Handle Invalid Hashes by Listening to Bypassed Events
#### Step 17. Listen to Matched Event of Any Route