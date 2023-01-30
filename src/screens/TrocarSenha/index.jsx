import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { AppHeader } from "../../components/AppHeader";
import { AuthContext } from "../../context/AuthContext";
("react-native");
import { useNavigation } from "@react-navigation/native";
import { ScrollView, useToast } from "native-base";
import { useFonts } from "expo-font";
import { AppHeader2 } from "../../components/AppHeader2";
import api from "../../api/api";




export const TrocarSenha = () => {
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const { userInfo } = useContext(AuthContext);
  const [atual, setAtual] = useState();
  const [novaSenha, setNovaSenha] = useState();
  const [novaSenha1, setNovaSenha1] = useState();
  const toast = useToast();
  //id para trocar senha do aluno
  let id = userInfo.user.id_senha;


  //carregando fonte de texto
  let [fontsLoaded] = useFonts({
    Medium: require("../../../assets/fonts/Poppins-Medium.ttf"),
  });

  //função para mudar senha do aluno
  const mudarSenha = async () => {
    if (atual.length != 0 || novaSenha === novaSenha1){
      try {
        const response = await api.put(
          `/escolas/users/change_password`,
          {
            actual_password: atual,
            new_password: novaSenha1,
            id_user: `${id}`,
          }
        );
        if (response.status === 200) {
          logout();
        }
      } catch (error) {
        throw error;
      }
    }     
  };




  return (
    <View style={styles.Container}>
      <AppHeader2 />
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
          Senha
        </Text>
      </View>
      <ScrollView>
        <View>
          <Text
            style={{
              fontFamily: "Medium",
              fontSize: 16,
              color: "#4264EB",
              paddingTop: 20,
              paddingLeft: 30,
            }}
          >
            Senha atual
          </Text>
          <View style={{ paddingHorizontal: 20 }}>

            <TextInput
            value={atual}
            onChangeText={(text) => setAtual(text)}
            secureTextEntry
            keyboardType="visible-password"
            placeholder="**************"
            style={{
              backgroundColor: "#FFF",
              borderRadius: 12,
              height: 40,
              paddingHorizontal: 10,
            }}
          />

          

          </View>
        </View>
        <View>
          <Text
            style={{
              fontFamily: "Medium",
              fontSize: 16,
              color: "#4264EB",
              paddingTop: 20,
              paddingLeft: 30,
            }}
          >
            Nova senha
          </Text>
          <View style={{ paddingHorizontal: 20 }}>
            <TextInput
            value={novaSenha}
            onChangeText={(text) => setNovaSenha(text)}
            secureTextEntry
            keyboardType="visible-password"
            placeholder="**************"
            style={{
              backgroundColor: "#FFF",
              borderRadius: 12,
              height: 40,
              paddingHorizontal: 10,
            }}
          />

          </View>
        </View>
        <View>
          <Text
            style={{
              fontFamily: "Medium",
              fontSize: 16,
              color: "#4264EB",
              paddingTop: 20,
              paddingLeft: 30,
            }}
          >
            Confirmar nova senha
          </Text>
          <View style={{ paddingHorizontal: 20 }}>
            <TextInput
            value={novaSenha1}
            onChangeText={(text) => setNovaSenha1(text)}
            secureTextEntry
            keyboardType="visible-password"
            placeholder="**************"
            style={{
              backgroundColor: "#FFF",
              borderRadius: 12,
              height: 40,
              paddingHorizontal: 10,
            }}
          />
 
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            style={{
              width: "43%",
              alignItems: "center",
              marginHorizontal: 6,
              marginTop: 20,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 12,
              elevation: 0,
              backgroundColor: "#D1DEFE",
            }}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ color: "#343A40", fontFamily:"Medium" }}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "43%",
              alignItems: "center",
              marginHorizontal: 6,
              marginTop: 20,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 12,
              elevation: 0,
              backgroundColor: "#4263EB",
            }}
            onPress={() => mudarSenha()}
          >
            <Text style={{ color: "#fff" }}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#EDF2FF",
  },
});
