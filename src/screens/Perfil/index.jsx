import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { Text, View, StyleSheet, Image } from "react-native";
import { AppHeader } from "../../components/AppHeader";
import { AuthContext } from "../../context/AuthContext";
import { FavItem } from "../../components/favoritos/favoritoItem";

export const Perfil = () => {
  const { userInfo } = useContext(AuthContext);
  const [perfil, setPerfil] = useState([]);

  let id = userInfo.user.id;

  useEffect(() => {
    axios
      .get(`http://192.168.6.20:3010/escolas/users/alunos/${id}`)
      .then((res) => {
        // s
        setPerfil(res.data["aluno"]);
        console.log(res.data["aluno"]);
      });
  }, []);

  return (
    <View style={styles.Container}>
      <AppHeader />
      <View style={styles.bannerBox}>
        <View style={{ position: "relative", }}>
          <View
            style={{
              height: 100,
              width: 100,
 
            }}
          >
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
        </View>

        <View style={styles.profile}>
          <View style={styles.name}>
            <Text>{perfil.name}</Text>
          </View>

          <View style={styles.dados}>
            <Text>{perfil.escola_name}</Text>
            <Text>{perfil.turma_name}</Text>
            <Text>{perfil.mat}</Text>
            <Text>NETO</Text>
          </View>
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
  text: {
    color: "#403B91",
    fontSize: 18,
    fontWeight: "500",
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
  bannerBox: {
    paddingTop:0,
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingTop:25,
    flexDirection: "row",
    backgroundColor: '#4263EB',
    height: 200,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  profile: {
   
  },
});
