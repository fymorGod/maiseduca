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
import  Icon2  from 'react-native-vector-icons/Octicons';
import { useFonts } from "expo-font";
import ToastManager, { Toast } from 'toastify-react-native'
import { Feather } from '@expo/vector-icons';

export const Anotation = () => {

  let [fontsLoaded] = useFonts({
    'Medium': require('../../../assets/fonts/Poppins-Medium.ttf')
  })

  const { userInfo } = useContext(AuthContext);
  const navigation = useNavigation();
  const [note, setNote] = useState([]);
  var listaNotes = [];
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getAnotacoes()
  }, []);

  // função de alerta de notificação deletada e criada
  const showToasts = () => {
    Toast.success('Anotação deletada')
}

  //timer da duração de atalização
  const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
  }

  //refresh da pagina
  const onRefresh = useCallback(()=>{
    setRefreshing(true);
    wait(2000).then(()=>
    getAnotacoes(),
    setRefreshing(false)
    )
  }, []);

  //carregando os lembretes
  const getAnotacoes = async() => {
    try {
      const res = await axios.get(`http://192.168.6.20:3010/anotacoesByAluno/${userInfo.user.id}`)
      setNote(res.data["anotacoes"]);
      listaNotes.push(res.data["anotacoes"])
      console.log(res.data["anotacoes"]);
    } catch (error) {
      console.log(error)
    }
  }

  //deletando as anotações
  const delAnotacoes = async(id) => {
    try {
      const res = await axios.delete(`http://192.168.6.20:3010/anotacoes/${id}`)
      if(res.status === 204){
        showToasts();
        onRefresh();
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <View style={styles.Container}>
      <AppHeader />
      <ToastManager />
      <View>
        <Text
          style={{
            fontFamily:"Medium",
            fontSize: 18,
            color: "#4264EB",
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
        <View style={{ paddingHorizontal: 20, paddingVertical:10 }}>
          {note?.map((notes, index) => (
            <TouchableOpacity
              key={notes.id}
              onPress={() =>
                navigation.navigate("EditAnotation", { id: `${notes.id}` })
              }
            >
              <View style={styles.card} key={notes.id}>
                <View style={{flexDirection:'row', alignItems:'flex-start', justifyContent:'space-between'}}>
                <Text style={styles.text}>{notes.descricao}</Text>
                <TouchableOpacity
                onPress={() => delAnotacoes(notes.id)
}
                >
                <Feather name="x" size={25} color="gray" />
                </TouchableOpacity>
                </View>
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
    paddingVertical:10,
    height: 160,
    backgroundColor: "white",
    marginBottom: 15,
    borderRadius: 10,
    
  },
  text: {
    fontSize: 16,
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
    fontSize: 14,
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