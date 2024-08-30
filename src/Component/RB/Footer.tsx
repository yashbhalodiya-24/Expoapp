import React from "react";
import { StyleSheet, TouchableOpacity, View,Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const styles = StyleSheet.create({
  actions: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const Footer = () => {
  const insets = useSafeAreaInsets();
  return (
    <View>
      <View style={styles.actions}>
        <TouchableOpacity style={{backgroundColor:'#000',paddingLeft:55,paddingRight:55,borderRadius:15,paddingVertical:20,left:30,}}><Text style={{color:'#fff'}}>Swap</Text></TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:'#000', paddingLeft:55,paddingRight:55,borderRadius:15,paddingVertical:20,right:30,}}><Text style={{color:'#fff'}}>Send</Text></TouchableOpacity>
      </View>
      <View style={{ height: insets.bottom }} />
    </View>
  );
};

export default Footer;
