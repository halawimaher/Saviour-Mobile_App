import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions, Button } from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

export default function Map() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const latitudeDelta = 0.093
  const longitudeDelta = 0.0421

  const AddCoords = async () => {
    const typeRequestOptions = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }),
    };

    const typeUrl = `http://192.168.1.6:8000/api/requestors/1`;
    const response = await fetch(typeUrl, typeRequestOptions);
    const result = await response.json();
    alert('posted')
    console.log(result)
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
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        title="Confirm"
        onPress={AddCoords}
      />
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
    height: Dimensions.get('window').height,
    zIndex: -1
  },
  button: {
    zIndex: 10,
    position: 'absolute',
    bottom: 10,
    left: 50
  }
});