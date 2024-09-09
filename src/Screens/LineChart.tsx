import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LineChart, ProgressChart } from 'react-native-chart-kit';
import TodoList from '../Component/Todolist';
import { Provider } from 'react-redux';
import { store } from '../redux/store';


const screenWidth = Dimensions.get('window').width;

const data = {
  labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  datasets: [
    {
      data: [100, 200, 300, 300, 200, 400, 300],
      color: (opacity = 1) => `rgba(000, 000, 000, ${opacity})`, // optional
      strokeWidth: 2 // optional
    },
     {
      data: [100, 325, 100, 400, 350, 200, 350],
      color: (opacity = 1) => `rgba(144, 150, 252, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ],
};
const dataprogress = {
  labels: ["Swim", "Bike", "Run"], // optional
  data: [0.4, 0.6, 0.8]
};

const chartConfig = {
  backgroundColor: '#fff',
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(101, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(000, 000, 000, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#000'
  },
};

const Candlechart = () => {

  return (
    <LinearGradient
    colors={[ "#f8c0c8", "#efe7d3","#d3bbdd","#ece3f0"]}
    style={styles.gradient}
  >
    <View style={styles.container}>
      <Text style={styles.title}>line chart</Text>
      <View style={{marginBottom:150}}>
      <LineChart
        data={data}
        width={screenWidth - 32} // from react-native
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
      <ProgressChart
  data={dataprogress}
  width={screenWidth}
  height={220}
  strokeWidth={16}
  radius={32}
  chartConfig={chartConfig}
  hideLegend={false}
/>
    </View>
    </View>
    </LinearGradient>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fff',

  },
  gradient:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});


export default Candlechart;
