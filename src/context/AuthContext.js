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