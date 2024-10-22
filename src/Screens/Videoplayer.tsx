// import React, { useState } from "react";

// import { View, StyleSheet } from "react-native";

// import { Video } from "expo-av";

// export default function Videoplayer() {
//   const [isPlaying, setIsPlaying] = useState(false);

//   return (
//     <View style={styles.container}>
//       <Video
//         source={{
//           uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
//         }} // Replace with your video file path
//         style={styles.video}
//         useNativeControls
//         isPlaying={isPlaying}
//         onPlaybackStatusUpdate={(status) => setIsPlaying(status.isPlaying)}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
  
//   container: {
//     flex: 1,
//   },
//   video: {
//     width: "100%",
//     height: 250,
//   },

// });


import { View, Text } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps';

const Videoplayer = () => {
  return (
    <View>
     <MapView
     initialRegion={{
      latitude:37.78825,
      longitude:-122.4324,
      latitudeDelta:0.0922,
      longitudeDelta:0.0421,
     }}/>
    </View>
  )
}

export default Videoplayer