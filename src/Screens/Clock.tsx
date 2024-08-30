import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  Easing,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Square from '../Component/Square';
import { N } from '../Component/constants';
import { LinearGradient } from 'expo-linear-gradient';

export default function Clock() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(4 * Math.PI, {
        duration: 8000,
        easing: Easing.linear,
      }),
      -1
    );
  }, []);

  return (
    <LinearGradient
    colors={[ "#f8c0c8", "#efe7d3","#d3bbdd","#ece3f0"]}
    style={styles.gradient}
  >
    <View style={styles.container}>
  
      <StatusBar style="inverted" />
      {new Array(N).fill(0).map((_, index) => {
        return <Square key={index} progress={progress} index={index} />;
      })}
  
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});