# Instabug Web SDK 1.0

**This library is built with love by Instabug's team as a free tool to help developers build better websites and is not part of any of Instabug's current subscription plans.**

# Overview
[Instabug](https://instabug.com) web SDK is an open-source javascript library that provides an easy way to report bugs from your website with all the details to help you reproduce and fix the bugs faster.

Your users and testers can attach a screenshot with annotations to highlight the issue, a description of the bug they spotted and their email. In addition, more details are automatically captured:
* Device
* OS
* Current view
* Locale
* Session duration
* Screen size
* Density
* Locale storage
* Console logs

## Requirements
To start using Instabug, you need to have an account on the following tools:
* [Zapier](https://zapier.com): to receive your bug reports on a variety of tools: email, Jira, Tello, Slack, etc.
* [Cloudinary](https://cloudinary.com): to host the screenshots included in the bug reports online.


Node engine compatibility:
* we're using eslint@5.x.x module which requires node engine versions 6.14.0 or 8.10.0 or >= 9.10.0.

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
3. Install the dependencies.
```
yarn install
```
4. Build the SDK.
```
yarn build
```
5. Last, include the SDK file located in `build/instabug-sdk.min.js` into your index page body.
```
<script src="/PATH/TO/instabug-sdk.min.js"></script>
```

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
- `zapierWebhookUrl`: webhook url you get from Zapier while creating a Zap. More details are mentioned [here](#zapier-guide).
- `cloudinaryCloudName`: cloudinary cloud name, you can find it on your Cloudinary dashboard. More details are mentioned [here](#cloudinary-guide).
- `cloudinaryUploadPreset`: cloudinary upload preset, you can find it on your Cloudinary dashboard. More details are mentioned [here](#cloudinary-guide).

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
3. Scroll down to the *Upload Presets* section, click on *Enable Unsigned Uploading*, then, click on *Add upload preset*.
![alt text](https://files.readme.io/70368bf-Cloudinary3.png)
4. The **upload preset name** will be generated to use in the init function.
![alt text](https://files.readme.io/732fbdd-Cloudinary4.png)

## Zapier Guide
Create an account on [Zapier](https://zapier.com) to automatically forward your bug reports to the tool you prefer. You can find below the steps to create a new Zap.
1. Select **Webhooks** to be your trigger app.
![alt text](https://files.readme.io/6253938-Zapier1.png)
2. Choose **Catch Hook** as your trigger.
![alt text](https://files.readme.io/ed2b766-Zapier2.png)
3. In the  **Pull in Samples** step, copy the URL to be used in the init function.
![alt text](https://files.readme.io/4c38817-Zapier3.png)
4. While you're still at the same step, try sending a sample bug report. You should then see the success message as displayed below.
![alt text](https://files.readme.io/ef3b0b9-Zapier4.png)
5. Now, you're ready to set up the action. Pick the app you prefer and follow its required steps. In this guide, we're using Slack as an example.
![alt text](https://files.readme.io/bcc7f77-Zapier5.png)
6. In the **Edit Template** step, you can customize the format of the bug report you will be receiving.
![alt text](https://files.readme.io/7232147-Zapier6.png)
7. Test your Zap to make sure everything is working as expected.
![alt text](https://files.readme.io/c645c89-Zapier8.png)
8. Last, give a name to your Zap and turn it on.
![alt text](https://files.readme.io/244a5fe-Zapier10.png)

# Contributing

We've set up a separate document for our [contribution guidelines](https://github.com/Instabug/instabug-websdk/blob/master/CONTRIBUTING.md)
