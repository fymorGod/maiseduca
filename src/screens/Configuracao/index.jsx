import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { useFonts } from "expo-font";
import { AppHeader2 } from "../../components/AppHeader2";

//carregaqndo fonte
export const Configuracao = () => {
  let [fontsLoaded] = useFonts({
    Medium: require("../../../assets/fonts/Poppins-Medium.ttf"),
  });

  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const [notificacao, setNotificacao] = useState(false);
  const toggleSwitch1 = () => setNotificacao((previousState) => !previousState);

  const [mute, setMute] = useState(false);
  const toggleSwitch2 = () => setMute((previousState) => !previousState);

  const [vibracao, setVibracao] = useState(false);
  const toggleSwitch3 = () => setVibracao((previousState) => !previousState);

  return (
    <View style={styles.Container}>
      <AppHeader2 />
      {Platform.OS === "ios" ? (
        <ScrollView>
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
              Configurações
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "20%",
              marginTop: 20,
            }}
          >
            <Image
              style={{ width: 100, height: 100 }}
              resizeMode="contain"
              source={require("../../../assets/avatarConfig.png")}
            />
            <Text
              style={{
                fontFamily: "Medium",
                fontSize: 14,
                marginBottom: 10,
                color: "#4264EB",
                marginTop: 10,
              }}
            >
              Mudar Avatar
            </Text>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontFamily: "Medium",
                fontSize: 16,
                color: "#4264EB",
                paddingLeft: 20,
              }}
            >
              Senha
            </Text>
            <View>
              <TouchableOpacity
                style={{
                  marginHorizontal: 6,
                  marginTop: 10,
                  marginHorizontal: 20,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 12,
                  elevation: 0,
                  backgroundColor: "#fff",
                }}
                onPress={() => navigation.navigate("TrocarSenha")}
              >
                <Text style={{ color: "#343A40", fontFamily:"Medium" }}>**************</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  marginHorizontal: 6,
                  marginTop: 10,
                  marginHorizontal: 20,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 12,
                  elevation: 0,
                  backgroundColor: "#EBC942",
                }}
                onPress={() => {
                  logout();
                }}
              >
                <Text style={{ color: "#343A40", fontFamily:"Medium" }}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text
            style={{
              fontFamily: "Medium",
              fontSize: 16,
              color: "#403B91",
              paddingLeft: 20,
            }}
          >
            Geral
          </Text>
          <View>
            <TouchableOpacity
              style={{
                alignItems: "center",
                marginTop: 20,
                marginHorizontal: 20,
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 12,
                elevation: 0,
                backgroundColor: "#00B7B7",
              }}
              onPress={() => {}}
            >
              <Text style={{ color: "#343A40", fontFamily:"Medium" }}>Idioma</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={{
                marginTop: 5,
                marginHorizontal: 20,
                paddingHorizontal: 20,
                borderRadius: 10,
                elevation: 0,
                backgroundColor: "#00B7B7",
              }}
              onPress={() => {}}
            >
              <View
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "100%",
                  padding: 5,
                }}
              >
              <View> 
              <Text style={{ color: "#343A40", fontFamily:"Medium" }}>Notificações</Text>
              </View>
                <Switch
                  style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                  trackColor={{ false: "#58E09A", true: "#004444" }}
                  thumbColor={notificacao ? "#ACE8E8" : "#005858"}
                  onValueChange={toggleSwitch1}
                  value={notificacao}
                  ios_backgroundColor="#ACE8E8"
                />
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={{
                marginTop: 5,
                marginHorizontal: 20,
                paddingHorizontal: 20,
                borderRadius: 10,
                elevation: 0,
                backgroundColor: "#00B7B7",
              }}
              onPress={() => {}}
            >
              <View
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "100%",
                  padding: 5,
                }}
              >
              <View> 
              <Text style={{ color: "#343A40", fontFamily:"Medium" }}>Efeitos sonoros</Text>
              </View>
                <Switch
                  style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                  trackColor={{ false: "#58E09A", true: "#004444" }}
                  thumbColor={notificacao ? "#ACE8E8" : "#005858"}
                  onValueChange={toggleSwitch1}
                  value={notificacao}
                  ios_backgroundColor="#ACE8E8"
                />
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={{
                marginTop: 5,
                marginHorizontal: 20,
                paddingHorizontal: 20,
                borderRadius: 12,
                elevation: 0,
                backgroundColor: "#00B7B7",
              }}
              onPress={() => {}}
            >
              <View
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "100%",
                  padding: 5,
                }}
              >
              <View> 
              <Text style={{ color: "#343A40", fontFamily:"Medium" }}>Vibração</Text>
              </View>
                <Switch
                  style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                  trackColor={{ false: "#58E09A", true: "#004444" }}
                  thumbColor={vibracao ? "#ACE8E8" : "#005858"}
                  ios_backgroundColor="#ACE8E8"
                  onValueChange={toggleSwitch3}
                  value={vibracao}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ marginBottom: 30, marginTop: 20 }}>
            <Text
              style={{
                fontFamily: "Medium",
                fontSize: 16,
                color: "#4264EB",
                paddingLeft: 20,
              }}
            >
              Privacidade
            </Text>
            <View>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  marginTop: 5,
                  marginHorizontal: 20,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 12,
                  elevation: 0,
                  backgroundColor: "#00B7B7",
                }}
                onPress={() => {}}
              >
                <Text style={{ color: "#343A40", fontFamily:"Medium" }}>Termos de compromisso</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  marginTop: 10,
                  marginHorizontal: 20,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 12,
                  elevation: 0,
                  backgroundColor: "#00B7B7",
                }}
                onPress={() => {}}
              >
                <Text style={{ color: "#343A40", fontFamily:"Medium" }}>
                  Política de Privacidade
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ) : (
        <ScrollView>
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
              Configurações
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "20%",
              marginTop: 20,
            }}
          >
            <Image
              style={{ width: 100, height: 100 }}
              resizeMode="contain"
              source={require("../../../assets/avatarConfig.png")}
            />
            <Text
              style={{
                fontFamily: "Medium",
                fontSize: 14,
                marginBottom: 10,
                color: "#4264EB",
                marginTop: 10,
              }}
            >
              Mudar Avatar
            </Text>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontFamily: "Medium",
                fontSize: 16,
                color: "#4264EB",
                paddingLeft: 20,
              }}
            >
              Senha
            </Text>
            <View>
              <TouchableOpacity
                style={{
                  marginHorizontal: 6,
                  marginTop: 10,
                  marginHorizontal: 20,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 12,
                  elevation: 0,
                  backgroundColor: "#fff",
                }}
                onPress={() => navigation.navigate("TrocarSenha")}
              >
                <Text style={{ color: "#343A40", fontFamily:"Medium" }}>**************</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  marginTop: 5,
                  marginHorizontal: 20,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 12,
                  elevation: 0,
                  backgroundColor: "#EBC942",
                }}
                onPress={() => {
                  logout();
                }}
              >
                <Text style={{ color: "#343A40", fontFamily:"Medium" }}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{marginLeft:20}}>
          <Text
          style={{
            fontFamily: "Medium",
            fontSize: 16,
            color: "#4264EB",
          }}
        >
          Geral
        </Text>
          </View>
          <View>
            <TouchableOpacity
              style={{
                alignItems: "center",
                marginTop: 10,
                marginHorizontal: 20,
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 12,
                elevation: 0,
                backgroundColor: "#00B7B7",
              }}
              onPress={() => {}}
            >
              <Text style={{ color: "#343A40", fontFamily:"Medium" }}>Idioma</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={{
                marginTop: 2,
                marginTop:5,
                marginHorizontal: 20,
                paddingHorizontal: 10,
                borderRadius: 12,
                elevation: 0,
                backgroundColor: "#00B7B7",
              }}
              onPress={() => {}}
            >
              <View
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <View style={{marginLeft:10}}>
                <Text style={{ color: "#343A40", fontFamily:"Medium" }}>Notificações</Text>
                </View>
                <Switch
                  trackColor={{ false: "#005858", true: "#ACE8E8" }}
                  thumbColor={notificacao ? "#005858" : "#ACE8E8"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch1}
                  value={notificacao}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={{
                marginTop: 2,
                marginTop:5,
                marginHorizontal: 20,
                paddingHorizontal: 10,
                borderRadius: 12,
                elevation: 0,
                backgroundColor: "#00B7B7",
              }}
              onPress={() => {}}
            >
              <View
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <View style={{marginLeft:10}}>
                <Text style={{ color: "#343A40", fontFamily:"Medium" }}>Efeitos Sonoros</Text>
                </View>
                <Switch
                  trackColor={{ false: "#005858", true: "#ACE8E8" }}
                  thumbColor={mute ? "#005858" : "#ACE8E8"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch2}
                  value={mute}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={{
                marginTop: 5,
                marginHorizontal: 20,
                paddingHorizontal: 10,
                borderRadius: 12,
                elevation: 0,
                backgroundColor: "#00B7B7",
              }}
              onPress={() => {}}
            >
              <View
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <View style={{marginLeft:10}}>
                <Text style={{ color: "#343A40", fontFamily:"Medium" }}>Vibração</Text>
                </View>
                <Switch
                  style={{}}
                  trackColor={{ false: "#005858", true: "#ACE8E8" }}
                  thumbColor={vibracao ? "#005858" : "#ACE8E8"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch3}
                  value={vibracao}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 30, marginTop: 20 }}>
            <Text
              style={{
                fontFamily: "Medium",
                fontSize: 16,
                color: "#4264EB",
                paddingLeft: 20,
              }}
            >
              Privacidade
            </Text>
            <View>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  marginTop: 5,
                  marginHorizontal: 20,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 12,
                  backgroundColor: "#00B7B7",
                }}
                onPress={() => {}}
              >
                <Text style={{ color: "#343A40", fontFamily:"Medium" }}>Termos de Uso</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  marginHorizontal: 6,
                  marginTop: 5,
                  marginHorizontal: 20,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 12,
                  elevation: 0,
                  backgroundColor: "#00B7B7",
                }}
                onPress={() => {}}
              >
                <Text style={{ color: "#343A40", fontFamily:"Medium" }}>
                  Política de Privacidade
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#EDF2FF",
  },
});
