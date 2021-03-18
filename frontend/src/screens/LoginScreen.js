import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Container, Form, Header, Input, Title, Item, Button, Label } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthService from '../services/AuthService';

export default function LoginScreen({ navigation }) {


    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [warning, setwarning] = useState(null);

    const SignInAction = async () => {        
        setwarning(null)
        if (email == "" || password == "") {
            setwarning("Email or Password Invaild!");
            return;
        }
        else {
            let result = await AuthService.Login(email, password);  
            if(!result.success)
            {
                setwarning(result.message);
            }    
            else {
                
                await AsyncStorage.setItem('token', result.accessToken)
                
                navigation.navigate('Home');
            }
        }
    }

    const RegisterAction = () => {
        setwarning(null)
        navigation.navigate('Register');
    }
    return (

        <View>
            <Text style={styles.LoginTxt}> Login </Text>

            <Form style={styles.LoginForm}>
                {warning && <Text style={styles.WarningTxt}>{warning}</Text>}
                <Item style={styles.LoginItem} floatingLabel>
                    <Label style={styles.ItemTxt}> Email </Label>
                    <Input placeholder="Email" value={email} onChangeText={(txt) => setemail(txt)} />
                </Item>
                <Item style={styles.LoginItem} floatingLabel>
                    <Label style={styles.ItemTxt}> Password </Label>
                    <Input placeholder="Password" value={password} onChangeText={(txt) => setpassword(txt)} secureTextEntry={true} />
                </Item>
                <Item style={styles.LoginItem}>
                    <Button block style={styles.LoginBtn}
                        onPress={SignInAction} >
                        <Text style={styles.LoginBtn_txt}> Sign In </Text>
                    </Button>
                </Item>
            </Form>
            <TouchableOpacity style={styles.RegisterBtn} onPress={RegisterAction}>
                <Text style={styles.RegisterBtn_Txt}>Register Now</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    LoginTxt: {
        paddingTop: 50,
        fontSize: 40,
        textAlign: 'center',
    },
    LoginForm: {
        paddingHorizontal: 30,
        paddingTop: 20,
    },
    LoginBtn: {
        width: '100%',
        backgroundColor: '#19e87d',
    },
    LoginBtn_txt: {
        color: '#fff',
        fontWeight: 'bold'
    },
    LoginItem: {
        paddingTop: 20,
    },
    WarningTxt: {
        paddingHorizontal: 20,
        color: '#ff0000',
    },
    RegisterBtn: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingHorizontal: 30,
    },
    RegisterBtn_Txt: {
        color: '#ff9300',
    },
    ItemTxt: {
        fontSize: 20,
    }
});
