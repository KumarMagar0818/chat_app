import {StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button, Icon, Input } from '@rneui/base'
import { async } from '@firebase/util'
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore"
import { StatusBar } from 'expo-status-bar'


const AddChatScreen = ({  }) => {
  const [input, setInput] = useState("");
  const navigation = useNavigation();
   
  const createChat = async () => {
    await addDoc(collection(db, "chats"), {
      chatName: input
    }).then(() => {
      navigation.goBack("Home");
    })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "add a new chat",
      headerBackTitle: "Chats",
    });
  }, [navigation]);


  return (
    <View style={styles.container}>
      <StatusBar style="light" />

         <Input
        placeholder='Enter a Chat Name'
        onChangeText={(text) => setInput(text)}
        leftIcon={
          <Icon
            name="wechat" type='antdesign' size={24} color="black"
          />
        }
         />
         <Button onPress={createChat} title='Create new Chat'/>
    </View>

  )
}
export default AddChatScreen
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height:"100%",
  }
})