import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Platform, StatusBar, Image, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from "react-native-elements";
import Constants from 'expo-constants'

function ProviderProfile() {
     const [image, setImage] = useState(null)

     useEffect(() => {
          async function doSomething() {
               if (Platform.OS != 'web') {
                    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
                    if (status != 'granted') {
                         alert('Permission denied!')
                    }
               }
          }
          doSomething()
     }, [])

     const PickImage = async () => {
          let result = await ImagePicker.launchImageLibraryAsync({
               mediaTypes: ImagePicker.MediaTypeOptions.All,
               allowsEditing: true,
               aspect: [4, 3],
               quality: 1
          })
          console.log(result)
          if (!result.cancelled) {
               setImage(result.uri)
          }
     }
     return (
          <ScrollView style={styles.wrapper}>
               <View style={styles.welcomeMessage}>
                    <Text style={styles.paragraph}>Hello <Text style={styles.primaryText}>Jane</Text> </Text>
                    <Text style={styles.logOut}>Log Out</Text>
               </View>
               <View style={styles.imagePicker}>
                    {!image ? <Avatar
                         size={200}
                         icon={{ name: 'user', color: 'orange', type: 'font-awesome' }}
                         overlayContainerStyle={{ backgroundColor: 'white', borderRadius: 100 }}
                         activeOpacity={0.7}
                         containerStyle={{ borderWidth: 5, borderRadius: 100 }}
                    />
                         :
                         <Image source={{ uri: image }} style={styles.image} />}
                    <TouchableOpacity style={styles.imageButton} onPress={PickImage}>
                         <Ionicons name="camera" size={46} color='#00C2FF' />
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
          justifyContent: 'space-between'
     },
     logOut: {
          color: '#00C2FF',
          fontSize: 16,
          alignSelf: 'center'
     },
     paragraph: {
          paddingBottom: 10,
          fontWeight: 'bold',
          fontSize: 40
     },
     primaryText: {
          color: '#00C2FF',
          fontSize: 40
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
          borderColor: '#00C2FF',
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
          fontWeight: 'bold',
          color: '#fff',
     },
})

export default ProviderProfile
