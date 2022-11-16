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
      <ScrollView
        scrollEnabled
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
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
            Editar anotação
          </Text>
        </View>

        <View style={{ paddingHorizontal: 25, paddingVertical: 10 }}>
          <TextInput
            multiline={true}
            style={styles.input}
            value={title}
            placeholder="Title"
            onChangeText={(text) => handleOnChangeText(text, "title")}
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
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            marginBottom: 10,
          }}
        >
          <Text></Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log(title);
              onSubmit(title);
            }}
          >
            <Text style={styles.text}>Salvar</Text>
          </TouchableOpacity>
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
