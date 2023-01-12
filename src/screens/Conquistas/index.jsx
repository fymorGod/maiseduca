import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Animated,
  Image
} from "react-native";
import { AppHeader } from "../../components/AppHeader";
import { useFonts } from "expo-font";
import api from "../../api/api";
import { AuthContext } from "../../context/AuthContext";

export const Conquistas = () => {
  const [conquistas, setConquistas] = useState([]);
  const { userInfo } = useContext(AuthContext);

  const getConquistas = async () => {
    try {
      const res = await api.get(
        `/escolas/users/alunos/${userInfo.user.id}/conquistas`
      );
      setConquistas(res.data["conquistas"]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getConquistas();
  }, []);

  let [fontsLoaded] = useFonts({
    Medium: require("../../../assets/fonts/Poppins-Medium.ttf"),
    Regular: require("../../../assets/fonts/Poppins-Regular.ttf"),
  });

  const [progress, setProgress] = useState(new Animated.Value(100));
  const progressAnim = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.Container}>
      <AppHeader />
      <View style={{ marginBottom: 10 }}>
        <Text
          style={{
            fontFamily: "Medium",
            fontSize: 18,
            color: "#4264EB",
            paddingTop: 20,
            paddingLeft: 20,
          }}
        >
          Conquistas
        </Text>
      </View>

      <ScrollView>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
        {
          conquistas.length != 0 
          ?             conquistas.map((conq, i) => {
            return (
              <View key={i} style={styles.card}>
                <View
                  style={{
                    flexDirection: "row",
                    width: "80%",
                    marginTop: 10,
                    marginLeft: 5,
                    marginRight: 5,
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ height: 100, width: 90 }}>
                    <Image
                      style={{ height: "100%", width: "100%" }}
                      resizeMode="contain"
                      source={{
                      uri: `${conq.conquista.icon}`
                    }}
                    />
                  </View>

                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: "column",
                      width: "90%",
                    }}
                  >
                    <View style={{ width: "90%" }}>
                      <Text style={{ fontFamily: "Medium", fontSize: 16 }}>
                        {conq.conquista.name}
                      </Text>
                    </View>
                    <Text style={{ fontFamily: "Regular", fontSize: 13 }}>
                      {conq.conquista.description}
                    </Text>
                    <View style={{ marginTop: 10, width: "90%" }}>
                      <Animated.View
                        style={[
                          {
                            height: 20,
                            borderRadius: 20,
                            backgroundColor:`${conq.conquista.color}`,
                            alignItems: "center",
                          },
                          {
                            width: conq.progress,
                          },
                        ]}
                      >
                        <Text style={{ color: "#fff" }}>100%</Text>
                      </Animated.View>
                    </View>
                  </View>
                </View>
              </View>
            );
          })
          : 
          <View style={{flex: 1, alignItems:'center', justifyContent:'center', marginTop: 230, width:'90%'}}>
            <Text style={{fontFamily:"Regular", fontSize:16, textAlign:'center'}}>Não existem conquistas desbloqueadas</Text>
          </View>
        }
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
  card: {
    flexWrap: "wrap",
    width: "90%",
    height: 150,
    backgroundColor: "white",
    marginBottom: 15,
    borderRadius: 10,
    elevation: 5,
  },
  text: {
    margin: 10,
    fontSize: 15,
  },
});
