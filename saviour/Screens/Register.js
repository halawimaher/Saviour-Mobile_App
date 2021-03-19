import React, { useContext, useState } from 'react';
import Checkbox from 'expo-checkbox';
import { TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import { AuthContext } from '../components/Context';
import { useFonts, RhodiumLibre_400Regular } from '@expo-google-fonts/rhodium-libre';
import AppLoading from 'expo-app-loading';

export default function Register({ navigation }) {

     let [fontsLoaded] = useFonts({
          RhodiumLibre_400Regular,
     });

     const [isRequestor, setRequestor] = useState(false);
     const [isProvider, setProvider] = useState(false);
     const { signUp } = useContext(AuthContext);

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
                    role_id: 1,
               })
               console.log(data)
          }
     }

     const newRequestor = (val) => {
          if (val.length != 0) {
               setData({
                    ...data,
                    role_id: 2,
               })
               console.log(data)
          }
     }

     const registerHandle = (name, email, password, city, address, phone, role_id) => {
          signUp(name, email, password, city, address, phone, role_id)
     }

     if (!fontsLoaded) {
          return <AppLoading />;
     } else {
          return (
               <ScrollView style={styles.wrapper}>
                    <Text style={styles.logoText}> <Text style={{ color: '#00C2FF' }}>S</Text>aviour</Text>
                    <TextInput
                         onChangeText={(val) => newNameInputChange(val)}
                         placeholder={'Name'}
                         style={styles.input}
                    />
                    <TextInput
                         onChangeText={(val) => newCityInputChange(val)}
                         placeholder={'City'}
                         style={styles.input}
                    />
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
                         <Checkbox style={styles.checkbox} id="requestor" name="requestor" value={isRequestor} onValueChange={(val) => { newProvider(val), setRequestor(!isRequestor), setProvider(false) }} />
                         <Text style={styles.paragraph}>Requestor</Text>
                         <Checkbox style={styles.checkbox} id="provider" name="provider" value={isProvider} onValueChange={(val) => { newRequestor(val), setProvider(!isProvider), setRequestor(false) }} />
                         <Text style={styles.paragraph}>Provider</Text>
                    </View>


                    <TouchableOpacity
                         style={styles.button}
                         onPress={() => registerHandle(data.name, data.email, data.password, data.city, data.address, data.phone, data.role_id)}
                    ><Text style={styles.buttonText}>Create Account</Text>
                    </TouchableOpacity>

                    <Text style={styles.promptText}>Already Have an Account?<Text style={{ color: '#00C2FF' }} onPress={() => navigation.navigate('Login')}> Sign In!</Text></Text>
               </ScrollView >
          );
     }
}

const styles = StyleSheet.create({
     wrapper: {
          flex: 1,
          width: 'auto',
          padding: 45
     },
     logo: {
          width: 350,
          height: 200,
          fontFamily: 'RhodiumLibre_400Regular'
     },
     logoText: {
          fontSize: 64,
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
     button: {
          borderRadius: 40,
          width: 165,
          height: 44,
          backgroundColor: '#00C2FF',
          marginLeft: 40,
     },
     buttonText: {
          paddingTop: 10,
          textAlign: 'center',
          fontSize: 14,
          color: '#fff',
          fontFamily: 'RhodiumLibre_400Regular'
     },
     promptText: {
          paddingTop: 50,
          fontSize: 15,
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
