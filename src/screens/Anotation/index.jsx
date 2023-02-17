import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import {
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  TextInput,
} from "react-native";
import { AppHeader } from "../../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { useFonts } from "expo-font";
import { Feather } from "@expo/vector-icons";
import api from "../../api/api";
import CustomToast from "../../components/CustomToast";
import { Feather as Icon2} from "@expo/vector-icons";


const HEIGHT = Dimensions.get("screen").height;

export const Anotation = () => {
  //nova notificação
  const [toastType, setToastType] = useState("success");
  const [title, setTitle] = useState("Success");
  const slideAnim = useRef(new Animated.Value(HEIGHT + 50)).current;
  const [tags, setTags] = useState([]);
  
  function handleTags (note) {
    note.map((tags) => {
      setTags(tags.tags)
      console.log(tags)
    })
  }

  const animateToast = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: 500,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }, 2500);
  };

  const showToast = (type, message) => {
    setToastType(type);
    setTitle(message);
    animateToast();
  };

  let [fontsLoaded] = useFonts({
    Medium: require("../../../assets/fonts/Poppins-Medium.ttf"),
    Regular: require("../../../assets/fonts/Poppins-Regular.ttf"),
  });

  const { userInfo } = useContext(AuthContext);
  const navigation = useNavigation();
  const [note, setNote] = useState([]);
  var listaNotes = [];
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
 

  
  useEffect(() => {
    if (searchText === "") {
    getAnotacoes();
    setNote([])
    } else {
      setNote(
        note?.filter( item => {
          if(item.descricao.indexOf(searchText) > -1 ) {
            return true;
          } else {
            return false;
          }
        })
      );
    }
  }, [searchText, refreshing]);


  //timer da duração de atalização
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  //refresh da pagina
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => getAnotacoes(), setRefreshing(false));
  }, []);

  //carregando os lembretes
  const getAnotacoes = async () => {
    try {
      const res = await api.get(`/anotacoesByAluno/${userInfo.user.id}`);
      setNote(res.data["anotacoes"]);
      listaNotes.push(res.data["anotacoes"]);
      handleTags(res.data["anotacoes"].tags)
    } catch (error) {
      throw error;
    }
  };

  //deletando as anotações
  const delAnotacoes = async (id) => {
    try {
      const res = await api.delete(`/anotacoes/${id}`);
      if (res.status === 204) {
        onRefresh();
        showToast("success", "Success");
        color = "#03AE76";
      }
    } catch (error) {
      setTimeout(() => {
        onRefresh();
      }, 5000);
    }
  };

  return (
    <View style={styles.Container}>
      <AppHeader />
      <View>
        <Text
          style={{
            fontFamily: "Medium",
            fontSize: 18,
            color: "#4264EB",
            paddingTop: 20,
            paddingLeft: 20,
          }}
        >
          Minhas anotações
        </Text>

        <View style={{ flexDirection: "row", alignItems:'center', width:'95%' }}>
          <TextInput
          value={searchText}
          onChangeText={(t) => setSearchText(t)}
          placeholder="Pequisar"
            style={{
              flex: 1,
              height: 40,
              backgroundColor: "white",
              marginHorizontal:20,
              borderRadius: 12,
              fontSize: 18,
              paddingLeft: 20,
              paddingRight: 20,
            }}
          />
            <Icon2 name="search" size={25} color="#4264EB" />
        </View>
        <Animated.View
          style={{
            transform: [{ translateX: slideAnim }],
            position: "absolute",
          }}
        >
          <CustomToast
            type={toastType}
            title={"Sucesso"}
            subtitle={`Anotação deletada!`}
          />
        </Animated.View>
      </View>

      {note?.length === 0 ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 200,
          }}
        >
        <Text style={{fontFamily:'Medium', fontSize:16, color: "#343A40"}}>Não existem anotações</Text>
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getAnotacoes} />
          }
        >
          <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
            {note.map((notes) => (
              <TouchableOpacity
                key={notes.id}
                onPress={() =>
                  navigation.navigate("EditAnotation", { id: `${notes.id}` })
                }
              >
                <View style={styles.card} key={notes.id}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.text}>{notes.descricao}</Text>
                    <TouchableOpacity onPress={() => delAnotacoes(notes.id)}>
                      <Feather name="x" size={25} color="gray" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.tag}>
                    {notes.tags?.map((tag) => (
                      <Text key={tag.id} style={styles.tagname}>
                        {`#${tag.name}`}
                      </Text>
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
            ))}

          </View>
        </ScrollView>
      )}
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
    paddingVertical: 10,
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
    bottom: 0,
    marginLeft: 20,
    marginBottom: 10,
    position: "absolute",
    flexDirection: "row",
    width:'80%'
  },
  tagname: {
    margin: 3,
    fontSize: 14,
  },
  fab: {
    backgroundColor: "#4263EB",
    borderRadius: 50,
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
