import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Appearance, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_COLORS } from '../Config/Theme';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import { LinearGradient } from 'expo-linear-gradient';
const Logout = ({ navigation }) => {
  const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');
  const [isLoading, setIsLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === 'dark');
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      // Clear email from AsyncStorage
      await AsyncStorage.removeItem('email');
      // Navigate to the login screen and reset the navigation stack
      navigation.reset({
        index: 0,
        routes: [{ name: 'login' }],
      });
    } catch (error) {
      console.error('Failed to clear user data', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setShowLoader(true);
    // Simulate some delay if needed
    setTimeout(() => {
      setShowLoader(false);
      // Navigate back to the previous screen or any other desired action
      navigation.goBack();
    }, 1000);
  };

  const confirmLogout = () => {
    setIsModalVisible(true);
  };

  const scale1 = useSharedValue(1);
  const scale2 = useSharedValue(1);
  const scale3 = useSharedValue(1);
  const scale4 = useSharedValue(1);

  const handlePressIn = (scale) => {
    scale.value = withSpring(0.8);
  };

  const handlePressOut = (scale) => {
    scale.value = withSpring(1);
  };

  const animatedStyle1 = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale1.value }],
    };
  });

  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale2.value }],
    };
  });

  const animatedStyle3 = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale3.value }],
    };
  });

  const animatedStyle4 = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale4.value }],
    };
  });

  return (
    <LinearGradient
    colors={[ "#f8c0c8", "#efe7d3","#d3bbdd","#ece3f0"]}
    style={styles.gradient}
  >
    <View style={[styles.container]}>
      <Text style={[styles.message, { color: isDarkMode ? APP_COLORS.white : APP_COLORS.black }]}>
        Are you sure you want to logout?
      </Text>
      <View style={styles.buttonContainer}>
      <Animated.View style={[{ margin: 10 }, animatedStyle1]}>
        <TouchableOpacity
          style={[styles.logout, { backgroundColor: isDarkMode ? APP_COLORS.white : APP_COLORS.gray }]}
          onPressIn={() => handlePressIn(scale1)}
          onPressOut={() => handlePressOut(scale1)}
          onPress={confirmLogout}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={isDarkMode ? APP_COLORS.black : APP_COLORS.white} />
          ) : (
            <Text style={{    fontSize: responsiveFontSize(1.8),
              color: isDarkMode ? APP_COLORS.black : APP_COLORS.white }}>Logout</Text>
          )}
        </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[{ margin: 10 }, animatedStyle2]}>
        <TouchableOpacity
          style={[styles.logout, { backgroundColor: isDarkMode ? APP_COLORS.white : '#333' }]}
          onPressIn={() => handlePressIn(scale2)}
          onPressOut={() => handlePressOut(scale2)}
          onPress={handleCancel}
          disabled={isLoading}
        >
          {showLoader ? (
            <ActivityIndicator color={isDarkMode ? APP_COLORS.black : APP_COLORS.white} />
          ) : (
            <Text style={{    fontSize: responsiveFontSize(1.8),
              color: isDarkMode ? APP_COLORS.black : APP_COLORS.white }}>Cancel</Text>
          )}
        </TouchableOpacity>
        </Animated.View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Do you really want to logout?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonYes]}
                onPress={() => {
                  setIsModalVisible(false);
                  handleLogout();
                }}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonNo]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: responsiveFontSize(3),
    marginBottom: responsiveHeight(3),
  },
  gradient:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: responsiveWidth(70),
  },
  logout: {
    borderRadius: responsiveHeight(2),
    padding: responsiveWidth(3),
    margin: responsiveHeight(1),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width:  responsiveWidth(80),
    padding: responsiveWidth(5),
    backgroundColor: 'white',
    borderRadius: responsiveHeight(2),
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalText: {
    marginBottom: responsiveHeight(2.5),
    textAlign: 'center',
    fontSize: responsiveFontSize(3),
    color: APP_COLORS.black,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    borderRadius: responsiveHeight(2),
    padding: responsiveWidth(3),
    margin: responsiveHeight(1),
    width: responsiveWidth(25),
    alignItems: 'center',
  },
  modalButtonYes: {
    backgroundColor: 'black',
  },
  modalButtonNo: {
    backgroundColor: 'black',
  },
  modalButtonText: {
    fontSize: responsiveFontSize(2),
    color: 'white',
  },
});

export default Logout;
