import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useMemo, useReducer } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage'
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

  /**
   * Initial login data state
   */
  initialLoginState = {
    isLoading: true,
    userName: null,
    email: null,
    userToken: null
  }

  /**
   * 
   * @param {*} prevState 
   * @param {*} action 
   * Login Reducer
   */
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        }
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.userName,
          email: action.email,
          userToken: action.token,
          isLoading: false
        }
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          email: null,
          userToken: null,
          isLoading: false
        }
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.userName,
          email: action.email,
          userToken: action.token,
          isLoading: false
        }
    }
  }

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState)

  const authContext = useMemo(() => ({

    /**
     * 
     * @param {*} userName 
     * @param {*} email 
     * @param {*} password 
     * User Login
     */
    signIn: async (userName, email, password) => {
      let userToken;
      userToken = null
      const response = await fetch('http:192.168.1.6:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify(
          {
            'userName': userName,
            'email': email,
            'password': password
          }
        ),
      })
      const result = await response.json();
      if (userName == userName && email == email && password == password) {
        try {
          userToken = result.access_token,
            await AsyncStorage.setItem('userToken', userToken)
        } catch (e) {
          alert('Invalid Credentials!')
        }

      }
      console.log(userToken)
      dispatch({ type: 'LOGIN', userName: userName, email: email, token: userToken })
    },

    /**
     * Logout Function
     */
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken')
      } catch (e) {
        console.log(e)
      }
      dispatch({ type: 'LOGOUT', token: null })
    },

    /**
     * 
     * @param {*} userName 
     * @param {*} email 
     * @param {*} password 
     * Registration Function
     */
    signUp: async (userName, email, password) => {
      let userToken;
      userToken = null
      const response = await fetch('http:192.168.1.6:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(
          {
            'userName': userName,
            'email': email,
            'password': password
          }
        ),
      })
      console.warn(response)
      const result = await response.json();
      console.warn(result)
      if (result.access_token) {
        try {
          userToken = result.access_token,
            await AsyncStorage.setItem('userToken', userToken)
        } catch (e) {
          console.log(e)
        }
      }
      dispatch({ type: 'LOGIN', userName: userName, email: email, token: userToken })
    },
  }), [])

  useEffect(() => {
    setTimeout(async () => {
      let userToken
      userToken = null
      try {
        userToken = await AsyncStorage.getItem('userToken')
      } catch (e) {
        console.log(e)
      }
      dispatch({ type: 'REGISTER', token: userToken })
    }, 1000);
  }, [])

  if (loginState.isLoading) {
    return (
      <View>
        <ActivityIndicator size='large' />
      </View>
    )
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {(loginState.userToken !== null && loginState.userToken !== undefined) ? (
          <RootStackScreen />
        )
          :
          <LoginStackScreen />
        }
      </NavigationContainer>
    </AuthContext.Provider>

  );
}