import React, { useContext, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/Ionicons";
import Icon3 from "react-native-vector-icons/MaterialIcons";
import Icon4 from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { ScrollView } from "native-base";

const TabsFavoritos = ({
  setFavo,
  id_aula,
  favorite,
  name,
  idProfessor,
  id_bimestre,
  first_Favo,
  first_idAula
}) => {
  const navigation = useNavigation();
  const [fav, setFav] = useState();
  const { userInfo } = useContext(AuthContext);
  let id = userInfo.user.id;

  let [fontsLoaded] = useFonts({
    Medium: require("../../../assets/fonts/Poppins-Medium.ttf"),
  });

  //função de favoritar de desfavoritar video
  async function changeFavorito() {
    try {
      const response = await axios.post(
        `http://192.168.6.20:3510/favoritos/${id}`,
        {
          id_aula: id_aula != "" ? first_idAula : id_aula,
          id_bimestre:`${id_bimestre}`
        }
      );
      console.log(response.mensage);
      if (response.status === 201) {
        setFavo(true);
        setFav(true);
      }
      if (response.status === 204) {
        setFav(false);
        setFavo(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View
      style={{
        backgroundColor: "#fff",
        width: "100%",
        alignItems: "center",
        borderBottomRightRadius:12,
        borderBottomLeftRadius:12,
        justifyContent:'center',
        height:50,
        marginTop:5
      }}
    >
      <ScrollView 
      showsHorizontalScrollIndicator={false}
      horizontal>
      <View
      style={{
        padding: 10,
        flexDirection: "row",
        margin: 10,
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal:20,
        width:"100%",
        backgroundColor:'#fff'
      }}
    >
      {/* Ir para página de chat */}
      <TouchableOpacity
      style={{backgroundColor:"#EFF0F0", height:35, width:100, borderRadius:32, alignItems:'center', justifyContent:'center'}}
      // onPress={() => navigation.navigate("Chat", {idProfessor: `${idProfessor}`})}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 5,
            marginLeft: 3,
            marginRight: 5,
            alignItems:'center',
            justifyContent:'center',
          }}
        >
          <AntDesign
            name="bars"
            size={20}
            color="#343A40"
            style={{ alignItems: "center", marginRight: 3 }}
          />
          <Text style={{ color: "#343A40", fontWeight: "400", fontSize: 11, fontFamily: "Medium" }}>
          Dúvidas
          </Text>
        </View>
      </TouchableOpacity>

      {/* Ir para página de anotação da Aula */}
      <TouchableOpacity
      style={{backgroundColor:"#EFF0F0", height:35, width:120, borderRadius:32, alignItems:'center', justifyContent:'center'}}
        onPress={() =>
          navigation.navigate("AnotationAula", {
            id: `${id_aula}`,
            name: `${name}`,
          })
        }
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 5,
            marginRight: 5,
            alignItems:'center',
            justifyContent:'center',
          }}
        >
          <Icon2
            name="newspaper-outline"
            size={20}
            color="#343A40"
            style={{ alignItems: "center", marginRight: 3 }}
          />
          <Text style={{ color: "#343A40", fontWeight: "400", fontSize: 11, fontFamily: "Medium" }}>
            Anotações
          </Text>
        </View>
      </TouchableOpacity>


      {/* botão de favoritar vídeo*/}
      {favorite  == true || first_Favo == true ? (
        <TouchableOpacity 
        style={{backgroundColor:"#EFF0F0", height:35, width:110, borderRadius:32, alignItems:'center', justifyContent:'center'}}
        onPress={() => changeFavorito()}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 5,
              marginRight: 5,
              alignItems:'center',
              justifyContent:'center'
            }}
          >
            <Icon4
              name="star"
              size={20}
              color="#343A40"
              style={{ alignItems: "center", marginRight: 3 }}
            />

            <Text
              style={{ color: "#343A40", fontWeight: "400", fontSize: 11, fontFamily: "Medium" }}
            >
              Favoritos
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
        style={{backgroundColor:"#EFF0F0", height:35, width:110, borderRadius:32, alignItems:'center', justifyContent:'center'}}
         onPress={() => changeFavorito()}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 5,
              alignItems:'center',
              justifyContent:'center'
            }}
          >
            <Icon3
              name="star-outline"
              size={20}
              color="#343A40"
              style={{ alignItems: "center", marginRight: 3 }}
            />

            <Text
              style={{ color: "#343A40", fontWeight: "400", fontSize: 11, fontFamily: "Medium" }}
            >
              Favoritos
            </Text>
          </View>
        </TouchableOpacity>
      )}

    </View>
      </ScrollView>
    </View>
  );
};

export { TabsFavoritos };
