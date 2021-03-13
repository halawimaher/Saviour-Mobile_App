import React, { useState } from 'react';
import Checkbox from 'expo-checkbox';
import { Image, Alert, Button, TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function Register() {
     const [isChecked, setChecked] = useState(false);

     return (
          <View style={styles.container}>
               <Text style={styles.logoText}> <Text style={{ color: '#00C2FF' }}>S</Text>aviour</Text>
               <TextInput
                    // value={this.state.username}
                    // onChangeText={(username) => this.setState({ username })}
                    placeholder={'Name'}
                    style={styles.input}
               />
               <TextInput
                    // value={this.state.password}
                    // onChangeText={(password) => this.setState({ password })}
                    placeholder={'City'}
                    secureTextEntry={true}
                    style={styles.input}
               />
               <TextInput
                    // value={this.state.password}
                    // onChangeText={(password) => this.setState({ password })}
                    placeholder={'Phone'}
                    secureTextEntry={true}
                    style={styles.input}
               />
               <TextInput
                    // value={this.state.password}
                    // onChangeText={(password) => this.setState({ password })}
                    placeholder={'Email'}
                    secureTextEntry={true}
                    style={styles.input}
               />
               <TextInput
                    // value={this.state.password}
                    // onChangeText={(password) => this.setState({ password })}
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
               // onPress={e.preventDefault()}
               ><Text style={styles.buttonText}>Create Account</Text>
               </TouchableOpacity>

               <Text style={styles.promptText}>Already Have an Account?<Text style={{ color: '#00C2FF' }}> Sign In!</Text></Text>
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
     promptText: {
          fontSize: 20,
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
