import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';

const { Screen, Navigator }  = createNativeStackNavigator();

import { Home } from "../screens/Home";
import { Login } from "../screens/Login";

export function StackRoutes() {
    return (
        <Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#4263EB',                
            },
            headerTitle: () => (
                <Image style={{ width: 120, height: 30, marginLeft: -15
                 }} source={require("../../assets/logo.png")} />
              ),
          
        }}>
             <Screen  
                name="login"
                component={Login}
                options={
                    {headerTransparent: true, headerShown: false, title: ''}
                } 
            />
            <Screen 
                name="home"
                component={Home}
                options={
                    {
                        title: 'teste'
                    }
                } 
            />
            
        </Navigator>
    )
}