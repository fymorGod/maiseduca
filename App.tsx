import { NativeBaseProvider } from 'native-base';
import { AuthProvider } from './src/context/AuthContext';
import { Routes } from './src/routes';


export default function App() {
  return (
    <NativeBaseProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NativeBaseProvider>
  );
}

