import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Screens/Login'
import Register from './Screens/Register'
import RequestorProfileCompletion from './Screens/RequestorProfileCompletion'
import ProviderProfileCompletion from './Screens/ProviderProfileCompletion'
import RequestorProfile from './Screens/RequestorProfile'
import ProviderProfile from './Screens/ProviderProfile'
import Constants from 'expo-constants'

export default function App() {
  return (
    <View style={styles.container}>
      <RequestorProfileCompletion />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: Constants.statusBarHeight,
  },
});
