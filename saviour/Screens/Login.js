import React, { Component } from 'react';
import { Image, Alert, Button, TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import logo from '../assets/logo.png';

export default function Login() {

     return (
          <View style={styles.container}>
               <Image style={styles.logo} source={logo} />
               <Text style={styles.logoText}> <Text style={{ color: '#00C2FF' }}>S</Text>aviour</Text>
               <TextInput
                    // value={this.state.username}
                    // onChangeText={(username) => this.setState({ username })}
                    placeholder={'Email'}
                    style={styles.input}
               />
               <View>
                    <TextInput
                         // value={this.state.password}
                         // onChangeText={(password) => this.setState({ password })}
                         placeholder={'Password'}
                         secureTextEntry={true}
                         style={styles.input}
                    />
                    <Text style={styles.smallText}>Forgot Password?</Text>
               </View>
               <TouchableOpacity
                    style={styles.button}
               // onPress={e.preventDefault()}
               ><Text style={styles.buttonText}>Login</Text>
               </TouchableOpacity>

               <Text style={styles.promptText}>Don't Have an Account? <Text style={{ color: '#00C2FF' }}>Sign Up!</Text></Text>
          </View >
     );
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
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
          width: 135,
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
          fontSize: 20,
     }
});
