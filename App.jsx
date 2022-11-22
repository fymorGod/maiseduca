import { NativeBaseProvider } from 'native-base';
import { AuthProvider } from './src/context/AuthContext';
import { Routes } from './src/routes';
import {useFonts} from "expo-font";

// Your web app's Firebase configuration

// Initialize Firebase

// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_lP-XRuonKQ2bSnTEAw_RD6kUDnNO6hg",
  authDomain: "chatram-89e1e.firebaseapp.com",
  projectId: "chatram-89e1e",
  storageBucket: "chatram-89e1e.appspot.com",
  messagingSenderId: "867113784649",
  appId: "1:867113784649:web:2dca6de296c61bc0c0f698",
  measurementId: "G-22RQXFHSEK"
};

// Initialize Firebase
initializeApp(firebaseConfig);


export default function App() {

  let [fontsLoaded] = useFonts({
    Medium: require('./assets/fonts/Poppins-Medium.ttf'),
    Bold: require("./assets/fonts/Poppins-Bold.ttf")
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

