import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, Text, Platform, StatusBar, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useFonts, RhodiumLibre_400Regular } from '@expo-google-fonts/rhodium-libre';
import AppLoading from 'expo-app-loading';
import Constants from 'expo-constants'
import { AuthContext } from '../components/Context'

function ProviderActionScreen({ navigation }) {

     const { signOut } = useContext(AuthContext)

     let [fontsLoaded] = useFonts({
          RhodiumLibre_400Regular,
     });

     if (!fontsLoaded) {
          return <AppLoading />;
     } else {
          return (
               <ScrollView style={styles.wrapper}>
                    <View style={styles.welcomeMessage}>
                         <Text style={styles.paragraph}>Hello </Text>
                         <StatusBar style='auto' />
                    </View>
                    <View style={styles.buttonGrid}>
                         <TouchableOpacity
                              style={styles.button}
                              onPress={() => navigation.navigate('RequestorBookingsScreen')}
                         ><Text style={styles.buttonText}>See Who Needs Your Help</Text>
                         </TouchableOpacity>
                         <TouchableOpacity
                              style={styles.button}
                              onPress={() => navigation.navigate('ProviderProfile')}
                         ><Text style={styles.buttonText}>View Your Profile</Text>
                         </TouchableOpacity>
                         <TouchableOpacity
                              style={styles.logOut}
                         ><Text style={styles.logOutText} onPress={() => { signOut() }}>Log Out</Text>
                         </TouchableOpacity>
                    </View>
               </ScrollView>
          )
     }
}
const styles = StyleSheet.create({
     wrapper: {
          backgroundColor: '#fff',
          paddingTop: 20,
     },
     welcomeMessage: {
          flex: 1,
          flexDirection: 'column',
          alignContent: 'flex-start',
          justifyContent: 'space-between',
          fontFamily: 'RhodiumLibre_400Regular',
     },
     logOut: {
          borderRadius: 40,
          width: 235,
          height: 44,
          backgroundColor: 'red',
          margin: 5,
          alignSelf: 'center'
     },
     logOutText: {
          paddingTop: 10,
          textAlign: 'center',
          fontSize: 16,
          color: '#fff',
          fontFamily: 'RhodiumLibre_400Regular'
     },
     paragraph: {
          paddingBottom: 10,
          fontSize: 40,
          textAlign: 'center',
          fontFamily: 'RhodiumLibre_400Regular',
          color: '#00C2FF',
     },
     primaryText: {
          color: '#00C2FF',
          fontSize: 40,
          fontFamily: 'RhodiumLibre_400Regular'
     },
     buttonGrid: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 100

     },
     button: {
          borderRadius: 40,
          width: 235,
          height: 44,
          backgroundColor: '#00C2FF',
          margin: 5,
     },
     buttonText: {
          paddingTop: 10,
          textAlign: 'center',
          fontSize: 16,
          color: '#fff',
          fontFamily: 'RhodiumLibre_400Regular'
     },
})

export default ProviderActionScreen
