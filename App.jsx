import { NativeBaseProvider } from 'native-base';
import { AuthProvider } from './src/context/AuthContext';
import { Routes } from './src/routes';
import {useFonts} from "expo-font";
import AppLoading from 'expo-app-loading';



export default function App() {

  let [fontsLoaded] = useFonts({
    'Medium': require('./assets/fonts/Poppins-Medium.ttf')
  })
  if (! fontsLoaded ){
    return <AppLoading/>
  }

  return (
    <NativeBaseProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NativeBaseProvider>
  );
}

