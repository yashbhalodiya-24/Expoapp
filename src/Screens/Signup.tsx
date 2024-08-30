import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_COLORS } from '../Config/Theme';
import { SvgXml } from 'react-native-svg';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import { LinearGradient } from 'expo-linear-gradient';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const IconSvgXml = {
    Plus: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
        <path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"/>
      </svg>
    `,
  };


  const handleSignup = async () => {
    // Basic email validation
    setIsLoading(true);
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    // Basic password validation
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    // Clear error message if there was one previously
    setError('');

    try {
      // Store email and password in local storage
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);

      // Navigate to the login screen
      navigation.navigate('login');
    } catch (error) {
      setModalMessage('Failed to save credentials to storage');
      setModalVisible(true);
    }
    finally {
      // Hide loader
      setIsLoading(false);
    }
  };
  
  const scale1 = useSharedValue(1);
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

  const handleSignupNavigation = () => {
    // Navigate to the sign-up screen
    navigation.navigate('Signup');
  };

  return (
    <LinearGradient
    colors={[ "#f8c0c8", "#efe7d3","#d3bbdd","#ece3f0"]}
    style={styles.gradient}
  >
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={APP_COLORS.black}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <View style={{ margin: 7 }}></View>
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={APP_COLORS.black}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <Text style={styles.passwordVisibilityIcon}>{showPassword ? 'Hide' : 'Show'}</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Animated.View style={[animatedStyle1]}>
      <TouchableOpacity style={styles.touchable} onPressIn={() => handlePressIn(scale1)}
          onPressOut={() => handlePressOut(scale1)} onPress={handleSignup}>
      {isLoading ? (
          <ActivityIndicator color={APP_COLORS.white} />
        ) : (
        <Text style={{ color: APP_COLORS.white,justifyContent:'center' }}>Submit</Text>
        )}
      </TouchableOpacity>
      </Animated.View>
      <View style={{ margin: 7 }}></View>
      <TouchableOpacity onPress={() => navigation.navigate('login')}>
        <Text style={styles.login}>Already have an account? Login</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closetouch} onPress={()=> setModalVisible(false)}>
          <SvgXml xml={IconSvgXml.Plus} width={20} height={15} fill="#000" />
          </TouchableOpacity>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalokButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
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
    paddingHorizontal: responsiveWidth(6),
    paddingBottom: responsiveHeight(7),
  },
  gradient:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: "center",
    fontSize: responsiveFontSize(4),
    marginBottom:responsiveHeight(5),
    fontWeight: "bold",
    color: APP_COLORS.black,
  },
  input: {
    backgroundColor: APP_COLORS.white,
    borderRadius: responsiveHeight(2),
    elevation: 10,
    height: responsiveWidth(11),
    width:  responsiveWidth(88),
    color: APP_COLORS.black,
    marginBottom: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(5),
  },
  error: {
    color: APP_COLORS.red,
    // marginBottom: 10,
    fontSize: responsiveFontSize(2),
  },
  touchable: {
    padding: responsiveHeight(1.5),
    paddingLeft: responsiveWidth(30),
    paddingRight: responsiveWidth(30),
    margin: responsiveHeight(1.5),
    backgroundColor: APP_COLORS.loginback,
    borderRadius: responsiveHeight(2),
    // width: "100%",
    marginVertical: responsiveHeight(2),
  },
  login: {
    color: APP_COLORS.black,
    fontSize: responsiveFontSize(1.6),
    textAlign: 'center',
  },
  passwordVisibilityIcon: {
    color: APP_COLORS.black,
    // paddingHorizontal: 10,
    fontSize:responsiveFontSize(2),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
   paddingBottom:50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: APP_COLORS.white,
    padding: 70,
    borderRadius: 40,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    color: APP_COLORS.black,
  },
  modalokButton: {
    backgroundColor: APP_COLORS.loginback,
    padding: 10,
    paddingRight:20,
    paddingLeft:20,
    borderRadius: 5,
    // marginRight:200,
    marginHorizontal:30,
  },
 
 closetouch:{
left:180,
bottom:30,
 },
 
  modalButtonText: {
    color: APP_COLORS.white,
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: APP_COLORS.black,
  },
});

export default SignupScreen;
