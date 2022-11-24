import axios from "axios";
import { useFonts } from "expo-font";
import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import Tags from "react-native-tags";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { AppHeader2 } from "../../components/AppHeader2";
import { ScrollView } from "native-base";

export const EditAnotation = ({ route }) => {
  //carregando fonte
  let [fontsLoaded] = useFonts({
    Medium: require("../../../assets/fonts/Poppins-Medium.ttf"),
  });

  const navigation = useNavigation();
  const { userInfo } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState();
  let id = route.params.id;

  //função do botaõ de envio da anotação
  const onSubmit = (title) => {
    EditarNota(title);
  };

  //alterando os dados para editar anotação
  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === "title") setTitle(text);
    if (valueFor === "taag") setDesc(text);
  };

  //get da rota de editar a anotação
  useEffect(() => {
    axios.get(`http://192.168.6.20:3010/anotacoes/${id}`).then((res) => {
      setTitle(res.data["anotacao"].descricao);
      setTags(res.data["anotacao"].tags);
    });
  }, []);

  //função de editar a anotação
  const EditarNota = async () => {
    try {
      const response = await axios.put(
        `http://192.168.6.20:3010/anotacoes/${id}`,
        {
          descricao: title,
          id_aluno: `${userInfo.user.id}`,
          array_tags: tags,
        }
      );
      if (response.status === 200) {
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.Container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <AppHeader2 />
      <ScrollView style={{height:'100%'}}>
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
            Editar anotação
          </Text>
        </View>

        <View style={{ paddingHorizontal: 20, paddingVertical: 10, height:'60%', }}>
          <TextInput
          multiline={true}
          style={styles.input}
          value={title}
          placeholder="Title"
          onChangeText={(text) => handleOnChangeText(text, "title")}
          />
        </View>

      <View style={styles.textbox}>
        <View style={{marginTop:5}}>
        <Text
        style={{
          position: "absolute",
          fontFamily: "Medium",
          fontSize: 18,
          color: "#4264EB",
        }}
      >
      Tags
      </Text>
        </View>
        <View style={{marginTop:20}}>
        <Tags
        key={tags}
        initialTags={tags}
        style={{
          height: 100,
          marginTop: 20,
          fontSize: 14,
        }}
        onChangeTags={(tags) => setTags(tags)}
        onTagPress={(index, tagLabel, event, deleted) =>
          console.log(
            index,
            tagLabel,
            event,
            deleted ? "deleted" : "not deleted"
          )
        }
        containerStyle={{
          borderRadius: 10,
          backgroundColor: "#FFFFFF",
          justifyContent: "flex-start",
        }}
        inputStyle={{
          backgroundColor: "#FFFFFF",
          color: "#606060",
          fontWeight: "bold",
        }}
      />
        </View>
        <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
          marginTop:20
        }}
      >
      <TouchableOpacity
      style={styles.buttonCancelar}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Text style={styles.textCancelar}>Cancelar</Text>
    </TouchableOpacity>
  
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onSubmit(title);
            }}
          >
            <Text style={styles.textSalvar}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#EDF2FF",
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    textAlignVertical: "top",
    height: 450,
    backgroundColor: "white",
    borderRadius: 10,
  },
  button: {
    width: "48%",
    paddingVertical: 10,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#4264EB",
    alignItems:'center'
  },
  text: {
    color: "white",
  },
  textSalvar: {
    textAlign: "center",
    color: "white",
    fontFamily:"Medium",
    fontSize:16
  },
  textbox: {
    height:'25%',
    paddingHorizontal: 20,
    paddingVertical: 10, 
  },
  buttonCancelar: {
    width: "48%",
    paddingVertical: 10,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#D1DEFE",
    alignItems:'center'
  },
  textCancelar: {
    color: "#343A40",
    fontFamily:"Medium",
    fontSize:16
  },
});