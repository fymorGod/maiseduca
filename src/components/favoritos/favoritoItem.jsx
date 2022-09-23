import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { 
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic 
} from '@expo-google-fonts/poppins'
import { useFonts } from "expo-font";


export function FavItem({ id_favorito, title, thumb }) {
    const limite = 42


  let [fontesLoaded, error] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic 
  });




    return (
      <View>
        <View style={styles.Image}>
          <Image 
          source={{uri: `${thumb}`}}
          style={{width:160, height: 90, borderRadius: 10}}
          />
          
          <Text
          style={{fontFamily:"Poppins_500Medium", fontSize: 11, color: '#403B91'}}
          >{title.length > limite ?
           title.substring(0, limite) + '...' 
           : ""}</Text>
        </View>
      </View>
    );
  }

  export const styles = StyleSheet.create({
    Image: {
      marginLeft: 25,
      width:160,
      
    },
  })