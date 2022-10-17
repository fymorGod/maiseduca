import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';
import { ScrollView } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppHeader } from "../../components/AppHeader";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export const MinhasNotas = () => {
  //get dados do aluno - notas
  const { userInfo } = useContext(AuthContext)
  const [ data, setData ] = useState([]);

  useEffect(()=> {
    const getNotas = async () => {
      const response = await axios.get(`http://192.168.6.20:3010/medias/${userInfo.user.id}`);
      setData(response.data["medias"]);
    }
    getNotas();
  }, [])
  console.log(data);
  return (
    <View style={styles.container}>
      <AppHeader />
      <ScrollView>
       <View style={{padding: 15}}>
        <View style={styles.header}>
            <Text style={styles.title}>Minhas Notas</Text>
        </View>
        <View style={styles.infoMaterias}>
        <View style={styles.boxInfo}>
            <Text style={styles.subTitle}>Melhor matéria: </Text>
            <Text style={styles.infoText}>Geografia</Text>
        </View>
        <View style={styles.boxInfo}>
            <Text style={styles.subTitle}>Tempo na Plataforma: </Text>
            <Text style={styles.infoText}>15 Minutos</Text>
        </View>
        </View>
        <View style={styles.boxGrafico}>
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryBar
            style={{data:{width:30}}}
            barWidth={15}
            height={1}
            animate
            data={data}
            x="disciplina"
            y="value"
            />
          </VictoryChart>
        </View>
        <View style={styles.boxTable}>
       
        </View>
      
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
  title: {
    color: "#403B91",
    fontSize: 18,
    fontWeight: '500'
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
    paddingVertical: 10,
  },
  boxGrafico: {
    width: '100%',
    height: 200,
    alignItems: 'center'
  },
  boxTable: {
    width: '100%',
    height: 200,
    padding: 20
  },
  button: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4263EB',
    padding: 15,
    borderRadius: 10
  },
  buttonText: {
    color: '#fff'
  }
});
