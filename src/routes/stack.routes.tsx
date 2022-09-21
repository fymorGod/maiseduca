import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Screen, Navigator}  = createNativeStackNavigator();

import { Home } from "../screens/Home";
import { Login } from "../screens/Login";

export function StackRoutes() {
    return (
        <Navigator>
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
                    {headerTransparent: true, headerShown: true, title: ''}
                } 
            />
            
        </Navigator>
    )
}