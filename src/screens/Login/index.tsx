import React, { useEffect } from "react";
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
} from "react-native";
import { useForm, Controller } from "react-hook-form";

import { useNavigation } from "@react-navigation/native";

type FormData = {
  matricula: string;
  password: string;
};

export const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigation = useNavigation();

  useEffect(() => {
    console.log("Email errors: ", errors?.matricula);
  }, [errors?.matricula]);

  const onSubmit = (data: FormData) => {
    navigation.navigate("home");
    console.log(data);
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
          <View style={styles.wrapper}>
            <Image
              resizeMode="contain"
              source={require("../../../assets/logo-educacao.png")}
              style={styles.image}
            />
            <Controller
              control={control}
              name="matricula"
              rules={{
                required: "Email obrigatório",
              }}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  value={value}
                  style={styles.Input}
                  placeholder="Matrícula"
                  onChangeText={onChange}
                  autoCapitalize="none"
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Senha obrigatória",
              }}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  value={value}
                  style={styles.Input}
                  placeholder="Senha"
                  secureTextEntry
                  onChangeText={onChange}
                />
              )}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
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
