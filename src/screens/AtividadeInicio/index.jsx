import React, {useEffect, useContext, useState} from "react";
import axios from 'axios';
import { Text, View, StyleSheet, Image,TouchableOpacity, StatusBar, FlatList} from 'react-native';
import { FavItem } from "../../components/favoritos/favoritoItem";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { ScrollView } from "native-base";


export const AtividadeInicio = ({route}) => {
    let id = route.params.id;
    let title = route.params.title;
    const navigation = useNavigation();
    const images =[
        require('../../../assets/1.png'),
        require('../../../assets/2.png'),
        require('../../../assets/3.png'),
        require('../../../assets/4.png'),
    ]


    let [fontsLoaded] = useFonts({
        'Medium': require('../../../assets/fonts/Poppins-Medium.ttf'),
        'Bold': require('../../../assets/fonts/Poppins-Bold.ttf'),

    })

    return (
        <View style={styles.Container}>
            <View style={{flexDirection:'column', alignItems:"center", justifyContent:'space-between', marginTop:30}}>
                <Text style={{color: '#67D4D4',
                fontFamily: "Bold",
                fontSize: 28,
                textAlign:'center', paddingHorizontal:15}}>{title}</Text>
                

               <View style={{width:'100%', alignItems:'center',  justifyContent:'flex-end',paddingHorizontal:20,}}>
                    <TouchableOpacity
                    style={{ marginTop: 20, width: '100%',backgroundColor:'#fff', padding: 15, borderRadius: 50}}
                    onPress={() => navigation.navigate("Atividade", {id: `${id}`})}
                    >
                    <Text style={{color: '#403B91',
                    fontWeight: "600",
                    fontSize: 20,
                    textAlign:'center'}}>Iniciar Quiz</Text>
                    </TouchableOpacity>
               </View>
            </View>

        </View>
    )
}





export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor:"#4263EB",
    },
  

})