import React, { useState } from 'react';
import Checkbox from 'expo-checkbox';
import { FlatList, Image, Alert, Button, TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';

export default function Register() {
     const [isChecked, setChecked] = useState(false);

     return (
          <ScrollView style={styles.wrapper}>
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
                    style={styles.input}
               />
               <TextInput
                    // value={this.state.password}
                    // onChangeText={(password) => this.setState({ password })}
                    placeholder={'Phone'}
                    style={styles.input}
                    numeric
                    keyboardType={'numeric'}
               />
               <TextInput
                    // value={this.state.password}
                    // onChangeText={(password) => this.setState({ password })}
                    placeholder={'Email'}
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
