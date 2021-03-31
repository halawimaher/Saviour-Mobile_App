import React, { useContext, useEffect, useState } from 'react';
import Checkbox from 'expo-checkbox';
import { TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import { AuthContext } from '../components/Context';
import { useFonts, RhodiumLibre_400Regular } from '@expo-google-fonts/rhodium-libre';
import AppLoading from 'expo-app-loading';
import { Picker } from '@react-native-community/picker';
import { Ionicons } from '@expo/vector-icons';


export default function ProviderEditProfile({ navigation }) {


     let [fontsLoaded] = useFonts({
          RhodiumLibre_400Regular,
     });

     const [serverData, setServerData] = useState([]);
     const [selectedValue, setSelectedValue] = useState('')

     const [data, setData] = useState({
          name: '',
          city: '',
          address: '',
          phone: '',
          email: '',
          image: '',
          personal_message: '',
     })

     const newNameInputChange = (val) => {

          if (val.length != 0) {
               setData({
                    ...data,
                    name: val,
               })
          }
     }

     const newEmailInputChange = (val) => {
          if (val.length != 0) {
               setData({
                    ...data,
                    email: val,
               })
          }
     }

     const newCityInputChange = (val) => {
          if (val.length != 0) {
               setData({
                    ...data,
                    city: val,
               })
          }
     }

     const newMessageInputChange = (val) => {
          if (val.length != 0) {
               setData({
                    ...data,
                    personal_message: val,
               })
          }
     }

     const newPhoneInputChange = (val) => {
          if (val.length != 0) {
               setData({
                    ...data,
                    phone: val,
               })
          }
     }

     const newAddressInputChange = (val) => {
          if (val.length != 0) {
               setData({
                    ...data,
                    address: val,
               })
          }
     }

     const handleEdit = async () => {
          const editUrl = `http://192.168.1.6:8000/api/providers/${user_id}`;
          const editRequestOptions = {
               method: "PUT",
               headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    //Authorization: "Bearer " + token,
               },
               body: JSON.stringify({
                    name: data.name,
                    city: data.city,
                    address: data.address,
                    phone: data.phone,
                    email: data.email,
                    personal_message: data.personal_message
               }),
          };
          const response = await fetch(editUrl, editRequestOptions);
          navigation.navigate('ProviderActionScreen')
     }

     useEffect(() => {
          fetch('http://192.168.1.6:8000/api/cities')
               .then((response) => response.json())
               .then((responseJson) => {
                    setServerData(responseJson);
               })
               .catch((error) => {
                    console.error(error);
               });
     }, [])

     if (!fontsLoaded) {
          return <AppLoading />;
     } else {
          return (
               <ScrollView style={styles.wrapper}>
                    <Ionicons name="arrow-back-outline" size={46} color='black' onPress={() => navigation.goBack()} />
                    <View style={styles.container}>
                         <Text style={styles.logoText}> <Text style={{ color: '#00C2FF' }}>S</Text>aviour</Text>
                         <TextInput
                              onChangeText={(val) => newNameInputChange(val)}
                              placeholder={'Name'}
                              style={styles.input}
                         />
                         <Picker
                              selectedValue={selectedValue}
                              style={styles.picker}
                              mode='dialog'
                              onValueChange={(val) => { newCityInputChange(val), setSelectedValue(val) }}>
                              <Picker.Item label='Please select city' value='0' />
                              {serverData.map((item, key) =>
                                   <Picker.Item style={styles.picketItem} key={key} label={item.city} value={item.city} />
                              )}
                         </Picker>

                         <TextInput
                              onChangeText={(val) => newAddressInputChange(val)}
                              placeholder={'Detailed Address'}
                              style={styles.input}
                         />
                         <TextInput
                              onChangeText={(val) => newPhoneInputChange(val)}
                              placeholder={'Phone'}
                              style={styles.input}
                              numeric
                              keyboardType={'numeric'}
                         />
                         <TextInput
                              onChangeText={(val) => newMessageInputChange(val)}
                              placeholder={'Message'}
                              style={styles.input}
                         />
                         <TextInput
                              onChangeText={(val) => newEmailInputChange(val)}
                              placeholder={'Email'}
                              style={styles.input}
                              autoCapitalize='none'
                         />

                         <TouchableOpacity
                              style={styles.button}
                              onPress={() => handleEdit()}
                         ><Text style={styles.buttonText}>Confirm</Text>
                         </TouchableOpacity>
                    </View>
               </ScrollView >
          );
     }
}

const styles = StyleSheet.create({
     wrapper: {
          flex: 1,
     },
     container: {
          flex: 1,
          alignItems: 'center',
          padding: 10
     },
     logo: {
          width: 350,
          height: 200,
          fontFamily: 'RhodiumLibre_400Regular'
     },
     logoText: {
          fontSize: 62,
          fontFamily: 'RhodiumLibre_400Regular'
     },
     input: {
          width: 250,
          height: 44,
          padding: 10,
          borderWidth: 1,
          borderColor: 'black',
          marginBottom: 20,
          borderRadius: 40,
          fontFamily: 'RhodiumLibre_400Regular'
     },
     picker: {
          height: 50,
          width: 200,
          borderWidth: 10,
          borderRadius: 40
     },
     picketItem: {
          fontFamily: 'RhodiumLibre_400Regular',
          // padding: 20,
          textAlign: 'center'
     },
     button: {
          borderRadius: 40,
          width: 165,
          height: 44,
          backgroundColor: '#00C2FF',
     },
     buttonText: {
          paddingTop: 10,
          textAlign: 'center',
          fontSize: 14,
          color: '#fff',
          fontFamily: 'RhodiumLibre_400Regular'
     },
     promptText: {
          paddingTop: 5,
          fontSize: 15,
          color: '#242424',
          fontFamily: 'RhodiumLibre_400Regular'
     },
     section: {
          flexDirection: 'row',
          alignItems: 'center',
     },
     paragraph: {
          fontSize: 15,
          fontFamily: 'RhodiumLibre_400Regular'

     },
     checkbox: {
          margin: 8,
          fontFamily: 'RhodiumLibre_400Regular'
     },
});
