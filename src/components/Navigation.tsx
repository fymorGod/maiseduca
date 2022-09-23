import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from "../screens/Home/index.jsx";
import { Login } from "../screens/Login";

const Stack = createNativeStackNavigator();

export const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options={
                    {headerTransparent: true, headerShown: false, title: ''}
                }  name="Login" component={Login}/>
                <Stack.Screen options={
                    {headerTransparent: true, headerShown: false, title: ''}
                } 
                name="Home" 
                component={Home}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}