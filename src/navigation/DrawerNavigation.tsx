import { View, Text, Image, Appearance } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { APP_COLORS } from '../Config/Theme';
import Main from '../Screens/Main';
import LineChart from '../Screens/LineChart';
import LiquidSwipe from '../Screens/liquidSwipe';
import PhilzCoffee from '../Screens/StarCoffee';
import StarCoffee from '../Screens/StarCoffee';
import Carddetails from '../Screens/Carddetails';
import SwipeDelete from '../Screens/SwipeDelete';
import { Metacard } from '../Screens/Metacard';
import Clock from '../Screens/Clock';
import { FrostedCard } from '../Screens/FrosteCard';
import Game from '../Screens/Game';
import Bedtime from '../Screens/Bedtime';
import Rainbow from '../Screens/rainbow/Rainbow';
import { Story } from '../Screens/stories/Story';
import Product from '../Screens/Product';
import Reduxdemo from '../Screens/Reduxdemo';
// import TicTacToe from '../Screens/TicTacToe';

const Drawer = createDrawerNavigator();

// Custom Drawer Icon Component
const CustomDrawerIcon = () => (
  <View>
    <Image source={require('../assets/Splash.jpg')} style={{ width: 24, height: 24 }} />
  </View>
);
const DrawerNavigation = () => {
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
    <View style={{ flex:1, backgroundColor: isDarkMode ? APP_COLORS.black : APP_COLORS.white}}>
    <Drawer.Navigator>
      <Drawer.Screen  name="Nike" component={Main} options={{
      headerShown: true ,  headerStyle: {
        backgroundColor: isDarkMode ? APP_COLORS.white : APP_COLORS.black, // Set header background color
      },
      headerTintColor: isDarkMode ? APP_COLORS.black : APP_COLORS.white,}}
      />
      <Drawer.Screen  name="LineChart" component={LineChart} options={{
      headerShown: true ,  headerStyle: {
        backgroundColor: isDarkMode ?APP_COLORS.white : APP_COLORS.black, // Set header background color
      },
      headerTintColor: isDarkMode ? APP_COLORS.black : APP_COLORS.white,}}
      />
       <Drawer.Screen  name="LiquidSwipe" component={LiquidSwipe} options={{
      headerShown: true ,  headerStyle: {
        backgroundColor: isDarkMode ?APP_COLORS.white : APP_COLORS.black, // Set header background color
      },
      headerTintColor: isDarkMode ? APP_COLORS.black : APP_COLORS.white,}}
      />
        <Drawer.Screen  name="StarCoffee" component={StarCoffee} options={{
      headerShown: true ,  headerStyle: {
        backgroundColor: isDarkMode ?APP_COLORS.white : APP_COLORS.black, // Set header background color
      },
      headerTintColor: isDarkMode ? APP_COLORS.black : APP_COLORS.white,}}
      />
       <Drawer.Screen  name="CardDetails" component={Carddetails} options={{
      headerShown: true ,  headerStyle: {
        backgroundColor: isDarkMode ?APP_COLORS.white : APP_COLORS.black, // Set header background color
      },
      headerTintColor: isDarkMode ? APP_COLORS.black : APP_COLORS.white,}}
      />
          <Drawer.Screen  name="SwipeDelete" component={SwipeDelete} options={{
      headerShown: true ,  headerStyle: {
        backgroundColor: isDarkMode ?APP_COLORS.white : APP_COLORS.black, // Set header background color
      },
      headerTintColor: isDarkMode ? APP_COLORS.black : APP_COLORS.white,}}
      />
        <Drawer.Screen  name="Metacard" component={Metacard} options={{
      headerShown: true ,  headerStyle: {
        backgroundColor: isDarkMode ?APP_COLORS.white : APP_COLORS.black, // Set header background color
      },
      headerTintColor: isDarkMode ? APP_COLORS.black : APP_COLORS.white,}}
      />
          <Drawer.Screen  name="FrostedCard" component={FrostedCard} options={{
      headerShown: true ,  headerStyle: {
        backgroundColor: isDarkMode ?APP_COLORS.white : APP_COLORS.black, // Set header background color
      },
      headerTintColor: isDarkMode ? APP_COLORS.black : APP_COLORS.white,}}
      />
  
            <Drawer.Screen  name="Game" component={Game} options={{
      headerShown: true ,  headerStyle: {
        backgroundColor: isDarkMode ?APP_COLORS.white : APP_COLORS.black, // Set header background color
      },
      headerTintColor: isDarkMode ? APP_COLORS.black : APP_COLORS.white,}}
      />
      <Drawer.Screen  name="Bedtime" component={Bedtime} options={{
      headerShown: true ,  headerStyle: {
        backgroundColor: isDarkMode ?APP_COLORS.white : APP_COLORS.black, // Set header background color
      },
      headerTintColor: isDarkMode ? APP_COLORS.black : APP_COLORS.white,}}
      />
      <Drawer.Screen  name="Rainbow" component={Rainbow} options={{
      headerShown: true ,  headerStyle: {
        backgroundColor: isDarkMode ?APP_COLORS.white : APP_COLORS.black, // Set header background color
      },
      headerTintColor: isDarkMode ? APP_COLORS.black : APP_COLORS.white,}}
      />
         <Drawer.Screen  name="Story" component={Story} options={{
      headerShown: true ,  headerStyle: {
        backgroundColor: isDarkMode ?APP_COLORS.white : APP_COLORS.black, // Set header background color
      },
      headerTintColor: isDarkMode ? APP_COLORS.black : APP_COLORS.white,}}
      />
            <Drawer.Screen  name="Clock" component={Clock} options={{
      headerShown: true ,  headerStyle: {
        backgroundColor: isDarkMode ?APP_COLORS.white : APP_COLORS.black, // Set header background color
      },
      headerTintColor: isDarkMode ? APP_COLORS.black : APP_COLORS.white,}}
      />
                <Drawer.Screen  name="Reduxdemo" component={Reduxdemo} options={{
      headerShown: true ,  headerStyle: {
        backgroundColor: isDarkMode ?APP_COLORS.white : APP_COLORS.black, // Set header background color
      },
      headerTintColor: isDarkMode ? APP_COLORS.black : APP_COLORS.white,}}
      />
    </Drawer.Navigator>
  </View>
  );
};

export default DrawerNavigation;
