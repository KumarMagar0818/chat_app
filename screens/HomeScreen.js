import { ScrollView, StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useEffect, useState } from 'react'
import CustomListItem from '../components/CustomListItem';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from '@rneui/base';
import { auth,db } from '../firebase';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"
import { StatusBar } from 'expo-status-bar';
StatusBar
const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  const singOutUser = () => (
    auth.signOut().then(() => {
      navigation.replace("login");
    })
  )
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "chats"), (
      (snapshot) => {
        setChats(
          snapshot.docs.map((doc) => ({
            id:doc.id,
            data: doc.data(),
          }))
        )

      }
    )
      
    )

    return unsubscribe;
  }, []);
  
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "ChatApp",
      headerBackTitle: "Login",
      headerStyle: { backgroundcolro: "#fff" },
      headerTitleStyle: { color: "black" },
      
      headerLeft: () => ( 
        
        <View style={{ marginLeft: 20 }}>
          <StatusBar style="black" />

          <TouchableOpacity onPress={singOutUser} activeOpacity={0.5}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: 80,
          marginRight:20
        }}>
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name='camerao' size={24} color="black"/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddChat")}
          >
            <SimpleLineIcons name='pencil' size={24} color="black"/>
        </TouchableOpacity>

        </View>
      )
    });

  }, [navigation]);

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id,
      chatName,
  })
}

  return (
    <SafeAreaView style={styles.container}>
     {chats.map(({id,data:{chatName}})  => (
        <CustomListItem
          key={id}
          id={id}
         chatName={chatName}
         enterChat={enterChat}
        />
      ))}
      <ScrollView>
            <CustomListItem></CustomListItem>
      </ScrollView>
   </SafeAreaView>
  )
}
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    height:"100%"
  }
})