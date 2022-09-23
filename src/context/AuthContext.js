<<<<<<< HEAD
import React, { createContext, useState } from 'react';
import { AsyncStorage } from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState({});
    const [ isLoading, setIsLoading] = useState(false);

    const login = ( matricula, password ) => {
        setIsLoading(true);

        axios.post('url/login', {
            matricula,
            password
        }).then(res => {
            console.log(res.data);
            const dataUser = res.data;
            setUser(dataUser);
            AsyncStorage.setItem('user', JSON.stringify(user));
            console.log(userInfo)
            setIsLoading(false);
        }).catch(e => {
            console.log('login error')
            setIsLoading(false)
        })
    }

    const logout = () => {
        setIsLoading(true);

        axios.post('url/logout',{},{headers: {Authorization: `Bearer Token`}} ).then(res => {
            AsyncStorage.removeItem('user');
            setUser({});
            setIsLoading(false)
        }).catch(e => {
            console.log(`logout error ${e}`);
        });
        
    }

    return (
        <AuthContext.Provider value={{login, user, isLoading, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
=======
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
 
  const login = async (mat, password) => {
    setIsLoading(true);
    
    try {
      const response = await axios
      .post(`http://192.168.6.20:3010/escolas/users/login`, {
        mat,
        password,
      });
      
      let userInfo = response.data;
      console.log(userInfo.user);
      setUserInfo(userInfo);
      await AsyncStorage.setItem('@asyncStorage:userInfo', userInfo.token);
      setIsLoading(false);
           
    } catch (error) {
      console.log(error)
    }

  };

//   const logout = () => {
//     setIsLoading(true);

//     axios
//       .post(
//         `${BASE_URL}/logout`,
//         {},
//         {
//           headers: {Authorization: `Bearer ${userInfo.access_token}`},
//         },
//       )
//       .then(res => {
//         console.log(res.data);
//         AsyncStorage.removeItem('userInfo');
//         setUserInfo({});
//         setIsLoading(false);
//       })
//       .catch(e => {
//         console.log(`logout error ${e}`);
//         setIsLoading(false);
//       });
//   };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        login
      }}>
      {children}
    </AuthContext.Provider>
  );
};
>>>>>>> ramon
