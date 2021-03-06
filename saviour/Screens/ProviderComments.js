import React, { useEffect, useState } from 'react';
import {
     StyleSheet,
     Text,
     View,
     TouchableOpacity,
     Image,
     ScrollView,
     FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function ProviderComments({ navigation, route }) {

     const { item } = route.params
     console.log(item)
     const [isLoading, setLoading] = useState(true);
     const [data, setData] = useState({})

     const getComments = () => {
          fetch(`http:192.168.1.6:8000/api/providers/${item.id}`, {
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
          getComments()
     }, []);

     return (
          <FlatList
               style={styles.root}
               data={data}
               // extraData={this.state}
               ItemSeparatorComponent={() => {
                    return (
                         <View style={styles.separator} />
                    )
               }}
               keyExtractor={(item) => {
                    return item.id.toString();
               }}
               renderItem={(item) => {
                    const Notification = item.item;
                    return (
                         <View style={styles.container}>
                              <View><Ionicons name="arrow-back-outline" size={46} color='black' onPress={() => navigation.goBack()} /></View>
                              <View style={styles.content}>
                                   <View style={styles.contentHeader}>
                                        <Text style={styles.name}>{Notification.name}<Text style={{ color: '#00C2FF' }}>'s comments</Text></Text>
                                   </View>
                                   <View>
                                        <TouchableOpacity onPress={() => { }}>
                                             <Image style={styles.image} source={{ uri: Notification.image }} />
                                        </TouchableOpacity>
                                        {Notification.provider_feedback.map((mes, key) =>
                                             <View key={key} style={styles.feedbackContent}>
                                                  <Text style={styles.head}>Anonymous Wrote: </Text>
                                                  <Text style={styles.comment} rkType='primary3 mediumLine'>{mes.feedback}</Text>
                                                  <Text style={{ color: '#242424' }}>Rating: <Text style={styles.rating} >{mes.rating}</Text><Text style={{ color: '#242424', fontSize: 18 }}>/5</Text></Text>
                                             </View>
                                        )}
                                   </View>
                              </View>
                         </View>
                    );
               }} />
     );
}

export default ProviderComments

const styles = StyleSheet.create({
     root: {
          backgroundColor: "#ffffff",
          marginTop: 10,
     },
     container: {
          // paddingLeft: 19,
          paddingRight: 16,
          paddingVertical: 12,
          flexDirection: 'row',
          alignItems: 'flex-start'
     },
     feedbackContent: {
          flex: 1,
          flexDirection: 'column',
          alignContent: 'space-between',
          justifyContent: 'space-between',
          padding: 10,
          fontSize: 18
     },
     content: {
          marginLeft: 16,
          flex: 1,
     },
     contentHeader: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 6
     },
     separator: {
          height: 1,
          backgroundColor: "#CCCCCC"
     },
     image: {
          width: 45,
          height: 45,
          borderRadius: 20,
          marginLeft: 20
     },
     head: {
          fontSize: 12,
          fontFamily: 'RhodiumLibre_400Regular'
     },
     rating: {
          fontSize: 18,
          color: "#00C2FF",
          fontFamily: 'RhodiumLibre_400Regular'
     },
     comment: {
          fontSize: 19,
          fontFamily: 'RhodiumLibre_400Regular'
     },
     name: {
          fontSize: 21,
          fontFamily: 'RhodiumLibre_400Regular'
     },
});