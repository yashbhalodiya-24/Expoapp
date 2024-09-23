import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import {ClerkProvider} from '@clerk/clerk-expo';



const App = () => {

  return (
    
    <AppNavigator />
  );
};
export default App;


