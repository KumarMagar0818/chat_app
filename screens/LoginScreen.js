import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Input, Image, Text } from "@rneui/base"
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation()
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            // console.log(user);
            if (user) {
                navigation.replace("Home");
            }
        })
        return unsubscribe;
    }, []);

    const singIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .catch(error=()=> alert(error));
    }
    return (
        <KeyboardAvoidingView behavior="height" style={styles.container}>
            <StatusBar style="light" />
            <Image
                source={{
                    uri: "https://www.static-contents.youth4work.com/university/Documents/Colleges/collegeLogo/20200619192235.png?v=20200619192235"

                }}
                style={{ width: 100, height: 100 }}
            />
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Email"
                    utoFocus type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder="Password"
                    secureTextEntry
                    type="password"
                    onChangeText={(text) => setPassword(text)} 
                    onSubmitEditing={singIn}
                    />
            </View>
            <Button containerStyle={styles.btn} onPress={singIn} title="Login" />
            <Button onPress={() => navigation.navigate("Register")} containerStyle={styles.btn} type="outline" title="Register" />
            <View style={{ height: 100 }}></View>
        </KeyboardAvoidingView>
    );
};
export default LoginScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",

    },
    inputContainer: {
        width: 300

    },
    btn: {
        width: 200,
        marginTop: 10,
    }
});  