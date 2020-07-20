# Recipe UI

Written in react-native, this service is responsible for hosting UI for interacting with
recipes.

This service also uses expo for building and deploying react-native packages.


## Getting started

### Prerequisites

- Node 12+
- Expo `npm install --global expo-cli`
- Expo Client on your physical device
- Physical device on the same wireless network as your machine

### Steps

To get started, run the following:

- `yarn install`
- `yarn start`

After running the above, Metro bundler will host on the provided URL that can be seen in
the CLI after running yarn start.

After visiting the localhost Metro bundler, a QR code should be visible. On your physical
device, access the Expo Client app, and use the QR scanner to scan the QR code in the 
localhost Metro bundler. You may not need to use the QR scanner since being on the same
wireless network should show your App in the Expo Client app. 


## Resources

Expo - https://docs.expo.io/

React Native - https://reactnative.dev/