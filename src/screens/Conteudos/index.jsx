import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import api from "../../api/api";
import { AppHeader2 } from "../../components/AppHeader2";
import { AuthContext } from "../../context/AuthContext";

export const Conteudos = ({route}) => {
    const { userInfo } = useContext(AuthContext)
    const [ conteudos, setConteudos ] = useState([])
    const [ titulo, setTitulo ] = useState("")
    const navigation = useNavigation();
    let id = route.params.id;

    //get nos conteudos do alunos po rmateria
     useEffect(() => {
         api.get(`/conteudosAluno/${userInfo.user.id}/${id}`)
         .then(res=>{
             // s
             setConteudos(res.data['conteudo'].conteudo);
             setTitulo(res.data['conteudo'].disciplina_name);
         })
        
       }, [])

       
    return (
        <View style={styles.Container}>
        <AppHeader2/>
        <View>                
            <Text style={styles.text}> {titulo} </Text>
        </View>

        <ScrollView>
        <View style={{alignItems:'center', elevation:3}}>
        {conteudos.map((cont)=>(
            <TouchableOpacity
            key={cont.id}
            style={styles.container2}
            onPress={() => navigation.navigate('VideoAulas', {id: `${cont.id}`})}
            >
                <View
                key={cont.id}
                style={{alignItems:"center"}}>
                    <Text style={styles.text1}> {cont.name}</Text>
                </View>
            </TouchableOpacity> 
            ))}
            </View>
        </ScrollView>
        
    </View>
    )
}

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#EDF2FF'
    },
    text:{
        fontFamily: "Medium",
            fontSize: 18,
            color: "#4264EB",
            paddingTop: 20,
            paddingLeft: 20,
    },
    container2:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
        borderRadius: 12,
        height:40,
        width:"90%"
    },
    text1:{
        color: "#403B91",
        fontSize: 16,
        fontWeight: "500",
        justifyContent: 'center',
        alignItems: 'center',
        
    }
    

})