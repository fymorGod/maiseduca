import axios from "axios";
import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AppHeader } from "../../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import Icon from "react-native-vector-icons/AntDesign";
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { useFonts } from "expo-font";

export const Anotation = () => {
  const [fontsLoaded] = useFonts({
    Medium: require('../../../assets/fonts/Poppins-Medium.ttf')
  })

  const { userInfo } = useContext(AuthContext);
  const navigation = useNavigation();
  const [note, setNote] = useState([]);
  const [tags, setTags] = useState([]);
  const [refreshing, setRefreshing] = useState(false)

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() =>
    getAnotacoes(),
    setRefreshing(false)
    );
  }, []);

  const getAnotacoes = async() => {
    try {
      const res = await axios.get(`https://mais-educacao.herokuapp.com/anotacoesByAluno/${userInfo.user.id}`)
      setNote(res.data["anotacoes"]);
      console.log(res.data["anotacoes"]);
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
      getAnotacoes();
  }, []);

  return (
    <View style={styles.Container}>
      <AppHeader />
      <View>
        <Text
          style={{
            fontFamily: "Medium",
            fontSize: 18,
            color: "#403B91",
            paddingTop: 20,
            paddingLeft: 20,
          }}
        >
          Minhas anotações
        </Text>
      </View>

      <ScrollView
        refreshControl={<RefreshControl
          refreshing={refreshing}
          onRefresh={getAnotacoes}
        />
      }
      >
        <View style={{ paddingHorizontal: 25, paddingVertical:10 }}>
          {note.map((notes) => (
            <TouchableOpacity
              key={notes.id}
              onPress={() =>
                navigation.navigate("EditAnotation", { id: `${notes.id}` })
              }
            >
              <View style={styles.card} key={notes.id}>
                <Text style={styles.text}>{notes.descricao}</Text>
                <View style={styles.tag}>
                {notes.tags.map((tag) => (
                   <Text key={tag.id} style={styles.tagname}>{`#${tag.name}`} </Text>
                    ))}
                  </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <FAB
      icon="plus"
      color="white"
      style={styles.fab}
      onPress={() => navigation.navigate("CreateAnotation")}
    />
    </View>
  );
};

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#EDF2FF",
  },
  card: {
    paddingHorizontal: 10,
    height: 110,
    backgroundColor: "white",
    marginBottom: 15,
    borderRadius: 10,
    
  },
  text: {
    margin: 10,
    fontSize: 15,
  },
  tag: {
    flexWrap: "wrap",
    bottom:0,
    marginLeft: 20,
    marginBottom:10,
    position: "absolute",
    flexDirection: "row",
  },
  tagname: {
    margin: 3,
    fontSize: 13,
  },
  fab: {
    backgroundColor: "#4263EB",
    borderRadius: 50,
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },

  
});