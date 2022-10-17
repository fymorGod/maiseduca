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
import { ScrollView } from "native-base";

export const TrocarSenha = () => {
  const {logout} = useContext(AuthContext);
  const navigation = useNavigation();
  const { userInfo } = useContext(AuthContext);
  const [atual, setAtual] = useState();
  const [novaSenha, setNovaSenha] = useState();
  const [novaSenha1, setNovaSenha1] = useState();
  let id = userInfo.user.id_senha;


  const mudarSenha = async() => {
    try {
      const response = await axios
      .put(`http://192.168.6.20:3010/escolas/users/change_password`, {
        'actual_password' : atual,
        'new_password': novaSenha1,
        'id_user': `${id}`
      });
      if(response.status === 200){
        logout()
      }
           
    } catch (error) {
      console.log(error)
    }

  };



  return (
    <View style={styles.Container}>
      <AppHeader />
      <View>
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: 16,
            color: "#403B91",
            paddingTop: 20,
            paddingLeft: 20,
          }}
        >
          Configurações
        </Text>
      </View>
      <ScrollView>
        <View>
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              fontSize: 16,
              color: "#403B91",
              paddingTop: 20,
              paddingLeft: 30,
            }}
          >
            Senha atual
          </Text>
          <View style={{ paddingHorizontal: 20 }}>
            <TextInput
                value={atual}
                onChangeText={text => setAtual(text)}
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
              fontFamily: "Poppins_500Medium",
              fontSize: 16,
              color: "#403B91",
              paddingTop: 20,
              paddingLeft: 30,
            }}
          >
            Nova senha
          </Text>
          <View style={{ paddingHorizontal: 20 }}>
            <TextInput
                value={novaSenha}
                onChangeText={text => setNovaSenha(text)}
              secureTextEntry
              placeholder="***************"
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
              fontFamily: "Poppins_500Medium",
              fontSize: 16,
              color: "#403B91",
              paddingTop: 20,
              paddingLeft: 30,
            }}
          >
            Confirmar nova senha
          </Text>
          <View style={{ paddingHorizontal: 20 }}>
            <TextInput
                
                value={novaSenha1}
                onChangeText={text => setNovaSenha1(text)}
              secureTextEntry
              placeholder="***************"
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
              width: "42%",
              alignItems: "center",
              marginHorizontal: 6,
              marginTop: 20,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 28,
              elevation: 0,
              backgroundColor: "#BAC8FF",
            }}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ color: "#4263EB" }}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "42%",
              alignItems: "center",
              marginHorizontal: 6,
              marginTop: 20,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 28,
              elevation: 0,
              backgroundColor: "#4263EB",
            }}
            onPress={() => {

                 if(novaSenha === novaSenha1){
                     mudarSenha();
                 }
            }}
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