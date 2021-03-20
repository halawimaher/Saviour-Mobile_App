import React, { useState } from 'react'
import { ScrollView, Dimensions, Image, Alert, Button, TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

function ProviderProfileCompletion({ navigation }) {
     const [itemValue, setItemValue] = useState('')
     const [date, setDate] = useState(new Date());
     const [show, setShow] = useState(false);

     const handleChange = (event, selectedDate) => {
          const currentDate = selectedDate || date;
          setShow(Platform.OS === 'Android');
          setDate(currentDate);
          console.log(currentDate)
     };

     const showTimepicker = () => {
          setShow(true);
     };

     return (
          <ScrollView contentContainerStyle={styles.contentContainer}>
               <View style={styles.wrapper}>
                    <Ionicons name="arrow-back-outline" size={46} color='black' style={{ alignSelf: 'flex-start' }} onPress={() => navigation.goBack()} />
                    <Text style={styles.paragraph}><Text style={styles.primaryText}>What hours</Text> do you prefer to work on?</Text>
                    <View style={styles.picker}>
                         <View>
                              <Button onPress={showTimepicker} title="Show date picker!" />
                         </View>
                         <View>
                              <Button onPress={showTimepicker} title="Show time picker!" />
                         </View>
                         {show && (
                              <DateTimePicker
                                   testID="dateTimePicker"
                                   value={date}
                                   mode='time'
                                   is24Hour={true}
                                   display="default"
                                   onChange={handleChange}
                              />
                         )}
                    </View>
                    {/* <TouchableOpacity
                         style={styles.button}
                    // onPress={e.preventDefault()}
                    ><Text style={styles.buttonText}>Choose Working Hours</Text>
                    </TouchableOpacity> */}
                    <TextInput
                         // value={this.state.username}
                         // onChangeText={(username) => this.setState({ username })}
                         placeholder={'Rate/Hour in LBP'}
                         style={styles.input}
                         numeric
                         keyboardType={'numeric'}
                    />
                    <View style={styles.text}>
                         <Text style={styles.paragraph}><Text style={styles.primaryText}>Final Verification Step</Text> To get verified and have your profile appear to other clients, please upload an image of your passport’s first page (Applicatble to non-Lebanese persons)</Text>
                    </View>
                    <TouchableOpacity
                         style={styles.button}
                    // onPress={e.preventDefault()}
                    ><Text style={styles.buttonText}>Upload Docs</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                         style={styles.submitButton}
                    // onPress={e.preventDefault()}
                    ><Text style={styles.buttonText} onPress={() => navigation.navigate('ProviderProfile')} >Continue</Text>
                    </TouchableOpacity>
               </View>
          </ScrollView >
     )
}

const styles = StyleSheet.create({
     contentContainer: {
          flex: 1,
          // paddingVertical: 20,
          alignItems: 'center',
          justifyContent: 'center',
     },
     wrapper: {
          flex: 1,
          paddingTop: 30,
          alignItems: 'center',
          justifyContent: 'center',
     },
     picker: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'flex-start',
          marginTop: 30,
          marginBottom: 5
     },
     input: {
          width: 280,
          padding: 10,
          borderWidth: 1,
          borderColor: 'black',
          marginBottom: 20,
          borderRadius: 40
     },
     paragraph: {
          fontWeight: 'bold'
     },
     primaryText: {
          color: '#00C2FF'
     },
     text: {
          marginBottom: 10,
          padding: 20
     },
     button: {
          borderRadius: 40,
          width: 235,
          height: 44,
          backgroundColor: '#00C2FF',
          margin: 20,
     },
     submitButton: {
          borderRadius: 40,
          width: 235,
          height: 44,
          backgroundColor: 'orange',
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
