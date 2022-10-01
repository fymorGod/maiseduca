import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { AppHeader } from "../../components/AppHeader";
import { MateriaItem } from "../../components/materias";
import { AuthContext } from "../../context/AuthContext";

export const Aulas = () => {
    const { userInfo } = useContext(AuthContext);
    const [materias, setMaterias] = useState([]);


    
    useEffect(() => {
        axios.get(`http://192.168.6.20:3010/disciplinasAluno/${userInfo.user.id}`)
        .then(res=>{
            // s
            setMaterias(res.data['disciplinas']);
            console.log(res.data['disciplinas'])
        })
        
      }, [])



    return (
    <View style={styles.Container}>
        <AppHeader/>
        <View>
            <Text style={styles.text}>
                Minhas Disciplinas
            </Text>
        </View>
        <View style={styles.lista}>
       
        <FlatList
            data={materias}
            numColumns={2}
            keyExtractor={(materia, index) => index.toString()}
            renderItem={(materia)=>(
            <MateriaItem
            {...materia.item.disciplina}
            />)}
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
    text:{
        color: "#403B91",
        fontSize: 18,
        fontWeight: "500",
        marginLeft: 20,
        marginBottom: 10,
        marginTop: 10
    },
    lista:{

        alignItems: 'center'
    }
    

})