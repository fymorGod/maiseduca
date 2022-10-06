import React, {useEffect, useContext, useState} from "react";
import axios from 'axios';
import { Text, View, StyleSheet, Image,TouchableOpacity} from 'react-native';
import { AppHeader } from "../../components/AppHeader";
import { AuthContext } from "../../context/AuthContext";
import { FavItem } from "../../components/favoritos/favoritoItem";
import { useNavigation } from "@react-navigation/native";




export const AtividadeInicio = ({route}) => {
    let id = route.params.id;
    const navigation = useNavigation();
    

    return (
        <View style={styles.Container}>
            <View style={{flexDirection:'column', alignItems:"center"}}>
                <Image
                style={{height: "60%", width:"60%", marginTop:20}}
                resizeMode="contain" 
                source={require("../../../assets/balloon2.png")} 
                />

                <TouchableOpacity
                style={{ width: "80%",
                marginTop: 40,
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 18,
                paddingHorizontal: 32,
                borderRadius: 8,
                elevation: 3,
                backgroundColor: "#364FC7",}}
                onPress={() => navigation.navigate("Atividade", {id: `${id}`})}
              >
                <Text style={{color: "#fff",
                fontWeight: "600",
                fontSize: 14,}}>Continuar</Text>
              </TouchableOpacity>
            </View>

        </View>
    )
}





export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#EDF2FF',
    },
  

})