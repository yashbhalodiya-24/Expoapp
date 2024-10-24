import React from 'react';
import { Button, Alert } from 'react-native';
import auth0 from '../../auth0Config';

const Auth0login = () => {
  const handleLogin = async () => {
    try {
      const credentials = await auth0.webAuth.authorize({
        scope: 'openid profile email',
        audience: `https://${auth0.domain}/userinfo`,
      });

      console.log(credentials);
      Alert.alert('Login Successful!', `Access Token: ${credentials.accessToken}`);
    } catch (error) {
      console.log(error);
      Alert.alert('Login Failed', error.message);
    }
  };

  return <Button title="Login with Auth0" onPress={handleLogin} />;
};

export default Auth0login;
