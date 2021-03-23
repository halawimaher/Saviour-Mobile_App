import React, { useState } from 'react'
import { Image, TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import logo from '../assets/logo.png';
import { useFonts, RhodiumLibre_400Regular } from '@expo-google-fonts/rhodium-libre';
import AppLoading from 'expo-app-loading';
import { Ionicons } from '@expo/vector-icons';

function FeedbackForRequestorsScreen({ navigation }) {

     const [data, setData] = useState({
          requestor_id: 302,
          rating: '',
          feedback: ''
     })

     const ratingInputChange = (val) => {
          if (val.length != 0) {
               setData({
                    ...data,
                    rating: val,
               })
          }
     }
     const feedbackInputChange = (val) => {
          if (val.length != 0) {
               setData({
                    ...data,
                    feedback: val,
               })
          }
     }

     const submitRating = async () => {
          const typeRequestOptions = {
               method: "POST",
               headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    //Authorization: "Bearer " + token,
               },
               body: JSON.stringify({
                    requestor_id: data.requestor_id,
                    rating: data.rating,
                    feedback: data.feedback
               }),
          };

          const typeUrl = `http://192.168.1.6:8000/api/requestor-feedback`;
          const response = await fetch(typeUrl, typeRequestOptions);
          const result = await response.json();
          // navigation.navigate('ProvidersList')
          alert('nice')
     }


     let [fontsLoaded] = useFonts({
          RhodiumLibre_400Regular,
     });

     if (!fontsLoaded) {
          return <AppLoading />;
     } else {
          return (
               <>
                    <Ionicons name="arrow-back-outline" size={46} color='black' onPress={() => navigation.goBack()} />
                    <View style={styles.container}>

                         <Image style={styles.logo} source={logo} />
                         <Text style={styles.logoText}> <Text style={{ color: '#00C2FF' }}>Submit</Text> Rating</Text>
                         <TextInput
                              onChangeText={(val) => ratingInputChange(val)}
                              placeholder={'Rating (1 -> 5)'}
                              keyboardType={'numeric'}
                              required
                              maxLength={1}
                              style={styles.rating}
                              autoCapitalize='none'
                         />
                         <View>
                              <TextInput
                                   onChangeText={(val) => feedbackInputChange(val)}
                                   placeholder={'Additional Feedback'}
                                   style={styles.input}
                              />
                         </View>
                         <TouchableOpacity
                              style={styles.button}
                              onPress={submitRating}
                         ><Text style={styles.buttonText}>Submit Feedback</Text>
                         </TouchableOpacity>
                    </View >
               </>
          )
     }
}

export default FeedbackForRequestorsScreen

const styles = StyleSheet.create({
     container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff'
     },
     logo: {
          width: 350,
          height: 200,
     },
     logoText: {
          fontSize: 50,
     },
     input: {
          width: 250,
          height: 44,
          padding: 10,
          borderWidth: 1,
          borderColor: 'black',
          marginBottom: 10,
          borderRadius: 40,
          textAlign: 'center'
     },
     rating: {
          width: 250,
          height: 44,
          padding: 10,
          borderWidth: 1,
          borderColor: 'black',
          marginBottom: 10,
          borderRadius: 40,
          textAlign: 'center'
     },
     button: {
          borderRadius: 40,
          width: 155,
          height: 44,
          backgroundColor: '#00C2FF',
          margin: 20,
     },
     buttonText: {
          paddingTop: 10,
          textAlign: 'center',
          fontSize: 16,
          fontWeight: 'bold',
          color: '#fff',
     },
     smallText: {
          color: '#00C2FF',
          fontSize: 10,
          alignSelf: 'flex-end',
          paddingTop: 0
     },
     promptText: {
          fontSize: 16,
     }
});