# react-native-setup-IOS-



This is just a quick setup for an app on IOS (and probably Android too with some minor modifications)!
In this project, we'll just be building a simple app that can take a picture and send it to a server.

*REQUIREMENTS*
If you've never used Node, Express, or React stop right here. You need to, at a minimum have some knowledge of these libraries/framework. 
React has some good documentation [here](https://reactjs.org/)


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

After running expo start, the following page should appear on you web browser:
![alt text](https://github.com/pcourpron/react-native-setup-IOS-/blob/master/assets/Screen%20Shot%202018-11-07%20at%2010.48.41%20AM.png)


 
You can then email the project to yourself, open the email on your phone and click the open in Expo link!
Expo will then launch the App on your phone and will automatically update the app as you make changes and save them!


So if we go back to our text-editor (I'm using VS Code) and open the firstProject folder you should see and `App.js` file with the following inside: 
```
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

On your phone, you should just see a line of text in the center of your phone saying  `Open up App.js to start working on your app!`.

If you want to know exactly what's happening, go take a look inside of the package.json file. 
You'll see :
`"main":"node_modules/expo/AppEntry.js"`
What's happening here is that the expo is looking for an App.js to render a component from the AppEntry.js file.


### Accessing the Camera ###
---
Now, go back to the `App.js` file and add the following lines (most importantly the Camera and Permmsions)
Apple requires us to ask for these permissions before we can use them, but we'll get to hat in a little bit.

```
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// add this:
import { Camera, Permissions } from 'expo';

export default class App extends React.Component {
  // initialize state
  state = {
    cameraPermission: null
  };

  render() {
    const { cameraPermission } = this.state;

    // Render one of 3 things depending on permissions
    return (
      <View style={styles.container}>
        {cameraPermission === null ? (
          <Text>Waiting for permission...</Text>
        ) : cameraPermission === false ? (
          <Text>Permission denied</Text>
        ) : (
          <Text>Camera permission Granted!</Text>
        )}
      </View>
    );
  }
}

```

On this page, the text should just say `Waiting for permission...`

In our App component, let's add the following method before our render method: 
```
 componentDidMount() {
    Permissions.askAsync(Permissions.CAMERA)
      .then(({ status }) =>
        this.setState({
          cameraPermission: status === 'granted'
        })
      );
  }
```

After the app reloads and you grant permission, the text should change to "Camera Permissin Granted!"

### Live Camera View ### 
---
Now let's add a folder called components to our root folder. Inside of that folder, let's add the following lines of code:
```

import React from "react";
import { View, TouchableOpacity, ImageBackground } from 'react-native';

import {Camera} from 'expo';

class Autoshoot extends React.Component {
  state = {
    photo: null
  }
  

   render() {
    return (
      <View style={{ flex: 1, width: '100%' }}>
        <Camera
          style={{ flex: 1 }}
          type={Camera.Constants.Type.front}
          ref={cam => this.camera = cam}>
        </Camera>
      </View>
    );
  }

export default Autoshoot
```

If you have some experience with HTML, you should consider the <View> tag as a <div> tag.
 
Now we have to go back to our App.js and add the following lines of code :
```
...
import Autoshoot from './components/AutoShoot'

...

return (
    <View style={styles.container}>
      {cameraPermission === null ? (
        <Text>Waiting for permission...</Text>
      ) : cameraPermission === false ? (
        <Text>Permission denied</Text>
      ) : (
        <Autoshoot/>
      )}
    </View>
  );
}
```
If you save this, you should see a BEAUTIFUL face staring back at you when the app reloads! 


### Take A Picture ### 

Going back to our Autoshoot.js file, we are going to make some edits.
We are going to add state and a takePicture method:
```
import React from 'react';

//changed the line below 
import { View, TouchableOpacity, ImageBackground } from 'react-native';

class Autoshoot extends React.Component {
state = {
photo : null
}
takePicture = () => {
  this.camera.takePictureAsync({
    quality: 0.1,
    base64: true,
    exif: false
  }).then(photo => {
    this.setState({ photo });
  })
}
...

```

Then inside the render method we change the code to this:

```
render() {
  const { photo } = this.state;

  return (
    <View style={{ flex: 1, width: '100%' }}>
     {photo ? (
       <ImageBackground
         style={{ flex: 1 }}
         source={{ uri: photo.uri }} />
     ) : (
       <Camera
         style={{ flex: 1 }}
         onPress={this.takePicture}
         type={Camera.Constants.Type.front}
         ref={cam => this.camera = cam}>
         <TouchableOpacity
           style={{ flex: 1 }}
           onPress={this.takePicture}/>
       </Camera>
     )}
    </View>
  );
}
```
Namely, if there is a photo, it will display it through ImageBackground. It there is no picture, the Camera will take up the whole screen. 

The TouchableOpacity tag is added to the Camera because Camera doesn't have an onPress function. So we added the TouchableOpacity tag ( which takes up the whole screen) to be able to capture the onPress.

Now, if you start your app, you should see a live video on the phone and when you click on the video, it should change to an image. 
Try setting up the components so that when you click on the still picture, it goes back to video.


But we want to send it to a server!

### Create A Server! ###

So go back to your root directory and run the following :
` yarn add express body-parser`

Create a server.js file in your root directory and add the following :

```
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));

// Store the single image in memory.
let latestPhoto = null;

// Upload the latest photo for this session
app.post('/', (req, res) => {
  // Very light error handling
  if(!req.body) return res.sendStatus(400);

  console.log('got photo')

  // Update the image and respond happily
  latestPhoto = req.body.image;
  res.sendStatus(200);
});

// View latest image
app.get('/', (req, res) => {
  // Does this session have an image yet?
  if(!latestPhoto) {
    return res.status(404).send("Nothing here yet");
  }

  console.log('sending photo');

  try {
    // Send the image
    var img = Buffer.from(latestPhoto, 'base64');
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.length
    });
    res.end(img);
  } catch(e) {
    // Log the error and stay alive
    console.log(e);
    return res.sendStatus(500);
  }
});

const port = process.env.PORT || 5005;
app.listen(port);

console.log(`Grill server listening on ${port}`);
```

Here we added some simple routes that will hit the server ( 1 post to add the picture, 1 get to retrieve it).

But, we don't have a method for uploading the picture yet! So we need to go back into our Autoshoot.js file and add the follwing method : 
```
uploadPicture = () => {
  return fetch(SERVER_URL, {
    body: JSON.stringify({
      image: this.state.photo.base64
    }),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST'
  })
  .then(response => response.json())
}
```
Here we are just using fecth (which is built into react-native!) and are passing in a variable for the url called SERVER_URL. So SERVER_URL needs to be set:

` const SERVER_URL = 'http://<your-ip>:5005/'`

You can grab your ip address by going to google, and typing in "What's my IP address?". Just pick the local IP address and not the public one. But we still need to call the uploadPicture when we take the picture! So the takePicture method inside of Autoshootjs needs to be changed:

```
takePicture = () => {
    this.camera.takePictureAsync({
      quality: 0.1,
      base64: true,
      exif: false
    }).then(photo => {
      this.setState({ photo },()=>{
        this.uploadPicture()
      });
    })
  }
```


And that should do it! You'll just need to go to your root directory of your project and pass in `node server` in the terminal as well as `expo start`, if you didn't already have that running. Note: Both of these need to be running for this to work!

After starting your server, if you go to localhost:5005 you should see text saying "Nothing Here Yet". With the app running on your phone, if you take a picture (simply press on the screen) it should send the picture up to your server. Just refresh your server and the image should appear!


Shoot me an email at pierrecourpron@gmail.com or a message on slack if this isn't working!
