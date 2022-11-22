import React, { useContext, useState } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button
} from "react-native";

import { AuthContext } from "../../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";


export const Login = ({}) => {
  
  const [mat, setMat] = useState(null);
  const [password, setPassword] = useState(null);
  const { isLoading, login } = useContext(AuthContext);

  //função de submissao da matricula e senha do aluno
  const onSubmit = (mat, password ) => {
    login(mat,password)
  };
  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      enabled
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={{ height: "100%", width: "100%", backgroundColor: "red" }}
      >
        <View style={styles.Container}>
            <Spinner visible={isLoading}/>
          <View style={styles.wrapper}>
            <Image
              resizeMode="contain"
              source={require("../../../assets/logo-educacao.png")}
              style={styles.image}
            />
            <TextInput
            style={styles.Input}
            value={mat}
            placeholder="Enter Matrícula"
            onChangeText={text => setMat(text)}
          />
  
          <TextInput
            style={styles.Input}
            value={password}
            placeholder="Enter password"
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
          </View>
          <TouchableOpacity
          style={styles.button}
          onPress={() => {
            onSubmit(mat, password);
          }}
        >
          <Text style={styles.text}>ENTRAR</Text>
        </TouchableOpacity>
          <View style={styles.footer}>
            <Text></Text>
            <TouchableOpacity>
              <Text style={styles.smallText}>Esqueci minha senha</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4263EB",
  },
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  Input: {
    width: "80%",
    height: 50,
    marginBottom: 12,
    borderRadius: 8,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  smallText: {
    color: "#fff",
    marginTop: 10,
    marginBottom: 30,
    fontSize: 14,
    fontWeight: "600",
  },
  image: {
    marginBottom: 20,
    marginTop: 20,
    width: 300,
  },
  button: {
    width: "80%",
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#364FC7",
  },
  footer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
});