import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import api from '../api/api';
import socketServices from '../util/socketServices';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    socketServices.initializeSocket();
  }, [])

  const showToast = (type, message) => {
    setToastType(type);
    setTitle(message);
    animateToast();
  };
 
  const login = async (mat, password) => {
    setIsLoading(true);
    
    try {
      const response = await api
      .post(`/escolas/users/login`, {
        mat,
        password,
      });
      let userInfo = response.data;
      setUserInfo(userInfo);
      await AsyncStorage.setItem('@asyncStorage:userInfo', userInfo.token);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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
