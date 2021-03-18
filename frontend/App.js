import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Container, Form, Header, Input, Title, Item } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import NavStack from './src/routes/NavStack';

export default function App() {

  return (
    <SafeAreaView style={styles.container}>

      <NavigationContainer>
        <NavStack />
      </NavigationContainer>

    </SafeAreaView>

  );
}



const styles = StyleSheet.create({
  Header: {
    backgroundColor: '#19e87d',
  }, 
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});
