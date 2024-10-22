import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import useStore from '../../Component/store/useStore';  // Adjust the path based on where your store is located

const CounterComponent = () => {
  // Use the Zustand store
  const { count, increase, decrease } = useStore();

  return (
    <View style={styles.container}>
      <View style={{backgroundColor:'#000',borderRadius:25,padding:20,paddingHorizontal:40, justifyContent: 'center',
    alignItems: 'center',elevation:5}}>
      <Text style={styles.text}>Count: {count}</Text>
      <TouchableOpacity onPress={increase} style={{borderWidth:1,borderRadius:10,padding:10,elevation:5,borderColor:'#fff'}}><Text style={{color:'#fff',fontSize:20}} >Increase</Text></TouchableOpacity>
      <View style={{margin:5}}></View>
      <TouchableOpacity onPress={decrease} style={{borderWidth:1,borderRadius:10,padding:10,elevation:5,borderColor:'#fff'}}><Text style={{color:'#fff',fontSize:20}} >Decrease</Text></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize:30,
    marginBottom: 10,
    color:'#fff'
  },
});

export default CounterComponent;
