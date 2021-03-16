import React, { useContext, useState } from 'react';
import Checkbox from 'expo-checkbox';
import { FlatList, Image, Alert, Button, TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import { AuthContext } from '../components/Context';

export default function Register({ navigation }) {
     const [isChecked, setChecked] = useState(false);

     const { signUp } = useContext(AuthContext);

     const [data, setData] = useState({
          name: '',
          city: '',
          phone: '',
          email: '',
          password: ''
     })

     const nameInputChange = (val) => {
          if (val.length != 0) {
               setData({
                    ...data,
                    name: val,
               })
          }
     }
     const cityInputChange = (val) => {
          if (val.length != 0) {
               setData({
                    ...data,
                    city: val,
               })
          }
     }
     const phoneInputChange = (val) => {
          if (val.length != 0) {
               setData({
                    ...data,
                    phone: val,
               })
          }
     }
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

     return (
          <ScrollView style={styles.wrapper}>
               <Text style={styles.logoText}> <Text style={{ color: '#00C2FF' }}>S</Text>aviour</Text>
               <TextInput
                    onChangeText={(val) => nameInputChange(val)}
                    placeholder={'Name'}
                    style={styles.input}
               />
               <TextInput
                    onChangeText={(val) => cityInputChange(val)}
                    placeholder={'City'}
                    style={styles.input}
               />
               <TextInput
                    onChangeText={(val) => phoneInputChange(val)}
                    placeholder={'Phone'}
                    style={styles.input}
                    numeric
                    keyboardType={'numeric'}
               />
               <TextInput
                    onChangeText={(val) => emailInputChange(val)}
                    placeholder={'Email'}
                    style={styles.input}
               />
               <TextInput
                    onChangeText={(val) => passInputChange(val)}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    style={styles.input}
               />

               <View style={styles.section}>
                    <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
                    <Text style={styles.paragraph}>Requestor</Text>
                    <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
                    <Text style={styles.paragraph}>Provider</Text>
               </View>


               <TouchableOpacity
                    style={styles.button}
                    onPress={() => signUp()}
               ><Text style={styles.buttonText}>Create Account</Text>
               </TouchableOpacity>

               <Text style={styles.promptText}>Already Have an Account?<Text style={{ color: '#00C2FF' }} onPress={() => navigation.navigate('Login')}> Sign In!</Text></Text>
          </ScrollView >
     );
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
     },
     logoText: {
          fontSize: 64,
     },
     input: {
          width: 250,
          height: 44,
          padding: 10,
          borderWidth: 1,
          borderColor: 'black',
          marginBottom: 10,
          borderRadius: 40
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
          fontWeight: 'bold',
          color: '#fff',
     },
     promptText: {
          paddingTop: 30,
          fontSize: 16,
     },
     section: {
          flexDirection: 'row',
          alignItems: 'center',
     },
     paragraph: {
          fontSize: 15,
     },
     checkbox: {
          margin: 8,
     },
});
