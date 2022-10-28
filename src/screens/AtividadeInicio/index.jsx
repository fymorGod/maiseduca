import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { ImageSlider } from "react-native-image-slider-banner";

export const AtividadeInicio = ({ route }) => {
  let id = route.params.id;
  let title = route.params.title;
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    Medium: require("../../../assets/fonts/Poppins-Medium.ttf"),
    Bold: require("../../../assets/fonts/Poppins-Bold.ttf"),
  });

  return (
    <View style={styles.Container}>
      <View
        style={{ flexDirection: "column", alignItems: "center", marginTop: 50 }}
      >
        <Text
          style={{
            color: "#EEBC4E",
            textShadowOffset: { height: 1, width: 1 },
            textShadowColor: "#EEBC4E",
            textShadowRadius: 3,
            shadowOpacity: 0.3,
            fontFamily: "Bold",
            fontSize: 28,
            textAlign: "center",
            paddingHorizontal: 15,
          }}
        >
          {title}
        </Text>
      </View>

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
            width: "100%",
            backgroundColor: "#fff",
            padding: 15,
            borderRadius: 50,
            shadowColor: "#fff",
            shadowOffset: {
              width: -40,
              height: 50,
            },
            shadowOpacity: 0.2,
            shadowRadius: 7,
            elevation: 4,
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
    </View>
  );
};

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#4263EB",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
