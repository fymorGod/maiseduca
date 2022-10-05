import { View, Text, StyleSheet, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AppHeader } from "../../components/AppHeader";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export const Classificacao = () => {
  const { userInfo } = useContext(AuthContext);
  const [rank, setRank] = useState([]);
  const [position, setPosition] = useState([]);

  useEffect(() => {
    const getRank = async () => {
      const response = await axios.get(
        `http://192.168.6.20:3010/ranks/1/${userInfo.user.id}`
      );
      setRank(response.data["top_3_rank"]);
      setPosition(response.data["my_position"]);
      console.log(response.data["my_position"]);
    };
    getRank();
  }, []);

  return (
    <View style={styles.Container}>
      <AppHeader />
      <View>
        <Text
          style={{
            fontSize: 16,
            color: "#403B91",
            paddingTop: 20,
            paddingLeft: 20,
          }}
        >
          Classificação
        </Text>
      </View>
      <View style={{ padding: 20, alignItems: "center" }}>
        <Text
          style={{
            fontSize: 18,
            color: "#403B91",
            fontWeight: "400",
            textDecorationLine: "underline",
          }}
        >
          6º Ano B
        </Text>
      </View>
      <View
        style={{
          height: "60%",
          backgroundColor: "white",
          width: "90%",
          borderRadius: 28,
          elevation: 4,
          marginLeft: 20,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            backgroundColor: "#EEBC4E",
            height: "10%",
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "400" }}>
            Top 3 Alunos
          </Text>
        </View>
        <View style={{ flexDirection: "column", padding: 20 }}>
          {rank.map((ranks) => (
            <View
              key={ranks.aluno}
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Image
                style={{ width: 34, height: 34 }}
                source={{ uri: `${ranks.img}` }}
              />
              <Text
                style={{ color: "#364FC7", fontSize: 16, fontWeight: "400" }}
              >{ranks.aluno}
              </Text>
              <Text
                style={{ color: "#364FC7", fontSize: 16, fontWeight: "300" }}
              >{`${ranks.score} pontos`}</Text>
            </View>
          ))}
        </View>

        <View
          style={{
            backgroundColor: "#4263EB",
            height: "30%",
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ alignItems: "center", paddingTop: 10 }}>
            <Text style={{ color: "#fff" }}>Minha Posição</Text>
          </View>
          {position.position === 1 ? (
            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 20,
                flexDirection: "row",
              }}
            >
              <Image
                style={{ height: 60, width: 60 }}
                resizeMode="contain"
                source={require("../../../assets/ouro.png")}
              />
              <View style={{ flexDirection: "column", paddingLeft: 10 }}>
                <Text style={{ fontWeight: "bold", color: "#fff" }}>
                  Parabéns!!
                </Text>
                <Text style={{ color: "#fff" }}>
                  Voce está em primeiro lugar!
                </Text>
              </View>
            </View>
          ) : position.position === 2 ? (
            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 10,
                flexDirection: "row",
              }}
            >
              <Image
                style={{ height: 60, width: 60 }}
                resizeMode="contain"
                source={require("../../../assets/prata.png")}
              />
              <View style={{ flexDirection: "column", paddingLeft: 10 }}>
                <Text style={{ fontWeight: "bold", color: "#fff" }}>
                  Parabéns!!
                </Text>
                <Text style={{ color: "#fff" }}>
                  Voce está em segundo lugar!
                </Text>
              </View>
            </View>
          ) : position.position === 3 ? (
            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 10,
                flexDirection: "row",
              }}
            >
              <Image
                style={{ height: 60, width: 70 }}
                resizeMode="contain"
                source={require("../../../assets/bronze.png")}
              />
              <View style={{ flexDirection: "column", paddingLeft: 10 }}>
                <Text style={{ fontWeight: "bold", color: "#fff" }}>
                  Parabéns!!
                </Text>
                <Text style={{ color: "#fff" }}>
                  Voce está em terceiro lugar!
                </Text>
              </View>
            </View>
          ) : (
            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 10,
                flexDirection: "row",
              }}
            >
              <View style={{ flexDirection: "column", paddingLeft: 10 }}>
                <Text style={{ color: "#fff" }}>
                  Voce está na `${position.position}º` lugar!
                </Text>
              </View>
            </View>
          )}
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
});
