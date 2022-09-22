import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { Image } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const { Screen, Navigator }  = createNativeStackNavigator();

import { Home } from "../screens/Home";
import { Login } from "../screens/Login";

export function StackRoutes() {
    const { user } = useContext(AuthContext);

    return (
        <Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#4263EB',                
            },
            headerTitle: () => (
                <Image style={{ width: 120, height: 30 }} source={require("../../assets/logo.png")} />
              ),
          
        }}>
            {user.token ? (
                <Screen 
                name="home"
                component={Home}
                options={
                    {
                        title: 'teste'
                    }
                } 
            />
            ): (
                <>
                    <Screen  
                    name="login"
                    component={Login}
                    options={
                        {headerTransparent: true, headerShown: false, title: ''}
                    } 
                    />
                </>
            )}
             
            
            
        </Navigator>
    )
}