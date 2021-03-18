import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
const Stack = createStackNavigator();
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import HomeScreen from '../screens/HomeScreen'

const NavStack = () => {
    return (
        <Stack.Navigator initialRouteName="Login" 
        screenOptions={{
            gestureEnabled: false,
            headerShown: false,
        }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={HomeScreen}  />
        </Stack.Navigator>
    )
}
export default NavStack
