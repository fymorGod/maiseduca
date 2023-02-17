import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { ScrollView } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { useFonts } from "expo-font";
import { AppHeader2 } from "../../components/AppHeader2";
import api from "../../api/api";

export const MinhasNotas = () => {
  //carregando fontes de texto
  let [fontsLoaded] = useFonts({
    Medium: require("../../../assets/fonts/Poppins-Medium.ttf"),
    Regular: require("../../../assets/fonts/Poppins-Regular.ttf"),
  });

  //get dados do aluno - notas
  const { userInfo } = useContext(AuthContext);
  const [data, setData] = useState([]);

  //get nas notas dos alunos
  const getNotas = async () => {
    try {
      const response = await api.get(
        `/medias/${userInfo.user.id}`
      );
      setData(response.data["medias"]);
      console.log(response.data["medias"])
    }
     catch (error) {
      console.log(error);
    }
  }

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
                color: "#4264EB",
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
              <Text style={styles.subTitle}>Tempo em atividade: </Text>
              <Text style={styles.infoText}>1 H 27 minutos</Text>
            </View>
            <View style={styles.boxInfo}>
              <Text style={styles.subTitle}>Tempo em Aula: </Text>
              <Text style={styles.infoText}>3H 13 minutos</Text>
            </View>
          </View>
          <View style={styles.boxGrafico}>
              {
                data.length != 0 ? 
                <VictoryChart
                theme={VictoryTheme.material}
                animate={{ duration: 500 }}
              >
                <VictoryBar
                  alignment="start"
                  style={{
                    data: {
                      fill: ({ datum }) => (datum.y >= 7 ? "#EBC942" : "#3BA8B9"),
                      fillOpacity: 0.7,
                      strokeWidth: 2,
                    },
                  }}
                  labels={({ datum }) => datum.y}
                  barWidth={40}
                  height={1}
                  data={data}
                  x="disciplina"
                  y="value"
                />
              </VictoryChart>
              : 
              <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
                  <Text style={{fontFamily:'Regular', fontSize:16, color: "#343A40",}}>Não existem médias</Text>
              </View>
              }
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
    color: "#343A40",
    fontFamily: "Medium",
  },
  infoText: {
    color: "#343A40",
    fontFamily: "Regular",
  },
  boxInfo: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 5,
    alignItems: "center",
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
