import React from "react";
import { View, Image, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";

export function MateriaItem({ id, name, bk_img}) {
  
  let [fontsLoaded] = useFonts({
    'Medium': require('../../../assets/fonts/Poppins-Medium.ttf')
  })


   const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <View style={styles.Image}>
          <TouchableOpacity onPress={() => navigation.navigate("Conteudos", {id: `${id}`})}>
            <Image 
            source={{uri: `${bk_img}?`}}
            style={{width:160, height: 90,}}
            />
          </TouchableOpacity>
          
         <View style={{backgroundColor: "#fff", marginBottom: 10}}>
          <Text style={styles.title}>
            {name}
          </Text>
         </View>
        </View>
      </View>

    );
  }

  export const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    Image: {
      width:160,
      marginLeft: 10,
      marginRight: 10
    },
    title:{
      lineHeight: 20,
      fontSize: 14,
      textAlign: 'center',
      color: '#403B91',
      fontWeight: "400",
      backgroundColor: 'whrite'
    }
  })