import React, { useContext, useState } from 'react';
import { Image, TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import logo from '../assets/logo.png';
import { AuthContext } from '../components/Context'
import { useFonts, RhodiumLibre_400Regular } from '@expo-google-fonts/rhodium-libre';
import AppLoading from 'expo-app-loading';

export default function Login({ navigation }) {

     let [fontsLoaded] = useFonts({
          RhodiumLibre_400Regular,
     });

     const [data, setData] = useState({
          userName: '',
          email: '',
          password: '',
     })

     const { signIn } = useContext(AuthContext)

     const emailInputChange = (val) => {
          if (val.length != 0) {
               setData({
                    ...data,
                    email: val,
               })
          }
     }
     const passInputChange = (val) => {
          if (val.length != 0) {
               setData({
                    ...data,
                    password: val,
               })
          }
     }

     const loginHandle = (email, password, role_id) => {
          signIn(email, password, role_id)
     }

     if (!fontsLoaded) {
          return <AppLoading />;
     } else {
          return (
               <View style={styles.container}>
                    <Image style={styles.logo} source={logo} />
                    <Text style={styles.logoText}> <Text style={{ color: '#00C2FF' }}>S</Text>aviour</Text>
                    <TextInput
                         onChangeText={(val) => emailInputChange(val)}
                         placeholder={'Email'}
                         style={styles.input}
                         autoCapitalize='none'
                    />
                    <View>
                         <TextInput

                              onChangeText={(val) => passInputChange(val)}
                              placeholder={'Password'}
                              secureTextEntry={true}
                              style={styles.input}
                         />
                         {/* <Text style={styles.smallText}>Forgot Password?</Text> */}
                    </View>
                    <TouchableOpacity
                         style={styles.button}
                         onPress={() => { loginHandle(data.email, data.password) }}
                    ><Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    <Text style={styles.promptText}>Don't Have an Account? <Text style={{ color: '#00C2FF' }} onPress={() => navigation.navigate('Register')}>Sign Up!</Text></Text>
               </View >
          );
     }
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff'
     },
     logo: {
          width: 350,
          height: 150,
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
          marginBottom: 10,
          borderRadius: 40,
          fontFamily: 'RhodiumLibre_400Regular'
     },
     button: {
          borderRadius: 40,
          width: 135,
          height: 44,
          backgroundColor: '#00C2FF',
          margin: 20,
     },
     buttonText: {
          paddingTop: 10,
          textAlign: 'center',
          fontSize: 16,
          color: '#fff',
          fontFamily: 'RhodiumLibre_400Regular'
     },
     smallText: {
          color: '#00C2FF',
          fontSize: 10,
          alignSelf: 'flex-end',
          paddingTop: 0,
          fontFamily: 'RhodiumLibre_400Regular'
     },
     promptText: {
          fontSize: 16,
          fontFamily: 'RhodiumLibre_400Regular'
     }
});
