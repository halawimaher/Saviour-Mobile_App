import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Platform, StatusBar, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useFonts, RhodiumLibre_400Regular } from '@expo-google-fonts/rhodium-libre';
import AppLoading from 'expo-app-loading';
import * as ImagePicker from 'expo-image-picker'
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from "react-native-elements";
import Constants from 'expo-constants'

function RequestorProfile() {
     const [image, setImage] = useState(null)

     let [fontsLoaded] = useFonts({
          RhodiumLibre_400Regular,
     });

     useEffect(() => {
          async function getPermission() {
               if (Platform.OS != 'web') {
                    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
                    if (status != 'granted') {
                         alert('Permission denied!')
                    }
               }
          }
          getPermission()
     }, [])

     const PickImage = async () => {
          let result = await ImagePicker.launchImageLibraryAsync({
               mediaTypes: ImagePicker.MediaTypeOptions.All,
               allowsEditing: true,
               aspect: [4, 3],
               quality: 1
          })
          if (!result.cancelled) {
               setImage(result.uri)
          }
     }

     if (!fontsLoaded) {
          return <AppLoading />;
     } else {
          return (
               <ScrollView style={styles.wrapper}>
                    <View style={styles.welcomeMessage}>
                         <Text style={styles.paragraph}>Hello <Text style={styles.primaryText}>Nour</Text> </Text>
                         <Text style={styles.logOut}>Log Out</Text>
                    </View>
                    <View style={styles.imagePicker}>
                         {!image ? <Avatar
                              size={200}
                              icon={{ name: 'user', color: 'grey', type: 'font-awesome' }}
                              overlayContainerStyle={{ backgroundColor: 'white', borderRadius: 100 }}
                              activeOpacity={0.7}
                              containerStyle={{ borderWidth: 5, borderRadius: 100 }}
                         />
                              :
                              <Image source={{ uri: image }} style={styles.image} />}
                         <TouchableOpacity style={styles.imageButton} onPress={PickImage}>
                              <Ionicons name="camera" size={46} color='orange' />
                         </TouchableOpacity>
                         <StatusBar style='auto' />
                    </View>
                    <View style={styles.buttonGrid}>
                         <TouchableOpacity
                              style={styles.button}
                         // onPress={e.preventDefault()}
                         ><Text style={styles.buttonText}>Book an Appointment</Text>
                         </TouchableOpacity>
                         <TouchableOpacity
                              style={styles.button}
                         // onPress={e.preventDefault()}
                         ><Text style={styles.buttonText}>Change Location</Text>
                         </TouchableOpacity>
                         <TouchableOpacity
                              style={styles.button}
                         // onPress={e.preventDefault()}
                         ><Text style={styles.buttonText}>See Your Reviews</Text>
                         </TouchableOpacity>
                    </View>
               </ScrollView>
          )
     }
}
const styles = StyleSheet.create({
     wrapper: {
          width: 350,
          backgroundColor: '#fff',
          paddingTop: 20,
          marginTop: Constants.statusBarHeight,
     },
     welcomeMessage: {
          flex: 1,
          flexDirection: 'row',
          alignContent: 'flex-start',
          justifyContent: 'space-between',
          fontFamily: 'RhodiumLibre_400Regular'
     },
     logOut: {
          color: '#00C2FF',
          fontSize: 16,
          alignSelf: 'center',
          fontFamily: 'RhodiumLibre_400Regular'
     },
     paragraph: {
          paddingBottom: 10,
          fontSize: 36,
          fontFamily: 'RhodiumLibre_400Regular'
     },
     primaryText: {
          color: '#00C2FF',
          fontSize: 36,
          fontFamily: 'RhodiumLibre_400Regular'
     },
     imagePicker: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
     },
     image: {
          flex: 1,
          borderRadius: 100,
          width: 200,
          height: 200
     },
     imageButton: {
          alignSelf: 'center',
          position: "absolute",
          bottom: 15,
          right: 75,
          width: 55,
          height: 55,
          borderWidth: 4,
          borderColor: 'orange',
          borderRadius: 40,
     },
     buttonGrid: {
          flex: 1,
          alignItems: 'center',
          marginTop: 50

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
          fontFamily: 'RhodiumLibre_400Regular',
          color: '#fff',
     },
})

export default RequestorProfile
