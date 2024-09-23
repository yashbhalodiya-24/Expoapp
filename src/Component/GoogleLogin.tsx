import { View, Text, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';
import * as WebBrowser from "expo-web-browser";
import { useNavigation } from '@react-navigation/native';

WebBrowser.maybeCompleteAuthSession();

const GoogleLogin = () => {
useWarmUpBrowser();
const {startOAuthFlow} = useOAuth({strategy:"oauth_google"});
const navigation = useNavigation();
const onPress = React.useCallback(async()=>{
  try {
    const {createdSessionId,signIn,signUp,setActive} = 
    await startOAuthFlow();
    if (createdSessionId){
      setActive({session:createdSessionId});
      navigation.navigate('Parent');
    } else {
// signin and signup
    }
  } catch (err) {
    console.error("OAuth error",err);
    }
},[navigation]);
  return (
    // <View>
    <TouchableOpacity onPress={onPress} style={{justifyContent:'center', margin:10,padding:10,paddingLeft:50,borderWidth:2,paddingRight:50, flexDirection:'row',borderRadius:10}}>
      <Image source={require('../assets/google.png')} style={{height:30,width:30}}/>
  <Text style={{color:"#000",marginTop:5,margin:10}}>Google SignIn</Text>
</TouchableOpacity>
    // </View>
  )
}

export default GoogleLogin