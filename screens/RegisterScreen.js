import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Input, Button, Text } from '@rneui/themed'
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
const RegisterScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Login",
        }, [navigation]);
    })
    // "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                userCredential.user;
                updateProfile(
                    auth.currentUser, {
                        displayName: name,
                        photoURL: imageUrl || "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSin815MWuO9BnS8T0YoJZsOWMyUZZDR4EATQ&usqp=CAU"
                }
                )
                
            })
            .catch(error => alert(error.message))
        
    };
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style='light' />
            <Text h3 style={{ marginBottom: 50 }}>
                Create A User Account
            </Text>
            <View style={styles.inputContainer}>
                <Input
                    placeholder='Full Name'
                    autoFocus
                    type="text"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Input
                    placeholder='Email'
                    type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder='Password'
                    secureTextEntry
                    type="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Input
                    placeholder='Profile Picture URL (Optional)'

                    type="text"
                    value={imageUrl}
                    onChangeText={(text) => setImageUrl(text)}
                    onSubmitEditing={register}
                />
            </View>
            <Button
                style={styles.button}
                raised onPress={register} title="Register"
            />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",


    },
    button: {
        width: 200,
        marginTop: 10,
    },
    inputContainer: {
        width: 300,
    }
})