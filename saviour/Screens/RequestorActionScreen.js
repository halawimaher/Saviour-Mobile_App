import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, Text, Platform, StatusBar, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useFonts, RhodiumLibre_400Regular } from '@expo-google-fonts/rhodium-libre';
import AppLoading from 'expo-app-loading';
import Constants from 'expo-constants'
import { AuthContext } from '../components/Context'

function RequestorActionScreen({ navigation }) {

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
                         <Text style={styles.logOut} onPress={() => { signOut() }}>Log Out</Text>
                         <StatusBar style='auto' />
                    </View>
                    <View style={styles.buttonGrid}>
                         <TouchableOpacity
                              style={styles.button}
                              onPress={() => navigation.navigate('ProvidersList')}
                         ><Text style={styles.buttonText}>Find A Saviour</Text>
                         </TouchableOpacity>
                         <TouchableOpacity
                              style={styles.button}
                              onPress={() => navigation.navigate('RequestorProfile2')}
                         ><Text style={styles.buttonText}>View Your Profile</Text>
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
          color: 'red',
          fontSize: 16,
          alignSelf: 'center',
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

export default RequestorActionScreen
