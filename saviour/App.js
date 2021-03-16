import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Screens/Login'
import Register from './Screens/Register'
import Map from './Screens/Map'
import RequestorProfileCompletion from './Screens/RequestorProfileCompletion'
import ProviderProfileCompletion from './Screens/ProviderProfileCompletion'
import RequestorProfile from './Screens/RequestorProfile'
import ProviderProfile from './Screens/ProviderProfile'
import Constants from 'expo-constants'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as SecureStore from "expo-secure-store";
import { ActivityIndicator } from 'react-native-paper';
import { AuthContext } from './components/Context';

const LoginStack = createStackNavigator();

const LoginStackScreen = ({ navigation }) => (
  <LoginStack.Navigator initialRouteName="Login" headerMode="none">
    <LoginStack.Screen name="Login" component={Login} headerMode="none" />
    <LoginStack.Screen name="Register" component={Register} headerMode="none" />
  </LoginStack.Navigator>
)

const RootStack = createStackNavigator();
const RootStackScreen = ({ navigation }) => (
  <RootStack.Navigator initialRouteName="ProviderProfile" headerMode="none">
    <RootStack.Screen name="ProviderProfile" component={ProviderProfile} headerMode="none" />
    <RootStack.Screen name="RequestorProfile" component={RequestorProfile} headerMode="none" />
    <RootStack.Screen name="ProviderProfileCompletion" component={ProviderProfileCompletion} headerMode="none" />
    <RootStack.Screen name="RequestorProfileCompletion" component={RequestorProfileCompletion} headerMode="none" />
    <RootStack.Screen name="Map" component={Map} headerMode="none" />
  </RootStack.Navigator>
)

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState(null);

  const authContext = React.useMemo(() => ({
    signIn: () => {
      setToken('dasdsa')
      setIsLoading(false)
    },
    signOut: () => {
      setToken(null)
      setIsLoading(false)
    },
    signUp: () => {
      setToken('dasdsa')
      setIsLoading(false)
    },
  }))

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  }, [])

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size='large' />
      </View>
    )
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {token !== null ? (
          <RootStackScreen />
        )
          :
          <LoginStackScreen />
        }
      </NavigationContainer>
    </AuthContext.Provider>

  );
}