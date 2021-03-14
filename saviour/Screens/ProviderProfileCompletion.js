import React, { useState } from 'react'
import { ScrollView, Image, Alert, Button, TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Picker, Item } from '@react-native-community/picker'
import logo from '../assets/logo.png';

function ProviderProfileCompletion() {
     const [itemValue, setItemValue] = useState('')

     const handleChange = () => {
          setItemValue(itemValue.value),
               console.log(itemValue)
     }

     return (
          <ScrollView style={styles.wrapper}>
               <Text style={styles.paragraph}><Text style={styles.primaryText}>What days</Text> do you prefer to work on?</Text>
               <View style={styles.picker}>
                    <Picker
                         mode='dropdown'
                         selectedValue={itemValue}
                         style={{ height: 20, width: 150 }}
                         onValueChange={(itemValue, itemPosition) => handleChange}
                    >
                         <Picker.Item label="Monday" value="Monday" />
                         <Picker.Item label="Tuesday" value="Tuesday" />
                         <Picker.Item label="Wednesday" value="Wednesday" />
                         <Picker.Item label="Thursday" value="Thursday" />
                         <Picker.Item label="Friday" value="Friday" />
                         <Picker.Item label="Saturday" value="Saturday" />
                         <Picker.Item label="Sunday" value="Sunday" />
                    </Picker>
                    <Picker
                         mode='dropdown'
                         selectedValue='to'
                         style={{ height: 20, width: 150 }}
                    // onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}
                    >
                         <Picker.Item label="Monday" value="Monday" />
                         <Picker.Item label="Tuesday" value="Tuesday" />
                         <Picker.Item label="Wednesday" value="Wednesday" />
                         <Picker.Item label="Thursday" value="Thursday" />
                         <Picker.Item label="Friday" value="Friday" />
                         <Picker.Item label="Saturday" value="Saturday" />
                         <Picker.Item label="Sunday" value="Sunday" />
                    </Picker>
               </View>
               <TouchableOpacity
                    style={styles.button}
               // onPress={e.preventDefault()}
               ><Text style={styles.buttonText}>Choose Working Hours</Text>
               </TouchableOpacity>
               <TextInput
                    // value={this.state.username}
                    // onChangeText={(username) => this.setState({ username })}
                    placeholder={'Rate/Hour in LBP'}
                    style={styles.input}
                    numeric
                    keyboardType={'numeric'}
               />
               <View style={styles.text}>
                    <Text style={styles.paragraph}><Text style={styles.primaryText}>Final Verification Step</Text> To get verified and have your profile appear to other clients, please upload an image of your passport’s first page (Aplicatble to non-Lebanese persons)</Text>
               </View>
               <TouchableOpacity
                    style={styles.button}
               // onPress={e.preventDefault()}
               ><Text style={styles.buttonText}>Continue</Text>
               </TouchableOpacity>
          </ScrollView>
     )
}

const styles = StyleSheet.create({
     wrapper: {
          flex: 1,
          // alignItems: 'center',
          // justifyContent: 'space-evenly',
          width: 300,
          paddingTop: 60
          // maxHeight: 400,
     },
     picker: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'flex-start',
          marginTop: 50,
     },
     input: {
          width: 280,
          padding: 10,
          borderWidth: 1,
          borderColor: 'black',
          marginBottom: 30,
          borderRadius: 40
     },
     paragraph: {
          fontWeight: 'bold'
     },
     primaryText: {
          color: '#00C2FF'
     },
     text: {
          marginBottom: 40,
     },
     button: {
          borderRadius: 40,
          width: 235,
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
})

export default ProviderProfileCompletion
