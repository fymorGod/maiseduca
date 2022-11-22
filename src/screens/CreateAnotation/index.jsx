import axios from "axios";
import "react-native-gesture-handler";
import React, { useContext, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import Tags from "react-native-tags";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import ToastManager, { Toast } from "toastify-react-native";
import { AppHeader2 } from "../../components/AppHeader2";
import { ScrollView } from "native-base";

export const CreateAnotation = ({}) => {
  //carregando fonte do texto
  let [fontsLoaded] = useFonts({
    Medium: require("../../../assets/fonts/Poppins-Medium.ttf"),
  });

  const navigation = useNavigation();
  const { userInfo } = useContext(AuthContext);
  const [descricao, setDescricao] = useState();
  const [tags, setTags] = useState([]);
  const value = 1;

  //função de envio da anotação
  const onSubmit = (descricao) => {
    criarNota(descricao);
  };

  //alerta de criação da atividade
  const showToasts = () => {
    Toast.success("Anotação criada");
  };
  //função de posta para criar a anotação
  const criarNota = async () => {
    try {
      const response = await axios.post(`http://192.168.6.20:3010/anotacoes`, {
        descricao: descricao,
        id_aluno: `${userInfo.user.id}`,
        array_tags: tags,
      });
      if (response.status === 201) {
        showToasts();
        setTimeout(() => {
          navigation.navigate("home");
        }, 3000);
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
      <ToastManager />
      <ScrollView>
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
            Criar anotação
          </Text>
        </View>

        <View style={{ paddingHorizontal: 25, paddingVertical: 10 }}>
          <TextInput
            multiline={true}
            style={styles.input}
            value={descricao}
            onChangeText={(text) => setDescricao(text)}
          />
          <View style={styles.textbox}>
            <Text
              style={{
                position: "absolute",
                fontFamily: "Medium",
                fontSize: 16,
                color: "#403B91",
                paddingTop: 1,
                paddingLeft: 5,
                marginBottom: 20,
              }}
            >
              Tags
            </Text>
            <Tags
              key={tags}
              initialTags={tags}
              style={{
                height: 100,
                marginTop: 20,
                paddingTop: 10,
                paddingLeft: 10,
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
              paddingHorizontal: 20,
              marginTop: 10,
            }}
          >
            <Text></Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                onSubmit(descricao);
              }}
            >
              <Text style={styles.text}>Salvar</Text>
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
    paddingHorizontal: 10,
    fontSize: 16,
    textAlignVertical: "top",
    height: 450,
    backgroundColor: "white",
    borderRadius: 10,
  },
  button: {
    marginHorizontal: 6,
    width: "45%",
    paddingVertical: 10,
    borderRadius: 28,
    elevation: 3,
    backgroundColor: "#364FC7",
  },
  text: {
    textAlign: "center",
    color: "white",
  },
  textbox: {
    paddingTop: 10,
  },
});
