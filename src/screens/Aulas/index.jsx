import axios from "axios";
import { useFonts } from "expo-font";
import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, ScrollView } from "react-native";
import api from "../../api/api";
import { AppHeader } from "../../components/AppHeader";
import { MateriaItem } from "../../components/materias";
import { AuthContext } from "../../context/AuthContext";

//carregando fonte
export const Aulas = () => {
  let [fontsLoaded] = useFonts({
    Medium: require("../../../assets/fonts/Poppins-Medium.ttf"),
  });

  const { userInfo } = useContext(AuthContext);
  const [materias, setMaterias] = useState([]);

  //get nas aulas
  useEffect(() => {
    api
      .get(`/disciplinasAluno/${userInfo.user.id}`)
      .then((res) => {
        // s
        setMaterias(res.data["disciplinas"]);
      });
  }, []);

  return (
    <View style={styles.Container}>
      <AppHeader />
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
        Disciplinas
        </Text>
      </View>
      <View style={styles.lista}>
        {/* Carregando as materias do aluno */}
       {
        materias.length != 0 
        ?  <FlatList
        data={materias}
        numColumns={2}
        keyExtractor={(materia, index) => index.toString()}
        renderItem={(materia) => <MateriaItem {...materia.item.disciplina} />}
      />
      :
      <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
        <Text style={{fontFamily:'Medium', fontSize:16, color: "#343A40"}}>Não existem disciplinas</Text>
      </View>
       }
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#EDF2FF",
  },
  lista: {
    height:'80%',
    marginTop: 10,
    alignItems: "center",
  },
});
