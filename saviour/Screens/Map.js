import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions, Button, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { NavigationContainer } from '@react-navigation/native';

export default function Map({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const latitudeDelta = 0.093
  const longitudeDelta = 0.0421

  const AddCoords = async () => {
    const typeRequestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        requestor_id: user_id
      }),
    };

    const typeUrl = `http://192.168.1.6:8000/api/bookings`;
    const response = await fetch(typeUrl, typeRequestOptions);
    const result = await response.json();
    navigation.navigate('BookingConfirmationScreen')
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location)
    })();
  }, []);

  return (
    <View style={styles.container}>

      {location ?
        <MapView
          style={styles.map}
          showsUserLocation
          initialRegion={
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta,
              longitudeDelta
            }
          }
        /> : <Text>Loading...</Text>}
      <TouchableOpacity
        style={styles.button}
        title="Set Location"
        onPress={AddCoords}
      ><Text style={styles.buttonText}>Confirm Location</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.9,
  },
  button: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.1,
    backgroundColor: 'orange'
  },
  buttonText: {
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 26,
    color: '#fff',
    // fontFamily: 'RhodiumLibre_400Regular'
  },
});