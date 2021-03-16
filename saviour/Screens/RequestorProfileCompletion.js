import React from 'react'
import { Image, Alert, Button, TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import logo from '../assets/logo.png';

function RequestorProfileCompletion() {
     return (
          <View style={styles.wrapper}>
               <Text style={styles.paragraph}><Text style={styles.primaryText}>Final Step!</Text> We just need your location to better connect you with providers.</Text>
               <Text style={styles.paragraph}><Text style={styles.primaryText}>Don't Worry!</Text> the only people who will see it are providers after you have booked an appointment.</Text>
               <TouchableOpacity
                    style={styles.button}
               // onPress={e.preventDefault()}
               ><Text style={styles.buttonText}>Set Location</Text>
               </TouchableOpacity>
               <TouchableOpacity
                    style={styles.submitButton}
               // onPress={e.preventDefault()}
               ><Text style={styles.buttonText}>Continue</Text>
               </TouchableOpacity>
               <Image style={styles.logo} source={logo} />
          </View>
     )
}

const styles = StyleSheet.create({
     wrapper: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-evenly',
          width: 240,
          maxHeight: 400,
     },
     logo: {
          width: 350,
          height: 200,
     },
     paragraph: {
          paddingBottom: 30,
          fontWeight: 'bold'
     },
     primaryText: {
          color: '#00C2FF'
     },
     button: {
          borderRadius: 40,
          width: 135,
          height: 44,
          backgroundColor: '#00C2FF',
          margin: 20,
     },
     submitButton: {
          borderRadius: 40,
          width: 135,
          height: 44,
          backgroundColor: 'orange',
          margin: 20,
     },
     buttonText: {
          paddingTop: 10,
          textAlign: 'center',
          fontSize: 16,
          fontWeight: 'bold',
          color: '#fff',
     },
})

export default RequestorProfileCompletion
