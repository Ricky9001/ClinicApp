import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Container, Form, Header, Input, Title, Item, Button, Row } from 'native-base';
import * as Font from 'expo-font';
import { EvilIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import DrawerStack from '../routes/DrawerStack';
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function HomeScreen({ navigation }) {

    const clearAppData = async function() {
        try {
            const keys = await AsyncStorage.getAllKeys();
            await AsyncStorage.multiRemove(keys);
        } catch (error) {
            console.error('Error clearing app data.');
            console.log(error)
        }
    }

    const LogOutAction = async () => {
        await clearAppData()
        navigation.navigate('Login')
    }

    const NavBtnAction = () => {
        // navigation.openDrawer();
        navigation.dispatch(DrawerActions.toggleDrawer());
    }

    return (
        <Container>
            <Header style={styles.Header}>
                <TouchableOpacity style={styles.LogoutBtn} onPress={NavBtnAction}>
                    <EvilIcons name="navicon" size={40} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.LogoutBtn} onPress={LogOutAction}>
                    <Text style={styles.LogoutTxt}>Log out</Text>
                </TouchableOpacity>
            </Header>
            <DrawerStack/>
        </Container>
    )
}

const styles = StyleSheet.create({
    Header: {
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff'
    },
    TmpTxt: {
        paddingTop: 50,
        fontSize: 40,
        textAlign: 'center',
    },
    LogoutBtn: {
        // width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        // paddingHorizontal: 30,
        flexDirection: 'row'
    },
    LogoutTxt: {
        textAlign: 'right',
        color: 'blue'
    }
})