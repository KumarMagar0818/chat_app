import {
    Platform,
    KeyboardAvoidingView, SafeAreaView,
    StyleSheet, Text, TouchableOpacity,
    View, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback, 
} from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Avatar } from '@rneui/base'
import {AntDesign,FontAwesome,Ionicons } from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar'
import firebase from 'firebase/app';
import { db, auth} from '../firebase'
import { collection, doc, addDoc,serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";

const ChatScreen = ({ navigation, route }) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Avatar rounded
                        source={{
                            uri: messages[0]?.data.photoURL
                        }}
                    />
                    <Text
                        style={{ color: "white", marginLeft: 10, fontWeight: "700", fontStyle: "italic" }}
                    > {route.params.chatName}</Text>
                </View>
            ),
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 80,
                        marginRight: 20
                    }}>
                    <TouchableOpacity >
                        <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <FontAwesome name="phone" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation,messages]);

    
    //sending message
    const sendMessage = () => {
        const docRef = doc(db, "chats", route.params.id);
        const colRef = collection(docRef, "messages");
        addDoc(colRef, {
            timestamp: serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })
        setInput('')
        Keyboard.dismiss();
        
        return sendMessage;
    }
    
    useLayoutEffect(() => {
        const docRef = doc(db, "chats", route.params.id);
        const colRef = collection(docRef, "messages");
        const q = query(colRef, orderBy("timestamp", "asc"));
        const unsubscribe = onSnapshot(q, (snapshot => setMessages(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
        )));
        return unsubscribe;
    },[route])
    
    return (

        <SafeAreaView style={{
            flex: 1, backgroundColor: "white"
        }}>
            <KeyboardAvoidingView
                // behavior={Platform.os === "ios" ? "padding" : "height"}
                // behavior="padding"
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback >
                <> 
                    <ScrollView contentContainerStyle={{paddingTop:15}}>
                            {messages.map(({ id, data }) => 
                                data.email === auth.currentUser.email ? (
                                    <View key={id} style={styles.reciever}>
                                        <Avatar
                                            position="absolute"
                                            rounded
                                            bottom={-15}
                                            right={-5}
                                            size={30}
                                            source={{
                                             uri:data.photoURL,
                                        }}

                                        /> 
                                        <Text style={styles.recieverText}>
                                            {data.message}
                                        </Text>
                                </View>
                                ): ( 
                                        <View key={id} style={styles.sender}>
                                <Avatar 
                                 position="absolute"
                                 rounded
                                 bottom={-15}
                                 right={-5}
                                 size={30}
                                 source={{
                                       uri: data.photoURL,
                                }}
           
                                    />
                                    <Text style={styles.senderText}>
                                        {data.message}
                                    </Text>  
                                    <Text style={styles.senderName}>
                                    {data.displayName}</Text>
                                </View>
                            )
                        )}
                    </ScrollView>
                    <View style={styles.footer}>
                        <StatusBar style="light" />

                        <TextInput value={input}
                                onChangeText={(text) => setInput(text)}
                                onSubmitEditing={sendMessage}
                            placeholder='Message' style={styles.TextInput}
                        />
                        <TouchableOpacity onPress={sendMessage}
                        activeOpacity={0.5}>
                          <Ionicons name="send" size={24} color='#2B68E6'/>   
                        </TouchableOpacity>

                    </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
)
    
}
export default ChatScreen;
const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    reciever: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position:"relative",
    },
    recieverText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 10,
    },
    sender: {
        padding: 15,
        backgroundColor: "#2B68E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative",
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color:"white"
    },
    senderText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom:15,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding:15,
    },
    TextInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        // borderWidth: 1,
        padding: 10,
        color: "grey",
        borderRadius:30,
    },
}) 