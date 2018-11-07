
import React from "react";
import { View, TouchableOpacity, ImageBackground } from 'react-native';

import { Camera} from 'expo';
const SERVER_URL = 'http://76.171.133.189:5005/'

class Autoshoot extends React.Component {
  state = {
    photo: null
  }
  
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
    .then(response => {console.log(response)
         return (response.json())})
  }

  takePicture = () => {
    this.camera.takePictureAsync({
      quality: 0.1,
      base64: true,
      exif: false
    }).then(photo => {
      this.setState({ photo },()=>{
          console.log('hit')
        this.uploadPicture()

      });
    })
  }

  takeOffPicture = ()=>{
      this.setState({photo: null})
  }

  render() {
    const { photo } = this.state;
    return (
      <View style={{ flex: 1, width: '100%' }}>
     {photo ? (
       <ImageBackground
         style={{ flex: 1 }}
         source={{ uri: photo.uri }} 
         >
           <TouchableOpacity
           style={{ flex: 1 }}
           onPress={this.takeOffPicture}/>
         </ImageBackground>

     ) : (
       <Camera
         style={{ flex: 1 }}
         onPress={this.takePicture}
         type={Camera.Constants.Type.back}
         ref={cam => this.camera = cam}>
         <TouchableOpacity
           style={{ flex: 1 }}
           onPress={this.takePicture}/>
       </Camera>
     )}
    </View>
    );
  }
}

export default Autoshoot