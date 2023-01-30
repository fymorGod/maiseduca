import { NativeBaseProvider } from 'native-base';
import { AuthProvider } from './src/context/AuthContext';
import { Routes } from './src/routes';
import {useFonts} from "expo-font";
import { useEffect } from 'react';
import socketServices from './src/util/socketServices';



export default function App() {

  let [fontsLoaded] = useFonts({
    Bold: require("./assets/fonts/Poppins-Bold.ttf"),
    Medium: require("./assets/fonts/Poppins-Medium.ttf"),
    Regular: require("./assets/fonts/Poppins-Regular.ttf")
  })
  if (! fontsLoaded ){
    return null;
  }


  
  
  return (
    <NativeBaseProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NativeBaseProvider>
  );
}

