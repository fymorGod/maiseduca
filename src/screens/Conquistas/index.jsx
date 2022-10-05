import React, {useEffect, useContext, useState} from "react";
import axios from 'axios';
import { Text, View, StyleSheet, Image, } from 'react-native';
import { AppHeader } from "../../components/AppHeader";
import { AuthContext } from "../../context/AuthContext";
import { FavItem } from "../../components/favoritos/favoritoItem";
import Quiz from "../Quiz";




export const Conquistas = () => {
   
    return (
        <View style={styles.Container}>
            <AppHeader/>
           
        </View>
    )
}





export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#EDF2FF'
    },
   
})