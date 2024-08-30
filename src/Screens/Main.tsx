import { View, Text, Appearance } from 'react-native';
import React, { useEffect, useState } from 'react';
import BottomNavigator from '../navigation/BottomNavigator';
import { APP_COLORS } from '../Config/Theme';
import DrawerNavigation from '../navigation/DrawerNavigation';

const Main = () => {
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
    <View style={{ flex: 1  }}>
    <BottomNavigator />
  </View>
  );
};

export default Main;