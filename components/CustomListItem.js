import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, ListItem } from '@rneui/base'
import { db } from '../firebase';

import { collection, orderBy, query, doc, onSnapshot, getDoc, documentId } from 'firebase/firestore';
import { async } from '@firebase/util';

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);
  useEffect(() => {
    //TODO: error
    (async () => {
      const docRef = doc(db, "chats", id);
      const colRef = collection(docRef, "messages");
      const q = query(colRef, orderBy("timestamp", "desc"))
      const unsubscribe = onSnapshot(q, (snapshot => setChatMessages(
        snapshot.docs.map((doc) => doc.data()))));
      return unsubscribe;
    })();
  }, [])
  

  return (
    <ListItem key={id} onPress={()=>enterChat(id,chatName)}  bottomDivider>
      <Avatar
        rounded 
        source={{
          uri:chatMessages?.[0]?.photoURL ||    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName} 
        </ListItem.Title>
        <ListItem.Subtitle
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {chatMessages?.[0]?.displayName}:{chatMessages?.[0]?.message}
          </ListItem.Subtitle>
      </ListItem.Content>
   </ListItem>
  )
}
export default CustomListItem;
const styles = StyleSheet.create({}) 