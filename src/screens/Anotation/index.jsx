import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AppHeader } from "../../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import Icon from "react-native-vector-icons/AntDesign";
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

export const Anotation = () => {
  const { userInfo } = useContext(AuthContext);
  const navigation = useNavigation();
  const [note, setNote] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios
      .get(`http://192.168.6.20:3010/anotacoesByAluno/${userInfo.user.id}`)
      .then((res) => {
        // s
        setNote(res.data["anotacoes"]);
        console.log(res.data["anotacoes"]);
      });
  }, []);

  return (
    <View style={styles.Container}>
      <AppHeader />

      <View>
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: 18,
            color: "#403B91",
            paddingTop: 20,
            paddingLeft: 20,
          }}
        >
          Minhas anotações
        </Text>
      </View>

      <ScrollView>
        <View style={{ padding: 10 }}>
          {note.map((notes) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EditAnotation", { id: `${notes.id}` })
              }
            >
              <View style={styles.card} key={notes.id}>
                <Text style={styles.text}>{notes.descricao}</Text>
                <View style={styles.tag}>
                {notes.tags.map((tag) => (
                   <Text style={styles.tagname}>{`#${tag.name}`} </Text>
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
    height: 150,
    backgroundColor: "white",
    marginBottom: 15,
    borderRadius: 25,
    
  },
  text: {
    margin: 10,
    fontSize: 15,
  },
  tag: {
    bottom:0,
    margin: 3,
    position: "absolute",
    flexDirection: "row",
  },
  tagname: {
    margin: 3,
    fontSize: 13,
  },
  fab: {
    backgroundColor: "#4263EB",
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },

  
});
