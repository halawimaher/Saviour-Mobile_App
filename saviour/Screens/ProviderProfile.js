import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, Text, Platform, StatusBar, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useFonts, RhodiumLibre_400Regular } from '@expo-google-fonts/rhodium-libre';
import AppLoading from 'expo-app-loading';
import * as ImagePicker from 'expo-image-picker'
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from "react-native-elements";
import Constants from 'expo-constants'
import { AuthContext } from '../components/Context'
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerContentScrollView } from '@react-navigation/drawer';

function ProviderProfile({ navigation }) {
     const [image, setImage] = useState(null)
     const [data, setData] = useState({})
     const [isLoading, setLoading] = useState(true);

     const getData = async () => {
          fetch(`http:192.168.1.6:8000/api/providers/${user_id}`, {
               method: 'GET',
               headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
               },
          })
               .then((response) => response.json())
               .then((res) => { setData(res[0]), setLoading(false), console.log(res) })
               .catch((error) => console.error(error))
     }

     const { signOut } = useContext(AuthContext)

     let [fontsLoaded] = useFonts({
          RhodiumLibre_400Regular,
     });

     useEffect(() => {
          async function doSomething() {
               if (Platform.OS != 'web') {
                    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
                    if (status != 'granted') {
                         alert('Permission denied!')
                    }
               }
          }
          doSomething()
          getData()
     }, [])

     const PickImage = async () => {
          let result = await ImagePicker.launchImageLibraryAsync({
               mediaTypes: ImagePicker.MediaTypeOptions.All,
               allowsEditing: true,
               aspect: [4, 3],
               quality: 1
          })
          console.log(result)
          if (!result.cancelled) {
               setImage(result.uri)
          }
     }

     if (!fontsLoaded) {
          return <AppLoading />;
     } else {
          return (
               <SafeAreaView style={styles.container}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                         <View style={styles.welcomeMessage}>
                              <Ionicons name="arrow-back-outline" size={46} color='black' style={{ padding: 10 }} onPress={() => navigation.goBack()} />
                              <Text style={styles.logOut} onPress={() => { signOut() }}>Log Out</Text>
                         </View>
                         <View style={{ alignSelf: "center" }}>
                              <View style={styles.profileImage}>
                                   {!image ? <Avatar
                                        size={200}
                                        icon={{ name: 'user', color: 'grey', type: 'font-awesome' }}
                                        overlayContainerStyle={{ backgroundColor: 'white', borderRadius: 100 }}
                                        activeOpacity={0.7}
                                        containerStyle={{ borderWidth: 5, borderRadius: 100 }}
                                   />
                                        :
                                        <Image source={{ uri: image }} style={styles.image} />}
                                   <TouchableOpacity style={styles.imageButton} onPress={PickImage}>
                                        <Ionicons name="camera" size={46} color='orange' />
                                   </TouchableOpacity>
                                   <StatusBar style='auto' />
                              </View>
                         </View>

                         {isLoading ? <Text>Loading...</Text> :
                              <>
                                   <View style={styles.infoContainer}>
                                        <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{data.name}</Text>
                                        <Text style={[styles.text, { color: "#00C2FF", fontSize: 14 }]}>{data.city}</Text>

                                        <View style={{ borderColor: "#00C2FF", borderTopWidth: 1, paddingTop: 2 }}>
                                             <Text style={[styles.personalMessage]}>{data.personal_message}</Text>
                                        </View>
                                   </View>

                                   <View style={styles.statsContainer}>
                                        <View style={styles.statsBox}>
                                             <Text style={[styles.text, { fontSize: 24 }]}>{data.provider_bookings_count}</Text>
                                             <Text style={[styles.text, styles.subText]}>People Saved</Text>
                                        </View>
                                        <View style={[styles.statsBox, { borderColor: "#00C2FF", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                                             <Text style={[styles.text, { fontSize: 24 }]}>{data.provider_feedback_count}</Text>
                                             <Text style={[styles.text, styles.subText]}>Comments</Text>
                                        </View>
                                   </View>

                                   <View style={styles.statsContainer}>
                                        <View style={styles.statsBox}>
                                             <Text style={[styles.text, { fontSize: 24 }]}>20000</Text>
                                             <Text style={[styles.text, styles.subText]}>Rate/Hour</Text>
                                        </View>
                                        <View style={[styles.statsBox, { borderColor: "#00C2FF", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                                             {data.services.map((serv, key) => <Text key={key} style={[styles.servicesText]}>{serv.service}</Text>)}
                                             <Text style={[styles.text, styles.subText]}>Services</Text>
                                        </View>
                                   </View>
                              </>
                         }
                         {/* <TouchableOpacity
                              style={styles.button}
                              onPress={() => navigation.navigate('ProviderComments', { item })}
                         ><Text style={styles.buttonText}>View All Feedback</Text>
                         </TouchableOpacity> */}
                    </ScrollView>
               </SafeAreaView>
          )
     }
}
const styles = StyleSheet.create({
     wrapper: {
          width: 350,
          backgroundColor: '#fff',
          paddingTop: 20,
          marginTop: Constants.statusBarHeight,
     },
     welcomeMessage: {
          flex: 1,
          flexDirection: 'row',
          alignContent: 'flex-start',
          justifyContent: 'space-between',
          fontFamily: 'RhodiumLibre_400Regular'
     },
     logOut: {
          color: 'red',
          fontSize: 16,
          fontFamily: 'RhodiumLibre_400Regular',
          padding: 20
     },
     imagePicker: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
     },
     text: {
          fontFamily: 'RhodiumLibre_400Regular',
          color: "#52575D"
     },
     servicesText: {
          color: "#52575D",
          fontSize: 14,
          fontFamily: 'RhodiumLibre_400Regular',
     },
     image: {
          flex: 1,
          height: 200,
          width: 200
     },
     imageButton: {
          alignSelf: 'center',
          position: "absolute",
          bottom: 15,
          right: 25,
          width: 55,
          height: 55,
          borderWidth: 4,
          borderColor: 'orange',
          borderRadius: 40,
     },
     subText: {
          fontSize: 12,
          color: "#00C2FF",
          textTransform: "uppercase",
          fontWeight: "500"
     },
     profileImage: {
          width: 200,
          height: 200,
          borderRadius: 100,
          overflow: "hidden"
     },
     infoContainer: {
          alignSelf: "center",
          alignItems: "center",
          marginTop: 16
     },
     statsContainer: {
          flexDirection: "row",
          alignSelf: "center",
          marginTop: 32
     },
     statsBox: {
          alignItems: "center",
          flex: 1
     },
     button: {
          borderRadius: 40,
          width: 235,
          height: 44,
          backgroundColor: '#00C2FF',
          margin: 20,
          alignSelf: 'center'
     },
     buttonText: {
          paddingTop: 10,
          textAlign: 'center',
          fontSize: 16,
          color: '#fff',
          fontFamily: 'RhodiumLibre_400Regular'
     },
})

export default ProviderProfile
