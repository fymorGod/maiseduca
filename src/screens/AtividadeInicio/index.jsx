import React, {useEffect, useContext, useState} from "react";
import axios from 'axios';
import { Text, View, StyleSheet, Image,TouchableOpacity, StatusBar} from 'react-native';
import { AppHeader } from "../../components/AppHeader";
import { AuthContext } from "../../context/AuthContext";
import { FavItem } from "../../components/favoritos/favoritoItem";
import { useNavigation } from "@react-navigation/native";




export const AtividadeInicio = ({route}) => {
    let id = route.params.id;
    const navigation = useNavigation();
    

    return (
        <View style={styles.Container}>
        <StatusBar barStyle="light-content" backgroundColor="#252c4a"/>
            <View style={{flexDirection:'column', alignItems:"center", justifyContent:'center'}}>
                <Image
                style={{height: "60%", width:"60%", marginTop:20}}
                resizeMode="contain" 
                source={require("../../../assets/balloon2.png")} 
                />

                <Text style={{color: "#fff",
                fontWeight: "600",
                fontSize: 14,}}>Bem vindo ao Quiz</Text>

               <View style={{width:'100%', alignItems:'center', marginTop:20}}>
                    <TouchableOpacity
                    style={{ width: "80%",
                    marginTop: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 18,
                    paddingHorizontal: 32,
                    borderRadius: 8,
                    elevation: 3,
                    backgroundColor: "#fff",}}
                    onPress={() => navigation.navigate("Atividade", {id: `${id}`})}
                    >
                    <Text style={{color: "#2890F0",
                    fontWeight: "600",
                    fontSize: 14,}}>Continuar</Text>
                    </TouchableOpacity>
               </View>
            </View>

        </View>
    )
}





export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#252c4a',
    },
  

})