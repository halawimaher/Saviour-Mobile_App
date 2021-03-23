import React from 'react'
import { Text, View, StyleSheet, Dimensions, Button, TouchableOpacity } from 'react-native';
import { useFonts, RhodiumLibre_400Regular } from '@expo-google-fonts/rhodium-libre';
import AppLoading from 'expo-app-loading';
import { Ionicons } from '@expo/vector-icons';

function BookingConfirmationScreen({ navigation }) {

     let [fontsLoaded] = useFonts({
          RhodiumLibre_400Regular,
     });

     if (!fontsLoaded) {
          return <AppLoading />;
     } else {
          return (
               <View style={styles.container}>
                    <Ionicons name="arrow-back-outline" size={46} color='black' onPress={() => navigation.goBack()} />
                    <Text style={styles.header}>Confirm <Text style={styles.centerText}>Booking</Text> Details</Text>
                    <View style={styles.section}>
                         <Text style={styles.title}>Requestor</Text>
                         <Text style={styles.other}>Requestor's name</Text>
                    </View>
                    <View style={styles.section}>
                         <Text style={styles.title}>Provider</Text>
                         <Text style={styles.other}>Provider's name</Text>
                    </View>
                    <View style={styles.section}>
                         <Text style={styles.title}>Location</Text>
                         <Text style={styles.other}>city</Text>
                    </View>
                    <TouchableOpacity
                         style={styles.button}
                         title="Confirm Booking"
                    //    onPress={AddCoords}
                    ><Text style={styles.buttonText}>Confirm Location</Text></TouchableOpacity>
               </View>
          )
     }
}

export default BookingConfirmationScreen

const styles = StyleSheet.create({
     container: {
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'center',
     },
     header: {
          fontSize: 26,
          fontFamily: 'RhodiumLibre_400Regular',
          alignSelf: 'center'
     },
     centerText: {
          color: '#00C2FF',
          fontFamily: 'RhodiumLibre_400Regular'
     },
     section: {
          padding: 10,
     },
     title: {
          fontSize: 22,
          color: '#00C2FF',
          fontFamily: 'RhodiumLibre_400Regular'
     },
     other: {
          fontSize: 18,
          fontFamily: 'RhodiumLibre_400Regular',
          paddingLeft: 10
     },
     button: {
          borderRadius: 40,
          width: 235,
          height: 44,
          backgroundColor: '#00C2FF',
          margin: 5,
          alignSelf: 'center'
     },
     buttonText: {
          paddingTop: 10,
          textAlign: 'center',
          fontSize: 16,
          color: '#fff',
          fontFamily: 'RhodiumLibre_400Regular'
     },
})