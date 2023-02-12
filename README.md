<a name="readme-top"></a>

<div align="center">

<h3><b>Murojaah Mobile App</b></h3>

</div>

<!-- TABLE OF CONTENTS -->

# 📗 Table of Contents

- [📖 About the Project](#about-project)
  - [🛠 Built With](#built-with)
    - [Tech Stack](#tech-stack)
    - [Key Features](#key-features)
  - [🚀 Live Demo](#live-demo)
- [💻 Getting Started](#getting-started)
  - [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Install](#install)
  - [Usage](#usage)
  - [Run tests](#run-tests)
  - [Deployment](#triangular_flag_on_post-deployment)
- [👥 Authors](#authors)
- [🔭 Future Features](#future-features)
- [🤝 Contributing](#contributing)
- [⭐️ Show your support](#support)
- [🙏 Acknowledgements](#acknowledgements)
- [❓ FAQ](#faq)
- [📝 License](#license)

<!-- PROJECT DESCRIPTION -->

# 📖 [Murojaah App] <a name="about-project"></a>

The official mobile app of Murojaah by Kaizeni.

## 🛠 Built With <a name="built-with"></a>

### Tech Stack <a name="tech-stack"></a>

  <ul>
    <li><a href="https://reactnative.dev/">React Native</a></li>
      <li><a href="https://firebase.google.com//">Firebase</a></li>
      <li><a href="http://nativebase.io//">NativeBase UI</a></li>
  </ul>

<!-- Features -->

### Key Features <a name="key-features"></a>

- Quiz
- Learn Makhraj
- Basic Learning Statistics
- Make Friends
- Only android support for now

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LIVE DEMO -->

## 🚀 Live Demo <a name="live-demo"></a>

- [Live Demo Link](https://google.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Documentation

- [File Structure](./docs/file-structure.md)
- [Configuration](./docs/config.md)
- [Redux Middleware](./docs/middleware.md)
- [Sagas](./docs/sagas.md)
- [Mock Api](./docs/mock-api.md)
- [Authentication](./docs/authentication.md)
- [Snippets VS Code](./docs/snippets.md)

<!-- GETTING STARTED -->

## 💻 Getting Started <a name="getting-started"></a>

To get a local copy up and running, follow these steps.

### Prerequisites

In order to run this project you need:

- To have Yarn in your machine. To setup Yarn you can check the setup guide [here](https://yarnpkg.com/getting-started/install).
- To have React Native in your machine. To setup React Native, you can check the setup guide. Make sure to also install Watchman, XCode, Ruby, Cocoapods (for MacOS) follow the instructions in iOS tab [here](https://reactnative.dev/docs/environment-setup).
- Install Ruby [here](https://www.ruby-lang.org/en/documentation/installation/)
- Cocoapods is a dependency manager for Swift and Objective-C Cocoa projects. More information about CocoaPods [here]:(https://cocoapods.org/)

```
sudo gem install cocoapods
```

### Setup

Clone this repository to your desired folder:

```sh
  git clone https://[MY_ACCOUNT]/nxt-lvl-onmission/onmission-app.git
```

The main branch as for now is 'main'. Contact current developer to confirm the main branch as it may change in the future.
You may want to change the IPHONEOS_DEPLOYMENT_TARGET to use your favorite device simulator for development:

- Open the workspace in Xcode.
- Select under the targets tab.
- In the project editor, navigate to the General tab. In the Deployment Info
  section, Select iPhone 11 for the deployment target.

### Install

Install this project with:

```sh
  cd onmission-app

  # copy env and fill with keys. Please contact our developer for the env values
  cp .env.example .env

  yarn install
```

### Fingerprint

to use google sign in we need fingerprint of the app to be put to Firebase. after downloading google-service.json in Firebase, run

- yarn prebuild-android
- yarn fingerprint
- go to console developer -> setup -> app integrity -> app signing [here](https://play.google.com/console/u/0/developers/7534844038946391258/app/4974605337692006290/keymanagement?tab=appSigning)
-

### Usage

To run the project, execute the following command:

- For ios:

```
yarn ios
```

- For android:

```
yarn android
```

### Run tests

To run tests, run the following command:

```sh
  yarn test
```

### Deployment

If you want to build using EAS don't forget to remove credentials in .gitignore file.

How to deploy 'testing application' to TestFlight for iOS :

- Make sure .env values are correct. (e.g. CONFIG_APP_NAME=; CONFIG_APP_ASSOCIATED_DOMAIN= ;CONFIG_API_URL= ; CONFIG_FIRESTORE_COLLECTION= )
- Make sure build number is correct (increase build number from previous build). Go to ‘Show project navigator’ -> General -> Identity -> Build
- Make sure 'Display Name' is correct
- Make sure 'Build Target device' to ‘any iOS Device’ located in top middle bar on the right of app name (BossMobileApp)
- Go to Product -> Clean Build
- Go to Product -> Build
- Go to Product -> Archive
- Click ‘Distribute App’
- Make sure your machine has the right Keychain Access for this app (BOSS SYSTEMS). Make sure it’s listed here https://developer.apple.com/account/resources/certificates/list
- Go to https://appstoreconnect.apple.com/apps/ then go to TestFlight, wait till your build exist
- Click ‘Manage complience’, choose standard encryption algorithm and

#### Preview:

- Open the `BossMobileApp` workspace in Xcode.
- Select `BossMobileApp` under the targets tab.
  ![](./docs/images/xcode-targets.png)
- Select `Any IOS Device` for the build target.
  ![](./docs/images/xcode-build-target.png)
- Fill in the fields with the correct values for the staging env.
  ![](./docs/images/xcode-general-details.png)
- Make sure to clean build folder first before archiving.
  ![](./docs/images/xcode-clean-build-folder.png)
- Archive to create and upload a testflight.

  ![](./docs/images/xcode-archive.png)

- Once the uploading of the testflight is done. You can check the testflight in the [app store](https://appstoreconnect.apple.com/apps/1572186459/testflight/ios).

#### Production:

- ![](./docs/images/xcode-archive.png)

- Once the uploading of the testflight is done. You can check the testflight in the [app store](https://appstoreconnect.apple.com/apps/1530324478/testflight/ios).
- To release the app in the App Store, submit a review to the apple team.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- AUTHORS -->

## 👥 Authors <a name="authors"></a>

👤 **Ardhi Rofi Mufdhila** - <a href="mailto:ardhi.rofi@kaizeni.tech">ardhi.rofi@kaizeni.tech</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FUTURE FEATURES -->

## 🔭 Future Features <a name="future-features"></a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## 🤝 Contributing <a name="contributing"></a>

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](../../issues/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FAQ (optional) -->

## ❓ FAQ <a name="faq"></a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## 📝 License <a name="license"></a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
