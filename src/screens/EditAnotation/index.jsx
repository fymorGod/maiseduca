import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from "react-native-paper";
import { AppHeader } from "../../components/AppHeader";
import { AuthContext } from "../../context/AuthContext";

export const EditAnotation = ({routes}) => {
    const { userInfo } = useContext(AuthContext);
    const [note, setNote] = useState([]);
    

    useEffect(() => {
        axios.get(`http://192.168.6.20:3010/anotacoesByAluno/${userInfo.user.id}`)
        .then(res=>{
            // s
            setNote(res.data['anotacoes']);
            console.log(res.data['anotacoes'])
    
        })
        
      }, [])



    return (
        <View style={styles.Container}>
        <AppHeader/>
        <View>                
            <Text style={{fontFamily:"Poppins_500Medium", fontSize: 18, color: '#403B91', paddingTop:20, paddingLeft:20}}> Editar anotação</Text> 
        </View>
        <View style={styles.textbox}>
            <TextInput
            style={styles.input}
            />
        </View>
        
    </View>
    )
}

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#EDF2FF'
    },
    textbox:{
        padding:10
    },
    input:{
        backgroundColor:"white",
        height:200,
        border: "none"
    }
    

})