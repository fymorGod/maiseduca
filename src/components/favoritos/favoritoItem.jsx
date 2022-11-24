import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import {Image} from 'react-native-expo-image-cache';

//compomente dos videos favoritados renderizados na pagina home 

export function FavItem({title, thumb }) {
  let [fontsLoaded] = useFonts({
    Medium: require("../../../assets/fonts/Poppins-Medium.ttf"),
  });

  const navigation = useNavigation();
  const limite = 42;

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Player", { id: `${conteudo}` })}
      >
        <View style={styles.Image}>
          <Image
            uri={`${thumb}`}
            style={{ width: 160, height: 90, borderRadius: 10 }}
          />
          <Text
            style={{ fontFamily: "Medium", fontSize: 11, color: "#403B91" }}
          >
            {title.length > limite ? title.substring(0, limite) + "..." : ""}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export const styles = StyleSheet.create({
  Image: {
    marginLeft: 25,
    width: 160,
  },
});
