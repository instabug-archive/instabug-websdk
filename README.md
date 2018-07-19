# Instabug Web SDK 1.0 

## Overview
[Instabug](https://instabug.com) web SDK is an open-source javascript library that provides an easy way to report bugs from your website with all the details to help you reproduce and fix the bugs faster. 

**This library is built with love by Instabug's team as a free tool to help developers build better websites and is not part of any of Instabug's current subscription plans.**

## Requirements
To start using Instabug, you need to have an account on the following tools:
* [Zapier](https://zapier.com): to receive your bug reports on a variety of tools: email, Jira, Tello, Slack, etc. 
* [Cloudinary](https://cloudinary.com): to host the screenshots included in the bug reports online. 

## Installation Steps
To include Instabug Web SDK in your web app, follow the steps below: 

1. Clone the SDK repository. 
```
git clone https://github.com/Instabug/instabug-websdk.git
```
2. Navigate to the cloned folder. 
```
cd instabug-websdk
```
3. Install the SDK. 
```
yarn install
```
4. Build the SDK. 
```
yarn build
```
5. Last, include the SDK file located in `build/instabug-sdk.min.js` into your index page body. 

## Initialization Steps
Now that you included the JS file, you can start using the SDK.  Below is the initialization method and its parameters: 
 ```html
<script>
  ibgSdk.init({
    zapierWebhookUrl: 'ZAPIER_WEBHOOK_URL',
    cloudinaryCloudName: 'CLOUDINARY_CLOUND_NAME',
    cloudinaryUploadPreset: 'CLOUDINARY_UPLOAD_PRESET',
  });
</script>
```

## API Reference

### `.init(options)`
This function initializes the SDK. When called, the Instabug button should become visible in your UI. 
#### Parameters
**options**: `Object` _required_ .
- `zapierWebhookUrl`: webhook url you get from Zapier while creating a Zap. More details are mentioned here.
- `cloudinaryCloudName`: cloudinary cloud name, you can find it on your Cloudinary dashboard. More details are mentioned here. 
- `cloudinaryUploadPreset`: cloudinary upload preset, you can find it on your Cloudinary dashboard. More details are mentioned here. 

### `.disable()`
Call this function to hide the Instabug button that invokes the bug reporting UI. 

### `.enable()`
Call this function to show the Instabug button that invokes the bug reporting UI. 

### `.invoke()`
Call this function to invoke the bug reporting UI manually from your code independently from the default Instabug button. 

### `.dismiss()`
Call this function to dismiss and close all the SDK windows.

## Cloudinary Guide
Start by creating an account on [Cloudinary](https://cloudinary.com). Then, you will need to fetch your **cloud name** and **upload preset name** as explained below. 

1. Find your **cloud name** on your dashboard to use it in te init function. 
![alt text](https://files.readme.io/58b3f8e-Cloudinary1.png)
2. Navigate to the *Settings* page, and open the *Upload* tab. 
![alt text](https://files.readme.io/ea87be3-Cloudinary2.png)
3. Scroll down to the *Upload Presets* section and click on *Add upload preset*.
![alt text](https://files.readme.io/70368bf-Cloudinary3.png)
4. The **upload preset name** will be generated to use in the init function.  
![alt text](https://files.readme.io/70368bf-Cloudinary3.png)


