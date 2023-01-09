import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { ImageSlider } from "react-native-image-slider-banner";

export const AtividadeInicio = ({ route }) => {
  //id da ativiade
  let id = route.params.id;
  //titulo da atividade
  let title = route.params.title;
  const navigation = useNavigation();

  //carregando fonte de texto
  let [fontsLoaded] = useFonts({
    Bold: require("../../../assets/fonts/Poppins-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  

  return (
    <View style={styles.Container}>
      <ImageBackground source={require("../../../assets/BG.png")} resizeMode="cover" style={{flex:1, justifyContent:'center'}}>
      <View
        style={{ flexDirection: "column", alignItems: "center", marginTop: 50 }}
      >
        <Text
          style={{
            color: "#EEBC4E",
            fontFamily: "Bold",
            fontSize: 28,
            textAlign: "center",
            paddingHorizontal: 15,
          }}
        >
          {title}
        </Text>
      </View>

      {/* Instruções sobre a atividade */}
      <View style={{ height: "60%" }}>
        <ImageSlider
          data={[
            { img: require("../../../assets/intro.png") },
            { img: require("../../../assets/introo.png") },
            { img: require("../../../assets/introoo.png") },
            { img: require("../../../assets/introooo.png") },
          ]}
          localImg
          caroselImageStyle={{
            resizeMode: "contain",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 5,
          }}
          autoPlay={true}
          timer={2500}
          preview={false}
          showIndicator={false}
        />
      </View>

      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingHorizontal: 20,
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          style={{
            marginTop: 20,
            marginBottom: 20,
            width: "100%",
            backgroundColor: "#fff",
            padding: 15,
            borderRadius: 50,
            shadowColor: "#fff",
            shadowOffset: {
              height: 3,
            },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 2,
            backfaceVisibility: "hidden",
          }}
          onPress={() => navigation.navigate("Atividade", { id: `${id}` })}
        >
          <Text
            style={{
              color: "#403B91",
              fontWeight: "600",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Iniciar Quiz
          </Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    </View>
  );
};

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
