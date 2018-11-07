# react-native-setup-IOS-



This is just a quick setup for an app on IOS (and probably Android too with some minor modifications)!


*REQUIREMENTS*

### Installing Expo on your Computer and on your phone ###
---
A quick heads up. I'm assuming that you have some things already installed on your computer (Node, Yarn).
We are going to use the Expo command line (their documentation is really *really* good. Go take a look [Expo Documentation](https://docs.expo.io/versions/latest/).

So go ahead and type the following into the command line. This will install the Expo command line interface globally.

`npm install -g expo`

You can also download the Expo app in the App store or the Play Store. 

All done! Yay!

### Getting the project started ###
---
Expo will go ahead and do *a lot* of the heavy lifting for you and set up a lot of files for you. 
Note: Expo is not ready to be used with every app. There are some pitfalls to using Expo (such as accessing the phone's bluetooth's capabilities. Some more details [here](https://docs.expo.io/versions/v31.0.0/introduction/why-not-expo) if you want to take a look.

Next, to create a new project, go ahead and run :

`expo init firstProject`

This will build out most of the files that you need in order to build your first app!

Go ahead and run the following:

```
cd firstProject  
npm install
expo start
 ```
 
You will probably be ased to create an account sometime during this process. Go ahead and do so.

At this point, you should have the Expo app on your phone, the firstProject folder, and an account with Expo. 

After running expo start, the following page should appear:
![alt text](https://github.com/pcourpron/react-native-setup-IOS-/blob/master/assets/Screen%20Shot%202018-11-07%20at%2010.48.41%20AM.png)
 






