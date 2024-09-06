import { View, Text, Appearance } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import { APP_COLORS } from '../Config/Theme';
import Splash from '../Screens/Splash';
import LoginScreen from '../Screens/login';
import { NavigationContainer } from '@react-navigation/native';

import DrawerNavigation from './DrawerNavigation';
import Signup from '../Screens/Signup';
import Parent from '../Screens/Parent';
import LineChart from '../Screens/LineChart';
import LiquidSwipe from '../Screens/liquidSwipe';
import PhilzCoffee from '../Screens/StarCoffee';
import StarCoffee from '../Screens/StarCoffee';
import Logout from '../Screens/Logout';
import Carddetails from '../Screens/Carddetails';
import SwipeDelete from '../Screens/SwipeDelete';
import { Metacard } from '../Screens/Metacard';
import Clock from '../Screens/Clock';
import Home from '../Screens/Home';
import { FrostedCard } from '../Screens/FrosteCard';
import Game from '../Screens/Game';
import Cart from '../Screens/Cart';
// import TicTacToe from '../Screens/TicTacToe';


const Stack = createStackNavigator();

const AppNavigator = () => {
  const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === 'dark');
    });


    

    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />
      <Stack.Screen name='Home' component={Home} options={{ headerShown: false, }} />
      <Stack.Screen name='Parent' component={Parent} options={{ headerShown: false }} />
      <Stack.Screen name = 'login' component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name = 'Logout' component={Logout} options={{ headerShown: false }} />
      <Stack.Screen name = 'Signup' component={Signup} options={{ headerShown: false }} />
      <Stack.Screen name = 'LineChart' component={LineChart} options={{ headerShown: false }} />
      <Stack.Screen name = 'LiquidSwipe' component={LiquidSwipe} options={{ headerShown: false }} />
      <Stack.Screen name = 'StarCoffee' component={StarCoffee} options={{ headerShown: false }} />
      <Stack.Screen name = 'Carddetails' component={Carddetails} options={{ headerShown: false }} />
      <Stack.Screen name = 'SwipeDelete' component={SwipeDelete} options={{ headerShown: false }} />
      <Stack.Screen name = 'MetaCard' component={Metacard} options={{ headerShown: false }} />
      <Stack.Screen name = 'Clock' component={Clock} options={{ headerShown: false }} />
      <Stack.Screen name = 'FrostedCard' component={FrostedCard} options={{ headerShown: false }} />
      <Stack.Screen name = 'Game' component={Game} options={{ headerShown: false }} />
      <Stack.Screen name = 'Cart' component={Cart} options={{ headerShown: true }} />
    </Stack.Navigator>
  </NavigationContainer>
  );
  ;
}

export default AppNavigator;
