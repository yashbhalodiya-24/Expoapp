import { View, Text, Appearance, StyleSheet, ActivityIndicator, Animated, ToastAndroid, BackHandler } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { APP_COLORS } from '../Config/Theme';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import { LinearGradient } from 'expo-linear-gradient';

const Home = () => {
  const navigation = useNavigation();
  const [theme, setTheme] = useState('');
  const [data, setData] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');
  const [loading, setLoading] = useState(false);
  const opacity = useRef(new Animated.Value(1)).current; // Animated value for opacity

  useEffect(() => {
    // Prevent hardware back button
    const backAction = () => {
      // ToastAndroid.show('Can`t Use Screen Back Gesture', ToastAndroid.SHORT);
      return true; // Prevent default behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    // Prevent navigation back
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });

    // Cleanup on unmount
    return () => {
      backHandler.remove();
      unsubscribe();
    };
  }, [navigation]);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === 'dark');
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const getData = () => {
    setLoading(true); // Set loading to true when data fetch starts
    axios
      .get('https://jsonplaceholder.typicode.com/posts', {
        headers: {
          Authorization: 'Bearer',
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        setData(res.data);
        setLoading(false); // Set loading to false when data fetch completes
      })
      .catch(err => {
        console.log(err);
        setLoading(false); // Set loading to false in case of error
      });
  };

  // Function to handle press in
  const handlePressIn = () => {
    Animated.timing(opacity, {
      toValue: 0.5,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  // Function to handle press out
  const handlePressOut = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <LinearGradient
    colors={[ "#f8c0c8", "#efe7d3","#d3bbdd","#ece3f0"]}
    style={styles.gradient}
  >
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {loading ? (
        <ActivityIndicator size="large" color={isDarkMode ? APP_COLORS.blue : APP_COLORS.black} />
      ) : (
        <Animated.View style={{ opacity }}>
          <TouchableOpacity 
            style={[styles.touchable, { backgroundColor: isDarkMode ? APP_COLORS.white : APP_COLORS.black }]} 
            onPress={getData}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={{ color: isDarkMode ? APP_COLORS.black : APP_COLORS.white, fontSize: responsiveFontSize(1.8) }}>GET</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      
      <FlatList 
        data={data} 
        ListEmptyComponent={() => (
          <Text style={{ fontSize: responsiveFontSize(2), color: isDarkMode ? APP_COLORS.white : APP_COLORS.black, flex: 1, justifyContent: 'center', alignSelf: 'center' }}>NO DATA</Text>
        )}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 10 }}>
            <Text style={{ fontSize: responsiveFontSize(2), marginLeft: responsiveWidth(2), marginRight: responsiveWidth(2), color: isDarkMode ? APP_COLORS.white : APP_COLORS.black }}>Id: {item.id}</Text>
            <Text style={{ fontSize: responsiveFontSize(2), marginLeft: responsiveWidth(2), marginRight: responsiveWidth(2), color: isDarkMode ? APP_COLORS.white : APP_COLORS.black }}>Title: {item.title}</Text>
            <Text style={{ fontSize: responsiveFontSize(2), marginLeft: responsiveWidth(2), marginRight: responsiveWidth(2), color: isDarkMode ? APP_COLORS.white : APP_COLORS.black }}>Body: {item.body}</Text>
          </View>
        )}
      />
    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  touchable: {
    margin: responsiveHeight(2),
    borderRadius: responsiveHeight(2),
    paddingLeft: responsiveWidth(40),
    paddingRight: responsiveWidth(40),
    padding: responsiveHeight(2.2),
  },
  gradient:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
