import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, Text, Platform, StatusBar, Image, TouchableOpacity, ScrollView } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import logo from '../assets/logo.png'
import { useFonts, RhodiumLibre_400Regular } from '@expo-google-fonts/rhodium-libre'
import AppLoading from 'expo-app-loading'

function ConfirmationDocSubmission() {

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

     const submitRating = async () => {
          const formData = new FormData()
          formData.append('provider_id', user_id)
          formData.append('confirmation_docs', result.uri)
          const response = await fetch(`http://192.168.1.6:8000/api/confirm-docs`,
               method = "POST",
               headers = {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    //Authorization: "Bearer " + token,
               },
               body = JSON.stringify({
                    provider_id: user_id,
                    confirmation_docs: result.uri
               }))
          const result = await response.json();
          // navigation.navigate('ProvidersList')
          alert('all good')
     }

     const PickImage = async () => {
          let result = await ImagePicker.launchImageLibraryAsync({
               mediaTypes: ImagePicker.MediaTypeOptions.All,
               allowsEditing: true,
               aspect: [4, 3],
               quality: 1
          })
          console.log(result)
          if (!result.cancelled) {
               submitRating()
          }
     }

     let [fontsLoaded] = useFonts({
          RhodiumLibre_400Regular,
     });

     if (!fontsLoaded) {
          return <AppLoading />;
     } else {
          return (
               <View style={styles.wrapper}>
                    <View>
                         <Image style={styles.logo} source={logo} />
                         <StatusBar style='auto' />
                    </View>
                    <View>
                         <Text style={styles.paragraph}>To get your <Text style={{ color: '#00C2FF' }}>VERIFIED</Text> icon, please upload a picture of your <Text style={{ color: '#00C2FF' }}>ID or passport</Text> for review. Once we have verified your account, you will receive a <Text style={{ color: '#00C2FF' }}>Verified plaque</Text>confirming you as a <Text style={{ color: '#00C2FF' }}>trusted</Text> user!</Text>
                    </View>
                    <View>
                         <TouchableOpacity style={styles.imageButton} onPress={PickImage}>
                              <Text style={styles.imageText}>Upload Image of ID Document</Text>
                         </TouchableOpacity>
                    </View>
                    <StatusBar style='auto' />
               </View>
          )
     }
}

export default ConfirmationDocSubmission

const styles = StyleSheet.create({
     wrapper: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-evenly',
          padding: 20,
          backgroundColor: '#fff',
     },
     paragraph: {
          fontFamily: 'RhodiumLibre_400Regular'
     },
     logo: {
          width: 250,
          height: 100,
     },
     imageButton: {
          borderRadius: 40,
          width: 235,
          height: 44,
          backgroundColor: 'red',
          margin: 5,
          alignSelf: 'center'
     },
     imageText: {
          paddingTop: 10,
          textAlign: 'center',
          fontSize: 14,
          color: '#fff',
          fontFamily: 'RhodiumLibre_400Regular'
     },
})