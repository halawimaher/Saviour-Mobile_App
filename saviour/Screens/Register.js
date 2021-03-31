import React, { useContext, useEffect, useState } from 'react';
import Checkbox from 'expo-checkbox';
import { TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import { AuthContext } from '../components/Context';
import { useFonts, RhodiumLibre_400Regular } from '@expo-google-fonts/rhodium-libre';
import AppLoading from 'expo-app-loading';
import { Picker } from '@react-native-community/picker';

export default function Register({ navigation }) {

     let [fontsLoaded] = useFonts({
          RhodiumLibre_400Regular,
     });

     const [isRequestor, setRequestor] = useState(false);
     const [isProvider, setProvider] = useState(false);
     const { signUp } = useContext(AuthContext);
     const { signIn } = useContext(AuthContext)
     const [serverData, setServerData] = useState([]);
     const [selectedValue, setSelectedValue] = useState('')

     const [data, setData] = useState({
          name: '',
          city: '',
          address: '',
          phone: '',
          email: '',
          password: '',
          role_id: ''
     })

     const newNameInputChange = (val) => {

          if (val.length != 0) {
               setData({
                    ...data,
                    name: val,
               })
               console.log(data)
          }
     }

     const newEmailInputChange = (val) => {
          if (val.length != 0) {
               setData({
                    ...data,
                    email: val,
               })
               console.log(data)
          }
     }
     const newPassInputChange = (val) => {
          if (val.length != 0) {
               setData({
                    ...data,
                    password: val,
               })
               console.log(data)
          }
     }

     const newCityInputChange = (val) => {
          if (val.length != 0) {
               setData({
                    ...data,
                    city: val,
               })
               console.log(data)
          }
     }

     const newPhoneInputChange = (val) => {
          if (val.length != 0) {
               setData({
                    ...data,
                    phone: val,
               })
               console.log(data)
          }
     }

     const newAddressInputChange = (val) => {
          if (val.length != 0) {
               setData({
                    ...data,
                    address: val,
               })
               console.log(data)
          }
     }

     const newProvider = (val) => {
          if (val.length != 0) {
               setData({
                    ...data,
                    role_id: 2,
               })
               console.log(data)
          }
     }

     const newRequestor = (val) => {
          if (val.length != 0) {
               setData({
                    ...data,
                    role_id: 3,
               })
               console.log(data)
          }
     }

     const registerHandle = (name, email, password, city, address, phone, role_id) => {
          signUp(name, email, password, city, address, phone, role_id)
          signIn(email, password)
     }


     useEffect(() => {
          fetch('http://192.168.1.6:8000/api/cities')
               .then((response) => response.json())
               .then((responseJson) => {
                    //Successful response from the API Call
                    setServerData(responseJson);
                    console.log(responseJson)
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
                              onChangeText={(val) => newEmailInputChange(val)}
                              placeholder={'Email'}
                              style={styles.input}
                              autoCapitalize='none'
                         />
                         <TextInput
                              onChangeText={(val) => newPassInputChange(val)}
                              placeholder={'Password'}
                              secureTextEntry={true}
                              style={styles.input}
                         />

                         <View style={styles.section}>
                              <Checkbox style={styles.checkbox} id="provider" name="provider" value={isRequestor} onValueChange={(val) => { newProvider(val), setRequestor(!isRequestor), setProvider(false) }} />
                              <Text style={styles.paragraph}>Provider</Text>
                              <Checkbox style={styles.checkbox} id="requestor" name="requestor" value={isProvider} onValueChange={(val) => { newRequestor(val), setProvider(!isProvider), setRequestor(false) }} />
                              <Text style={styles.paragraph}>Requestor</Text>
                         </View>


                         <TouchableOpacity
                              style={styles.button}
                              onPress={() => registerHandle(data.name, data.email, data.password, data.city, data.address, data.phone, data.role_id)}
                         ><Text style={styles.buttonText}>Create Account</Text>
                         </TouchableOpacity>
                         <Text style={styles.promptText}>Already Have an Account?<Text style={{ color: '#00C2FF' }} onPress={() => navigation.navigate('Login')}> Sign In!</Text></Text>
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
