import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AuthContext } from "../../context/AuthContext";
("react-native");
import { useNavigation } from "@react-navigation/native";
import { AppHeader2 } from "../../components/AppHeader2";
import { useFonts } from "expo-font";
import api from "../../api/api";



export const Perfil = () => {
  const navigation = useNavigation();
  const { userInfo } = useContext(AuthContext);
  const [perfil, setPerfil] = useState([]);
  //id do aluno
  let id = userInfo.user.id;

  //get nas informações do aluno
  useEffect(() => {
    api
      .get(`/escolas/users/alunos/${id}`)
      .then((res) => {
        // s
        setPerfil(res.data["aluno"]);
      });
  }, []);

  let [fontsLoaded] = useFonts({
    'Medium': require('../../../assets/fonts/Poppins-Medium.ttf')
  })

  return (
    <View style={styles.Container}>
      <AppHeader2 />
      <View style={[styles.bannerBox, styles.shadowProp]}>
        <View style={[styles.imgBox]}>
          <Image
            style={styles.bannerMoldura}
            resizeMode="contain"
            source={require("../../../assets/moldura.png")}
          />
          <Image
            style={styles.bannerAvatar}
            resizeMode="contain"
            source={require("../../../assets/avatar.png")}
          />
        </View>
        <View style={styles.profile}>
          <View style={styles.name}>
            <Text style={styles.nome}>{perfil.name}</Text>
          </View>
          <View style={styles.dados1}>
            <Image
              style={{ width: 10, marginRight: 5 }}
              resizeMode="contain"
              source={require("../../../assets/local.png")}
            />
            <Text
              style={{
                color: "#fff",
                fontSize: 12,
                textAlign: "center",
              }}
            >
              {perfil.escola_name}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.dados2}>
              <Image
                style={{ width: 15, marginRight: 5 }}
                resizeMode="contain"
                source={require("../../../assets/card.png")}
              />
              <Text
                style={{
                  color: "#fff",
                  fontSize: 12,

                  textAlign: "center",
                }}
              >
                {perfil.mat}
              </Text>
            </View>
            <View style={styles.dados11}>
              <Image
                style={{ width: 15, marginRight: 5 }}
                resizeMode="contain"
                source={require("../../../assets/carteira.png")}
              />
              <Text
                style={{
                  color: "#fff",
                  fontSize: 12,
                  textAlign: "center",
                }}
              >
                {perfil.turma_name}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.dados22}>
              <Image
                style={{ width: 15, marginRight: 5 }}
                resizeMode="contain"
                source={require("../../../assets/moeda.png")}
              />
              <Text
                style={{
                  color: "#fff",
                  fontSize: 12,
                  textAlign: "center",
                }}
              >
                {perfil.points}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ padding: 20, height: "20%" }}>
        <View
          style={{
            backgroundColor: "#91A7FF",
            width: "100%",
            height: "100%",
            borderRadius: 32,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <Image
            style={{ width: 100, marginRight: 10 }}
            resizeMode="contain"
            source={require("../../../assets/molduraPerfil.png")}
          />
          <View>
            <Text style={{ color: "#fff" }}>
              Você está na divisão ouro, {"\n"}faça as atividades e assista{" "}
              {"\n"}aulas para chegar ao {"\n"}Platina!
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "column" }}>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("MinhasNotas");
            }}
          >
            <Text style={{ color: "#343A40", fontFamily:"Medium", textAlign: "center"}}>Minhas Notas</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{
              marginHorizontal: 20,
              marginTop: 5,
              paddingVertical: 10,
              borderRadius: 12,
              elevation: 3,
              backgroundColor: "#00B7B7",
            }}
            onPress={() => navigation.navigate("Classificacao")}
          >
            <Text style={{color: "#343A40", fontFamily:"Medium", textAlign: "center"}}>Classificação</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{
              marginHorizontal: 20,
              marginTop: 5,
              paddingVertical: 10,
              borderRadius: 12,
              elevation: 3,
              backgroundColor: "#00B7B7",
            }}
            onPress={() => navigation.navigate("Configuracao")}
          >
            <Text style={{ color: "#343A40", fontFamily:"Medium", textAlign: "center" }}>
              Configuração
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#EDF2FF",
  },
  bannerMoldura: {
    position: "absolute",
    height: 150,
  },
  bannerAvatar: {
    position: "absolute",
    marginLeft: 10,
    marginTop: 6,
    height: 90,
  },
  imgBox: {
    position: "relative",
    width: "40%",
  },
  bannerBox: {
    flex: 0.6,
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingTop: 25,
    flexDirection: "row",
    backgroundColor: "#4263EB",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    elevation: 0,
  },
  shadowProp: {
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  profile: {
    width: "70%",
    paddingHorizontal: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  name: {
    textAlign: "center",
  },
  nome: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dados1: {
    height: 30,
    width: 195,
    marginRight: 10,
    backgroundColor: "#364FC7",
    borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  dados11: {
    marginTop: 5,
    height: 30,
    width: 70,
    marginRight: 10,
    backgroundColor: "#364FC7",
    borderRadius: 28,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  dados2: {
    marginTop: 5,
    height: 30,
    width: 120,
    alignItems: "center",
    marginRight: 5,
    backgroundColor: "#364FC7",
    borderRadius: 28,
    flexDirection: "row",
    justifyContent: "center",
  },
  dados22: {
    marginTop: 5,
    height: 30,
    width: 80,
    backgroundColor: "#00A1A1",
    borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#00B7B7",
  },
  text: {
    textAlign: "center",
    color: "white",
  },
});
