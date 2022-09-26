import axios from "axios";
import "react-native-gesture-handler";
import React, { useContext, useRef, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Alert,} from 'react-native';
import { AppHeader } from "../../components/AppHeader";
import { AuthContext } from "../../context/AuthContext";
import Tags from "react-native-tags";


export const CreateAnotation = ({}) => {
    const { userInfo } = useContext(AuthContext);
    const [ descricao, setDescricao ] = useState();
    const [ tags, setTags ] = useState([]);

    const onSubmit = (descricao) => {
        criarNota(descricao)
      };
      
    const criarNota = async() => {
        try {
            const response = await axios
            .post(`http://192.168.6.20:3010/anotacoes`, {
                "descricao": descricao,
                "id_aluno": `${userInfo.user.id}`,
                "array_tags": tags
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }


   
    return (
        <View style={styles.Container}>
        <AppHeader/>
        <View>                
            <Text style={{fontFamily:"Poppins_500Medium", fontSize: 18, color: '#403B91', paddingTop:20, paddingLeft:20}}> Criar anotação</Text> 
        </View>
        <View style={styles.textbox}>
            <TextInput
            style={styles.input}
            value={descricao}
            onChangeText={text => setDescricao(text)}
            />

        <View>                
            <Text style={{fontFamily:"Poppins_500Medium", fontSize: 18, color: '#403B91', paddingTop:20, paddingLeft:20}}> Criar Tags</Text> 
        </View>
        
        <View>
            <Tags
           
            textInputProps={{
            placeholder: "Any type of animal"
            }}
            onChangeTags={tags => setTags(tags)}
            onTagPress={(index, tagLabel, event, deleted) =>
            console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
            }
            containerStyle={{ justifyContent: "center" }}
            inputStyle={{ backgroundColor: "white" }}

            
        />
        </View>
        

        </View>
        <TouchableOpacity
        style={styles.button}
        onPress={() => {
           onSubmit(descricao);
        }}
      >
        <Text style={styles.text}>Salvar</Text>
      </TouchableOpacity>
    
     
    </View>
    );
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
        border: "none",
        borderRadius: 28,
    },
    text: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
      },
    button: {
    width: "30%",
    marginTop: 40,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 18,
    elevation: 3,
    backgroundColor: "#364FC7",
    },
    input2:{
        borderRadius: 28,
        backgroundColor:"white",
        height:90,
        border: "none"
    },
    

})
