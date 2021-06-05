import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Container, Form, Header, Input, Title, Item, Button, Label } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import AuthService from '../services/AuthService';

export default function RegisterScreen({ navigation }) {

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [conPassword, setconPassword] = useState("");
    const [name, setname] = useState("")
    const [phone, setphone] = useState("")
    const [address, setaddress] = useState("")
    const [warning, setwarning] = useState(null);

    function ValidateEmail(email) {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            return true
        }
        console.log('ValidateEmail false')
        return false
    }
    const SignUpAction = async () => {
        setwarning(null)
        if (!email) {
            setwarning("Email is empty!");
        }
        else if (!ValidateEmail(email))
        {
            setwarning("Incorrect email!");
        }
        else if (!password) {
            setwarning("Password is empty!");
        }
        else if (password != conPassword) {
            setwarning("Confirm Password is not the same!")
        }
        else if (!name) {
            setwarning("Agency Name is empty!");
        }
        else if (!phone) {
            setwarning("Phone Number is empty!");
        }
        else if (!/^\d+$/.test(phone)) {
            setwarning("Phone Number should be contain only number!");
        }
        else if (!address) {
            setwarning("Address is empty!");
        }
        else {
            const data = {email, password, name, phone, address}
            let result = await AuthService.Register(data);
            if(!result.success)
            {
                alert(result.message)
            }
            else {
                alert('Registered successfully!')
                navigation.navigate('Login');
            }
        }
    }
    const LoginAction = () => {
        navigation.navigate('Login');
    }
    return (

        <View>
            <Text style={styles.LoginTxt}> Register </Text>

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
                <Item style={styles.LoginItem} floatingLabel>
                    <Label style={styles.ItemTxt}> Confirm Password </Label>
                    <Input placeholder="Password" value={conPassword} onChangeText={(txt) => setconPassword(txt)} secureTextEntry={true} />
                </Item>
                <Item style={styles.LoginItem} floatingLabel>
                    <Label style={styles.ItemTxt}> Agent Name </Label>
                    <Input placeholder="Name" value={name} onChangeText={(txt) => setname(txt)} />
                </Item>
                <Item style={styles.LoginItem} floatingLabel>
                    <Label style={styles.ItemTxt}> Phone Number </Label>
                    <Input placeholder="Number" value={phone} onChangeText={(txt) => setphone(txt)} />
                </Item>
                <Item style={styles.LoginItem} floatingLabel>
                    <Label style={styles.ItemTxt}> Address </Label>
                    <Input placeholder="Address" value={address} onChangeText={(txt) => setaddress(txt)} />
                </Item>
                <Item style={styles.LoginItem}>
                    <Button block style={styles.LoginBtn}
                        onPress={SignUpAction}>
                        <Text style={styles.LoginBtn_txt}> Sign Up </Text>
                    </Button>
                </Item>
                <TouchableOpacity style={styles.RegisterBtn} onPress={LoginAction}>
                    <Text style={styles.RegisterBtn_Txt}>Already have an ac? Login Now!</Text>
                </TouchableOpacity>
            </Form>

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
        paddingTop: 10,
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
    }
});
