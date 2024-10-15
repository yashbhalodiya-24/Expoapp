// import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from "react-native";
// import React, { useRef, useState } from "react";
// import Video from "react-native-video";

// const videos = [
//   { uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
//   { uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
//   { uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
// ];

// const Reels = () => {
//   const [paused, setPaused] = useState(false);
  
//   const onBuffer = (e: any) => {
//     console.log("Buffering", e);
//   };

//   const onError = (e: any) => {
//     console.log("Error", e);
//     Alert.alert("Video Error", "There was an error loading the video.");
//   };

//   const togglePause = () => {
//     setPaused(!paused);
//   };

//   const renderVideoItem = ({ item }: { item: { uri: string } }) => (
//     <View style={styles.container}>
//       <Video
//         source={{ uri: item.uri }}
//         onBuffer={onBuffer}
//         onError={onError}
//         repeat
//         paused={paused}
//         style={styles.backgroundVideo}
//       />
//       <TouchableOpacity style={styles.button} onPress={togglePause}>
//         <Text style={styles.buttonText}>{paused ? "Play" : "Pause"}</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <FlatList
//       data={videos}
//       renderItem={renderVideoItem}
//       keyExtractor={(item, index) => index.toString()}
//       pagingEnabled
//       showsVerticalScrollIndicator={false}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100%",
//   },
//   backgroundVideo: {
//     width: "100%",
//     height: "100%",
//   },
//   button: {
//     position: "absolute",
//     bottom: 30,
//     backgroundColor: "#ff5c5c",
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

// export default Reels;
