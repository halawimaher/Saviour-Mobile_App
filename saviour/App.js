import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useMemo, useReducer } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Screens/Login'
import Register from './Screens/Register'
import Map from './Screens/Map'
import RequestorProfileCompletion from './Screens/RequestorProfileCompletion'
import ProviderProfileCompletion from './Screens/ProviderProfileCompletion'
import RequestorProfile from './Screens/RequestorProfile'
import RequestorProfile2 from './Screens/RequestorProfile2'
import ProviderProfile from './Screens/ProviderProfile'
import ProviderActionScreen from './Screens/ProviderActionScreen'
import RequestorActionScreen from './Screens/RequestorActionScreen'
import ProvidersList from './Screens/ProvidersList'
import ProviderComments from './Screens/ProviderComments'
import RequestorComments from './Screens/RequestorComments'
import RequestorBookingsScreen from './Screens/RequestorBookingsScreen'
import BookingConfirmationScreen from './Screens/BookingConfirmationScreen'
import FeedbackForProvidersScreen from './Screens/FeedbackForProvidersScreen'
import FeedbackForRequestorsScreen from './Screens/FeedbackForRequestorsScreen'
import ProviderPreviewScreen from './Screens/ProviderPreviewScreen'
import RequestorPreviewScreen from './Screens/RequestorPreviewScreen'
import ConfirmationDocSubmission from './Screens/ConfirmationDocSubmission'
import RequestorEditProfile from './Screens/RequestorEditProfile'
import ProviderEditProfile from './Screens/ProviderEditProfile'
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

const ProviderStack = createStackNavigator();
const ProviderStackScreen = ({ navigation }) => (
  <ProviderStack.Navigator initialRouteName="ProviderActionScreen" headerMode="none" >
    <ProviderStack.Screen name="ProviderActionScreen" component={ProviderActionScreen} />
    <RequestorStack.Screen name="ProviderProfile" component={ProviderProfile} />
    <ProviderStack.Screen name="RequestorBookingsScreen" component={RequestorBookingsScreen} />
    <ProviderStack.Screen name="ProviderProfileCompletion" component={ProviderProfileCompletion} />
    <ProviderStack.Screen name="FeedbackForRequestorsScreen" component={FeedbackForRequestorsScreen} />
    <ProviderStack.Screen name="Map" component={Map} />
    <ProviderStack.Screen name="ProviderComments" component={ProviderComments} />
    <ProviderStack.Screen name="RequestorComments" component={RequestorComments} />
    <ProviderStack.Screen name="RequestorPreviewScreen" component={RequestorPreviewScreen} />
    <ProviderStack.Screen name="ConfirmationDocSubmission" component={ConfirmationDocSubmission} />
    <ProviderStack.Screen name="ProviderEditProfile" component={ProviderEditProfile} />
  </ProviderStack.Navigator>
)

const RequestorStack = createStackNavigator();
const RequestorStackScreen = ({ navigation }) => (
  <RequestorStack.Navigator initialRouteName="RequestorActionScreen" headerMode="none" >
    <RequestorStack.Screen name="RequestorActionScreen" component={RequestorActionScreen} />
    <RequestorStack.Screen name="RequestorProfile" component={RequestorProfile} />
    <RequestorStack.Screen name="RequestorProfile2" component={RequestorProfile2} />
    <ProviderStack.Screen name="ProvidersList" component={ProvidersList} />
    <RequestorStack.Screen name="RequestorProfileCompletion" component={RequestorProfileCompletion} />
    <RequestorStack.Screen name="Map" component={Map} />
    <ProviderStack.Screen name="RequestorComments" component={RequestorComments} />
    <ProviderStack.Screen name="ProviderComments" component={ProviderComments} />
    <ProviderStack.Screen name="FeedbackForProvidersScreen" component={FeedbackForProvidersScreen} />
    <ProviderStack.Screen name="BookingConfirmationScreen" component={BookingConfirmationScreen} />
    <ProviderStack.Screen name="ProviderPreviewScreen" component={ProviderPreviewScreen} />
    <ProviderStack.Screen name="RequestorEditProfile" component={RequestorEditProfile} />
  </RequestorStack.Navigator>
)

export default function App() {

  /**
   * Initial login data state
   */
  initialLoginState = {
    isLoading: true,
    name: null,
    email: null,
    city: null,
    address: null,
    phone: null,
    userToken: null,
    role_id: null
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
          email: action.email,
          role_id: action.role_id,
          userToken: action.token,
          isLoading: false
        }
      case 'LOGOUT':
        return {
          ...prevState,
          name: null,
          email: null,
          userToken: null,
          isLoading: false
        }
      case 'REGISTER':
        return {
          // ...prevState,
          name: action.name,
          email: action.email,
          city: action.city,
          phone: action.phone,
          address: action.address,
          userToken: action.token,
          isLoading: false
        }
    }
  }

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState)

  const authContext = useMemo(() => ({

    /**
     * 
     * @param {*} name 
     * @param {*} email 
     * @param {*} password 
     * User Login
     */
    signIn: async (email, password) => {
      let userToken;
      userToken = null
      let role_id;
      role_id = null;
      const response = await fetch('http:192.168.1.6:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify(
          {
            'email': email,
            'password': password
          }
        ),
      })
      const result = await response.json();
      if (email == email && password == password) {
        user_id = result.user_id
        try {
          userToken = result.access_token,
            role_id = result.role_id

          await AsyncStorage.setItem('userToken', userToken)
          await AsyncStorage.setItem('role_id', role_id.toString())
          await AsyncStorage.setItem('user_id', user_id.toString())
        } catch (e) {
          alert('Invalid Credentials!')
        }

      }
      dispatch({ type: 'LOGIN', email: email, role_id: role_id, token: userToken })
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
     * @param {*} name 
     * @param {*} email 
     * @param {*} password 
     * @param {*} message
     * @param {*} role_id
     * Registration Function
     */
    signUp: async (name, email, password, city, address, phone, role_id) => {
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
            'name': name,
            'email': email,
            'password': password,
            'city': city,
            'address': address,
            'phone': phone,
            'role_id': role_id
          }
        ),
      })
      const result = await response.json();
      if (result.access_token) {
        try {
          userToken = result.access_token
          role_id = result.role_id
          await AsyncStorage.setItem('userToken', userToken)
          alert('Welcome Aboard')
        } catch (e) {
          console.warn(e)
        }
      } else {
        alert(result.message)
      }
      dispatch({ type: 'REGISTER', name: name, email: email, role_id: role_id, city: city, address: address, phone: phone, token: userToken })
    },
  }), [])

  useEffect(() => {
    setTimeout(async () => {
      let userToken
      userToken = null
      let role_id
      role_id = null
      try {
        userToken = await AsyncStorage.getItem('userToken')
        role_id = await AsyncStorage.getItem('role_id')
      } catch (e) {
        console.log(e)
      }
      dispatch({ type: 'REGISTER', role_id: role_id, token: userToken })
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
        {(loginState.userToken !== null && loginState.userToken !== undefined && loginState.role_id === 2) ? (
          <ProviderStackScreen />
        )
          :
          (loginState.userToken !== null && loginState.userToken !== undefined && loginState.role_id === 3) ? (
            <RequestorStackScreen />
          )
            :
            <LoginStackScreen />
        }
      </NavigationContainer>
    </AuthContext.Provider>

  );
}