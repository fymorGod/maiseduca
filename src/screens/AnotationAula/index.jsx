import axios from "axios";
import "react-native-gesture-handler";
import React, { useContext, useRef, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Alert,} from 'react-native';
import { AppHeader } from "../../components/AppHeader";
import { AuthContext } from "../../context/AuthContext";
import Tags from "react-native-tags";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";

export const AnotationAula = ({route}) => {
    const [fontsLoaded] = useFonts({
        Medium: require('../../../assets/fonts/Poppins-Medium.ttf')
    })
    id = route.params.id
    console.log(id)

  const navigation = useNavigation();
  const { userInfo } = useContext(AuthContext);
  const [ descricao, setDescricao ] = useState();
  const [tags, setTags] = useState([route.params.name]);

  const onSubmit = (descricao) => {
      criarNota(descricao)
    };
    
  const criarNota = async() => {
      try {
          const response = await axios
          .post(`https://mais-edu.herokuapp.com/anotacoes`, {
              "descricao": descricao,
              "id_aluno": `${userInfo.user.id}`,
              "array_tags": tags
          })
          if(response.status === 201){
            navigation.goBack()
          }
      } catch (error) {
          console.log(error)
      }
  }


    return (
        <View style={styles.Container}>
        <AppHeader/>
        <View>                
            <Text style={{fontFamily:"Medium", fontSize: 18, color: '#403B91', paddingTop:20, paddingLeft:20}}>Criar anotação</Text> 
        </View>
        <View style={styles.textbox}>
            <TextInput
            multiline={true}
            multilinejuguy
            style={styles.input}
            value={descricao}
            onChangeText={text => setDescricao(text)}
            />

        <View>                
            <Text style={{fontFamily:"Medium", fontSize: 18, color: '#403B91', paddingTop:20, paddingLeft:20}}>Tags</Text> 
        </View>
        
        <View style={styles.textbox}>
              <Text style={{position:"absolute", fontFamily:"Medium", fontSize: 12, color: '#403B91', paddingTop:1, paddingLeft:20}}>Crie sua tag</Text>
              <Tags
                key={tags}
                initialTags={tags}
                style={{height:150}}
                onChangeTags={tags => setTags(tags)}
                onTagPress={(index, tagLabel, event, deleted) =>
                console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
                }
                containerStyle={{ margin: 10,
                borderRadius: 10,
                backgroundColor: '#FFFFFF',
                justifyContent: 'flex-start', }}
                inputStyle={{  backgroundColor: '#FFFFFF',
                color: '#606060',
                fontWeight: 'bold', }}
                />
        </View>
          

        </View>
        
        <View style={{flexDirection:'row', justifyContent: "space-between", paddingHorizontal: 20}}>
        <Text></Text>
        <TouchableOpacity
        style={styles.button}
        onPress={() => {
           onSubmit(descricao);
        }}
        >

        <Text style={styles.textButtom}>Salvar</Text>
      </TouchableOpacity>
      

        </View>
          
      
     
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
        marginHorizontal:10,
        padding:10,
        backgroundColor:"white",
        height:110,
        
        borderRadius: 10,
    },
    text: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
      },
      button: {
        marginHorizontal: 6,
        width:'45%',
        marginTop: 30,
        paddingVertical: 10,
        borderRadius: 28,
        elevation: 3,
        backgroundColor: "#364FC7",
        },
    textButtom:{
        textAlign:'center',
        color:'white',
    },
    input2:{
        borderRadius: 28,
        backgroundColor:"white",
        height:90,
        border: "none"
    },
    

})