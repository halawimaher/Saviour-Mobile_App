import React, { Component, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function ProvidersList({ navigation }) {

  const [isLoading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false)
  const [userSelected, setUserSelected] = useState([])
  const [data, setData] = useState([])

  const getData = () => {
    fetch('http:192.168.1.6:8000/api/providers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((res) => { setData(res), setLoading(false) })
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    getData()
    console.log(data)
  }, []);

  const clickEventListener = (data) => {
    setUserSelected(data)
    setModalVisible(true)
  };

  return (
    <ScrollView style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width }}>
      <View style={styles.container}>
        <Ionicons name="arrow-back-outline" size={46} color='black' onPress={() => navigation.goBack()} />
        <Text style={{ fontSize: 50, textAlign: 'center' }}> <Text style={{ color: '#00C2FF' }}>Our </Text>Saviours</Text>
        {isLoading ? <Text>Loading...</Text> :
          data.map((item, key) =>
            <View key={key} style={styles.userList} >
              <View style={styles.nameGrid}>
                <Image style={{ width: 50, height: 50, marginRight: 5 }} source={{ uri: 'http://192.168.1.6:8000/storage/' + item.image }} />
                <View>
                  <Text style={styles.name}>{item.full_name}</Text>
                  <Text style={styles.city}>{item.location.city}</Text>
                </View>
              </View>
              {/* {item.services.map((service, key) =>
                <Text key={key} style={styles.services}>{service.service}</Text>
              )} */}
              <View style={styles.buttonGrid}>
                <TouchableOpacity style={styles.rateButton} onPress={() => clickEventListener(item.full_name)}>
                  <Text style={styles.followButtonText}>View Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.followButton} onPress={() => navigation.navigate('Map')}>
                  <Text style={styles.followButtonText}>Request</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.followButton} onPress={() => clickEventListener(item.full_name)}>
                  <Text style={styles.followButtonText}>Rate</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

  },
  userList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'center',
    padding: 10,
    borderColor: '#00C2FF',
    borderWidth: 1,
    marginTop: 20,
  },
  nameGrid: {
    flex: 1,
    flexDirection: 'row'
  },

  name: {
    fontSize: 18,
    // width: 200,
    flex: 1,
    textAlign: 'left',
    color: "#242424",
    fontWeight: 'bold'
  },
  city: {
    fontSize: 18,
    // width: 200,
    flex: 1,
    textAlign: 'left',
    color: "#00C2FF",
    fontWeight: 'bold'
  },
  services: {
    fontSize: 14,
    flex: 1,
    alignSelf: 'center',
    color: "#696969"
  },

  buttonGrid: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "#00C2FF",
    alignSelf: 'center'
  },
  rateButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "orange",
    alignSelf: 'center'
  },
  followButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
});
