import React, { useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Surface } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import Icon3 from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

export const AppHeader2 = () => {
  const navigation = useNavigation();

  return (
    <Surface style={styles.header}>
      <View style={{}}>
        <Icon3
          name="arrowleft"
          size={25}
          color="#fff"
          style={{ alignItems: "center" }}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.boxLogo}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require("../../../assets/logo.png")}
        />
      </View>
      <View style={styles.icon}>
        <View style={{ width: 50 }}>
          <Icon2
            name="notifications-none"
            size={25}
            color="#fff"
            style={{ alignItems: "center", marginRight: 25 }}
          />
        </View>
        <Icon2
          name="person"
          size={25}
          color="#fff"
          onPress={() => navigation.navigate("Perfil")}
        />
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 35,
    height: 90,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#4263EB",
  },
  view: {
    flex: 1,
  },
  logo: {
    width: 120,
  },
  boxLogo: {
    marginLeft: 20,
  },
  icon: {
    marginRight: 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
