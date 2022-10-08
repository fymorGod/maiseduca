import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity} from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";


export function FavItem({ id_favorito, title, thumb }) {
    const navigation = useNavigation();
    const limite = 42

    const [fontsLoaded] = useFonts({
      Medium: require('../../../assets/fonts/Poppins-Medium.ttf')
  })



  
    return (
      <View style={{flexDirection:'row', alignItems:'center'}}>
                <View style={styles.Image}>
                <TouchableOpacity 
                 onPress={() => navigation.navigate('Player', {id: `${id_favorito}`})}
                >
                  <Image 
                  source={{uri: `${thumb}`}}
                  style={{width:160, height: 90, borderRadius: 10}}
                  />
                  <Text
                  style={{fontFamily:"Medium", fontSize: 11, color: '#403B91'}}
                  >{title.length > limite ?
                  title.substring(0, limite) + '...' 
                  : ""}</Text>
                </TouchableOpacity>
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