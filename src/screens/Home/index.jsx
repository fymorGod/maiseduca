import React, {useEffect, useContext, useState} from "react";
import axios from 'axios';
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { AppHeader } from "../../components/AppHeader";
import { AuthContext } from "../../context/AuthContext";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";




export const Home = () => {
    const { userInfo } = useContext(AuthContext);
    const [fav, setFav] = useState([]);
    const navigation = useNavigation();
    const limite = 42

    const [fontsLoaded] = useFonts({
        Medium: require('../../../assets/fonts/Poppins-Medium.ttf')
    })

    const getFav = async() => {
        try {
            const res = await axios.get(`https://mais-edu.herokuapp.com/favoritos/${userInfo.user.id}`)
            setFav(res.data['favoritos']);
            console.log(res.data['favoritos'])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFav();
        
      }, [])
    

    return (
        <View style={styles.Container}>
            <AppHeader/>
            <ScrollView>
            <View style={styles.bannerBox}>                
                <Image
                style={styles.bannerAula}
                 resizeMode="contain" 
                 source={require("../../../assets/banner.png")} 
                 />
                <Image 
                style={styles.banner2} 
                resizeMode="contain" 
                source={require("../../../assets/banner2.png")} 
                />
            </View>
            <View style={styles.aulasVideos}>
                <Text style={{fontFamily:"Medium", fontSize: 16, color: '#403B91'}}> Favoritos</Text>
            </View>
           
           <View style={{}}>
           <FlatList
           showsHorizontalScrollIndicator={false}
           horizontal={true}
                data={fav}
                keyExtractor={(x, i) => i}
                renderItem={({item})=> 
                <View style={styles.Image}>
                    <TouchableOpacity 
                    onPress={() => navigation.navigate('Player', {id: `${item.conteudo}`})}
                    >
                        <Image 
                        source={{uri: `${item.thumb}`}}
                        style={{width:160, height: 90, borderRadius: 10}}
                        />
                        <Text
                        style={{fontFamily:"Medium", fontSize: 11, color: '#403B91'}}
                        >{item.title.length > limite ?
                        item.title.substring(0, limite) + '...' 
                        : ""}</Text>
                    </TouchableOpacity>
                </View>
                }
            />
           </View>

           <View style={styles.aulasVideos}>
                <Text style={{fontFamily:"Medium", fontSize: 16, color: '#403B91'}}> Últimas aulas</Text>
            </View>
           
           <View style={{marginBottom:20}}>
           <FlatList
           showsHorizontalScrollIndicator={false}
           horizontal={true}
                data={fav}
                keyExtractor={(x, i) => i}
                renderItem={({item})=> 
                <View style={styles.Image}>
                    <TouchableOpacity 
                    onPress={() => navigation.navigate('Player', {id: `${item.conteudo}`})}
                    >
                        <Image 
                        source={{uri: `${item.thumb}`}}
                        style={{width:160, height: 90, borderRadius: 10}}
                        />
                        <Text
                        style={{fontFamily:"Medium", fontSize: 11, color: '#403B91'}}
                        >{item.title.length > limite ?
                        item.title.substring(0, limite) + '...' 
                        : ""}</Text>
                    </TouchableOpacity>
                </View>
                }
            />

           </View>

            </ScrollView>
        </View>
    )
}





export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#EDF2FF'
    },
    text: {
        color: "#403B91",
        fontSize: 18,
        fontWeight: "500"

    },
    bannerAula: {
        height: 200,
    },

    bannerBox: {
        paddingHorizontal: 12,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: "#4263EB",
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
    },
    banner2:{
        height: 130,
        
    },
    aulasVideos:{
        padding: 10,
    },
    Image: {
        flexDirection:'row',
        marginLeft: 25,
        width:160,
      },
})