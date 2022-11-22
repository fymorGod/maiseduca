import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ToastManager, { Toast } from 'toastify-react-native'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
 
  const login = async (mat, password) => {
    setIsLoading(true);
    
    try {
      const response = await axios
      .post(`http://35.199.114.75:3010/escolas/users/login`, {
        mat,
        password,
      });
      let userInfo = response.data;
      console.log(userInfo.user);
      setUserInfo(userInfo);
      await AsyncStorage.setItem('@asyncStorage:userInfo', userInfo.token);
      setIsLoading(false);
    } catch (error) {       
      setIsLoading(false)
    }
  };


  const logout = () => {
    setIsLoading(true);
      try {
        AsyncStorage.removeItem('@asyncStorage:userInfo');
        setUserInfo({});
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
  };


  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        login,
        logout
      }}>
      {children}
    </AuthContext.Provider>
  );
}
