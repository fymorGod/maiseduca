import axios from "axios";
import "react-native-gesture-handler";
import React, { useContext, useRef, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView,Platform, ScrollView} from 'react-native';
import { AuthContext } from "../../context/AuthContext";
import Tags from "react-native-tags";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { AppHeader2 } from "../../components/AppHeader2";
import api from "../../api/api";

export const AnotationAula = ({route}) => {

    //carregando a fonte de texto
    let [fontsLoaded] = useFonts({
        'Medium': require('../../../assets/fonts/Poppins-Medium.ttf')
    })

    id = route.params.id

  const navigation = useNavigation();
  const { userInfo } = useContext(AuthContext);
  const [ descricao, setDescricao ] = useState();
  const [tags, setTags] = useState([route.params.name]);

  //função para envio da criação da anotação
  const onSubmit = (descricao) => {
      criarNota(descricao)
    };
    
    //função do post da anotação
  const criarNota = async() => {
      try {
          const response = await api
          .post(`/anotacoes`, {
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
      <KeyboardAvoidingView
      style={styles.Container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <AppHeader2 />
      <ScrollView style={{height:'100%'}}>
        <View>
          <Text
            style={{
              fontFamily: "Medium",
              fontSize: 18,
              color: "#4264EB",
              paddingTop: 20,
              paddingLeft: 20,
            }}
          >
            Editar anotação
          </Text>
        </View>

        <View style={{ paddingHorizontal: 20, paddingVertical: 10, height:'60%', }}>
          <TextInput
          multiline={true}
          style={styles.input}
          placeholder="Digite sua anotação"
          value={descricao}
          onChangeText={text => setDescricao(text)}
          />
        </View>

      <View style={styles.textbox}>
        <View style={{marginTop:5}}>
        <Text
        style={{
          position: "absolute",
          fontFamily: "Medium",
          fontSize: 18,
          color: "#4264EB",
        }}
      >
      Tags
      </Text>
        </View>
        <View style={{marginTop:20}}>
        <Tags
        key={tags}
        initialTags={tags}
        style={{
          height: 100,
          marginTop: 20,
          fontSize: 14,
        }}
        onChangeTags={(tags) => setTags(tags)}
        onTagPress={(index, tagLabel, event, deleted) =>
         console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
         }
        containerStyle={{
          borderRadius: 10,
          backgroundColor: "#FFFFFF",
          justifyContent: "flex-start",
        }}
        inputStyle={{
          backgroundColor: "#FFFFFF",
          color: "#606060",
          fontWeight: "bold",
        }}
      />
        </View>
        <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
          marginTop:20
        }}
      >
      <TouchableOpacity
      style={styles.buttonCancelar}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Text style={styles.textCancelar}>Cancelar</Text>
    </TouchableOpacity>
  
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onSubmit(descricao);
              }}
          >
            <Text style={styles.textSalvar}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#EDF2FF",
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    textAlignVertical: "top",
    height: 450,
    backgroundColor: "white",
    borderRadius: 10,
  },
  button: {
    width: "48%",
    paddingVertical: 10,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#4264EB",
    alignItems:'center'
  },
  text: {
    color: "white",
  },
  textSalvar: {
    textAlign: "center",
    color: "white",
    fontFamily:"Medium",
    fontSize:16
  },
  textbox: {
    height:'25%',
    paddingHorizontal: 20,
    paddingVertical: 10, 
  },
  buttonCancelar: {
    width: "48%",
    paddingVertical: 10,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#D1DEFE",
    alignItems:'center'
  },
  textCancelar: {
    color: "#343A40",
    fontFamily:"Medium",
    fontSize:16
  },
});