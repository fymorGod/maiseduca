import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { ScrollView } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useFonts } from "expo-font";
import { AppHeader2 } from "../../components/AppHeader2";

export const MinhasNotas = () => {
  //carregando fontes de texto
  let [fontsLoaded] = useFonts({
    Medium: require("../../../assets/fonts/Poppins-Medium.ttf"),
  });

  //get dados do aluno - notas
  const { userInfo } = useContext(AuthContext);
  const [data, setData] = useState([]);

  //cor das barras dos graficos
  const colors = [
    "violet",
    "cornflowerblue",
    "gold",
    "orange",
    "turquoise",
    "tomato",
    "greenyellow",
  ];

  //get nas notas dos alunos
  const getNotas = async () => {
    const response = await axios.get(
      `http://192.168.6.20:3010/medias/${userInfo.user.id}`
    );
    setData(response.data["medias"]);
    console.log(response.data["medias"]);
  };

  //get nas notas dos alunos
  useEffect(() => {
    getNotas();
  }, []);

  return (
    <View style={styles.container}>
      <AppHeader2 />
      <ScrollView>
        <View style={{ padding: 15 }}>
          <View style={styles.header}>
            <Text
              style={{
                fontFamily: "Medium",
                color: "#403B91",
                fontSize: 18,
                fontWeight: "500",
              }}
            >
              Minhas Notas
            </Text>
          </View>
          <View style={styles.infoMaterias}>
            <View style={styles.boxInfo}>
              <Text style={styles.subTitle}>Melhor matéria: </Text>
              <Text style={styles.infoText}>Matemática</Text>
            </View>
            <View style={styles.boxInfo}>
              <Text style={styles.subTitle}>Tempo na Plataforma: </Text>
              <Text style={styles.infoText}>3 Horas e 45 minutos</Text>
            </View>
          </View>
          <View style={styles.boxGrafico}>
            <VictoryChart
              theme={VictoryTheme.material}
              animate={{ duration: 500 }}
            >
              <VictoryBar
                alignment="start"
                style={{ data: { 
                  width: 30,
                  fill:({ datum }) => datum.x >= 7 ?  'green' : datum.x >= 5 ? 'yellow' : 'red'  } }}
                barWidth={40}
                height={1}
                data={data}
                x="disciplina"
                y="value"
              />
            </VictoryChart>
          </View>
          <View style={styles.boxTable}></View>
        </View>
      </ScrollView>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDF2FF",
  },
  header: {
    width: "100%",
  },
  infoMaterias: {
    flexDirection: "column",
    width: "100%",
  },
  subTitle: {
    fontSize: 16,
    color: "#495057",
    fontWeight: "400",
  },
  infoText: {
    color: "#868E96",
  },
  boxInfo: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 5,
  },
  boxGrafico: {
    width: "100%",
    height: 200,
    alignItems: "center",
  },
  boxTable: {
    width: "100%",
    height: 200,
    padding: 20,
  },
  button: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4263EB",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
  },
});
