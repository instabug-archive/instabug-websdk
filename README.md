# Instabug web SDK 1.2.1-beta

## Overview
Instabug web sdk is a javascript library provides an easy way to report bugs from your website or webapp.

To use the sdk you need to have `application_token`, you  can get it from your [Instabug Dashboard](https://dashboard.instabug.com)

## Installation
### Requirements
Instabug Web SDK requires no special requirements, and has no dependecies on other liberaries or frameworks, and has been tested in all modern browsers with `LocalStorage` capability

#### Manual Installation
You can include instabug web sdk to your website just copy the below lines into the end of your page `<body>` tag
```html
<script src='https://s3.amazonaws.com/instabug-pro/sdk_releases/instabugsdk-1.2.1.min.js'></script>
```
#### `bower` installation (recommended)
You can install the SDK using
```shell
bower install instabug-sdk --save
```
#### `npm` installation
You can install the SDK using
```shell
npm install instabug-sdk --save
```
### Initialize the SDK
After including the sdk js file, you can start it by invoke the `.init()` method and pass the application token as parameter
```html
<script>
  ibgSdk.init({
     token: <INSTABUG_APP_TOKEN>
  });
</script>
```

### API Refrence

#### `.init(options)`
the init function is used to used to initialize the SDK and render the report bug button.
##### Parameters
**options**: `Object` _required_ -  pass the application `token`

#### `.disable()`
used to hide the report bug button

#### `.enable()`
used to show the report bug button

#### `.invoke()`
show the report bug view without clicking on the `report bug` button,

You can use this function to start the reporting bug process programmatically from your own script,
By run `ibgSdk.invoke()` after initialize the sdk

#### `.dismiss()`
cancel annotations and close all instabug sdk windows
