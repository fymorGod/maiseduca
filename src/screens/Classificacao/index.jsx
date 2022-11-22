import { View, Text, StyleSheet, Image,TouchableOpacity, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useFonts } from "expo-font";
import { AppHeader2 } from "../../components/AppHeader2";
import {Image as Image1}  from 'react-native-expo-image-cache';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height; 

export const Classificacao = () => {
  let [fontsLoaded] = useFonts({
    'Medium': require('../../../assets/fonts/Poppins-Medium.ttf')
  })

  const [finalRank, setFinalRank] = useState([]);
  const { userInfo } = useContext(AuthContext);
  const [choice,  setChoice] = useState("escola")
  const [rank, setRank] = useState([]);
  const [position, setPosition] = useState(0);
  const [points, setPoints] = useState([]);
  const [ clicked, setClicked ] = useState(0);
  
  //get no rank do aluno
  useEffect(() => {
    const getRank = async () => {
      const response = await axios.get(
        `http://35.199.114.75:3010/ranks/${userInfo.user.id}`
      );
      setRank(response.data[choice]);
      setPoints(response.data["points"]);
    };
    getRank(); 
  }, [choice]);
  

  //opções do tipos de ranks
  const detailsTabs = [
    {id: 1, label: "escola"},
    {id: 2, label: "serie"},
    {id: 3, label: "turma"},
  ]
  const handleClick = (id, item) => {
    setClicked(id)
    console.log(rank)
    setPosition(rank[choice])
    setChoice(item)
    setFinalRank(rank[choice])
  }
  
  //menu dos ranks
  const renderTabsRanking = () => {
    return (
      <View style={{
        width: '100%',
        borderRadius: 8,
        flexDirection:'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginTop: 20
      }}>
        {
          detailsTabs.map((item, index) => {
            return (
              <TouchableOpacity 
              key={index}
              onPress={(i) => handleClick(index, item.label)}
              style={
                [ index === clicked ? styles.buttonTabsActive: styles.buttonTabs]          
              }
              >
                <Text style={{fontSize: 16}}>{item.label}</Text>
              </TouchableOpacity>
            );
          })
        }
      </View> 
    );
  }
  
  return (
    <View style={styles.Container}>
      <AppHeader2 />
      <View>
        <Text
          style={{
            fontFamily:"Medium",
            fontSize: 16,
            color: "#403B91",
            paddingTop: 20,
            paddingLeft: 20,
          }}
        >
          Classificação
        </Text>
      </View>

      <View style={{ alignItems: "center", marginBottom:20 }}>
        {renderTabsRanking()}
      </View>

    <View style={{paddingHorizontal: 20, height: '100%'}}>
    <View
    style={{      
      height: windowHeight * 0.50,
      backgroundColor: "white",
      width: "100%",
      borderRadius: 28,
      elevation: 4,          
      position:'relative'
    }}
  >
    <View
      style={{
        backgroundColor: "#EEBC4E",
        height: 50,
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
    <View style={{flexDirection: "column", justifyContent:'space-between', justifyContent: 'center'}}>
      {
        rank.map((ranks, index) => {
          return (
            <View  key={index}  style={{flexDirection: 'column',justifyContent:'space-between', height: 80}}>
           {index < 3 &&  <View  style={{flexDirection: "row", justifyContent: "space-between", padding:10, alignItems:"center" }}>
           <Image1
           style={{ height: 50, width: 50 }}
           resizeMode="contain"
           uri={`${ranks.img}`}
           />
            <Text style={{color: "#403B91", fontSize: 16}}>{ranks.name}</Text>
              <Text style={{color: "#403B91", fontSize: 14}}>{ranks.points}</Text>     
            </View>}
            {
              ranks.my_position && 
              <View
              style={{
                width: '100%',
                backgroundColor: "#4263EB",
                height: windowHeight * 0.180,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
              >
                <View style={{ alignItems: "center", paddingTop: 10 }}>
                  <Text style={{ color: "#fff" }}>Minha Pontuação: {points}</Text>
                </View>
                
                {
                  ranks.my_position == 1 ? (
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
                ) : ranks.my_position === 2 ? (
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
                ) : ranks.my_position === 3 ? (
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
                        Voce está na {ranks.my_position} lugar!
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            }
            </View>
          );
        })
      }
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
  buttonTabsActive: {
    flexDirection:'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#4162EB'
  }, 
  buttonTabs: {
    flexDirection:'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2F598431'
  },
});
