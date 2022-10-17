import React, { useContext, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity
  } from "react-native";
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import  Icon2  from 'react-native-vector-icons/Ionicons';
import  Icon3  from 'react-native-vector-icons/MaterialIcons';
import  Icon4  from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const TabsFavoritos = ({position, setFavo, id_aula, favorite, name}) => {
    const navigation = useNavigation();
    const [fav, setFav] = useState()
    const { userInfo } = useContext(AuthContext);
    let id = userInfo.user.id
    console.log(fav)

    async function changeFavorito() {
        try {
            const response = await axios.post(`http://192.168.6.20:3010/favoritos/${id}`, {
            "id_aula": `${id_aula}`,
            "index": position
            });
            console.log(response.mensage)
            if(response.status === 201){
                setFavo(true);
                setFav(true);
            }
            if(response.status === 204){
                setFav(false)
                setFavo(false);
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <View style={{backgroundColor:'#333', width:'100%', alignItems:'center', height:'32%', marginBottom:10}}>
        <View style={{padding:10, backgroundColor:'#fff', flexDirection:'row', width:"95%", borderRadius:30, margin:10, alignItems:'center', justifyContent:'space-between', height:40}}>

        <TouchableOpacity>
            <View style={{flexDirection:'row', alignItems:'center',                 justifyContent:'center', marginRight: 5, marginLeft:3}}>
                <Icon
                name='sticker-text-outline'
                size={20}
                color='#4263EB'
                style={{ alignItems: "center",marginRight:3}}
                />
                <Text style={{color:'#4263EB',fontWeight:'400', fontSize:12}}>Tira-Dúvidas</Text>
            </View>
        </TouchableOpacity>

       <TouchableOpacity
       onPress={() => navigation.navigate("AnotationAula", {id: `${id_aula}`, name: `${name}`})}>
            <View style={{flexDirection:'row', alignItems:'center', marginRight:5}}>
            <Icon2
                name='newspaper-outline'
                size={20}
                color='#4263EB'
                style={{ alignItems: "center",marginRight:3}}
                />
                <Text style={{color:'#4263EB', fontWeight:'400', fontSize:12}}>Anotações</Text>
            </View>
       </TouchableOpacity>

       {
        favorite == true ? 
        <TouchableOpacity
        onPress={()=> changeFavorito()}>
        <View style={{flexDirection:'row', alignItems:'center', marginRight:5}}>
        <Icon4
        name='star'
        size={20}
        color='#4263EB'
        style={{ alignItems: "center",marginRight:3,}}
        />
        
        <Text style={{color:'#4263EB', fontWeight:'400', fontSize:12}}>Favoritos</Text>
        
        </View>
        </TouchableOpacity>
        :
        <TouchableOpacity 
        onPress={()=> changeFavorito()}>
            <View style={{flexDirection:'row', alignItems:'center', marginRight:5}}>
            <Icon3
            name='star-outline'
            size={20}
            color='#4263EB'
            style={{ alignItems: "center",marginRight:3,}}
            />
            
            <Text style={{color:'#4263EB', fontWeight:'400', fontSize:12}}>Favoritos</Text>
    
            </View>
        </TouchableOpacity>
    }
    
        </View>
      </View>
    )
}

export { TabsFavoritos }