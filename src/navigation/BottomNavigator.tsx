import { View, Image, Appearance } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

import { APP_COLORS } from '../Config/Theme';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import Home from '../Screens/Home';
import Main from '../Screens/Main';
import PhilzCoffee from '../Screens/StarCoffee';
import Logout from '../Screens/Logout';
import Carddetails from '../Screens/Carddetails';
import { Matrix } from '../Screens/matrix';
import Product from '../Screens/Product';



const Bottom = createBottomTabNavigator();

const BottomNavigator = () => {
  const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === 'dark');
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const createAnimatedIcon = (source, focused) => {
    const scale = useSharedValue(focused ? 1.4 : 1);

    useEffect(() => {
      scale.value = withSpring(focused ? 1.4 : 1);
    }, [focused]);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    return (
      <Animated.Image 
        source={source}
        style={[{ width: responsiveWidth(5.5), height: responsiveWidth(5.5)}, animatedStyle]}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? APP_COLORS.black : APP_COLORS.white }}>
    <Bottom.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        let source;
        if (route.name === 'Home') {
          source = require('../assets/home.png');
        } else if (route.name === 'Logout') {
          source = require('../assets/logout.png');
        } else if (route.name === 'Products') {
          source = require('../assets/product.png');
        } else if (route.name === 'Matrix') {
          source = require('../assets/store.png');
        }
        return createAnimatedIcon(source, focused);
      },
    })}>
      <Bottom.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Bottom.Screen name="Logout" component={Logout} options={{ headerShown: false }} />
      <Bottom.Screen name="Product" component={Product} options={{ headerShown: false }} />
      <Bottom.Screen name="Matrix" component={Matrix} options={{ headerShown: false }} />

    </Bottom.Navigator>
  </View>
  );
};

export default BottomNavigator;
