import React, {useEffect, useContext, useState} from "react";
import axios from 'axios';
import { Text, View, StyleSheet, Image, ScrollView, Animated } from 'react-native';
import { AppHeader } from "../../components/AppHeader";
import { AuthContext } from "../../context/AuthContext";
import { useFonts } from "expo-font";





export const Conquistas = () => {

    let [fontsLoaded] = useFonts({
        'Medium': require('../../../assets/fonts/Poppins-Medium.ttf')
    })

    const [progress, setProgress] = useState(new Animated.Value(100));
    const progressAnim = progress.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%','100%']
    })
   
    return (
        <View style={styles.Container}>
            <AppHeader/>
            <View style={{marginBottom:10}}>
            <Text  style={{
                fontFamily: "Medium",
                fontSize: 18,
                color: "#403B91",
                paddingTop: 20,
                paddingLeft: 20,
              }}>
                Conquistas
            </Text>
            </View>

              <ScrollView>
              <View style={{justifyContent:'center', alignItems: 'center',}}>
              <View style={styles.card}>
              <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around', marginTop:10}}>
                  <Image 
                  style={{height:100, width:90}} 
                  resizeMode="contain" 
                  source={require("../../../assets/sabe-tudo.png")} 
                  />
                  <View style={{flexDirection: 'column', justifyContent:'space-around'}}>
                      <View>
                      <Text style={{fontSize:20, fontWeight:'bold', color:'orange'}}>Iniciante</Text>
                      </View>
                      <View>
                          <Text style={{color:'gray', fontSize:14, marginTop:10}}>
                              Faça sua primeira atividade
                          </Text>
                      </View>
                      <View style={{width: '100%',
                      height: 20,
                      borderRadius: 20, marginTop:20}}>
                      <Animated.View style={[{
                          height: 20,
                          borderRadius: 20,
                          backgroundColor:'orange', alignItems:'center'
                          },{
                              width: progressAnim
                          }]}>
                          <Text style={{color:"#fff"}}>100%</Text>
                      </Animated.View>
                      </View>
              </View>
              </View>
              </View>
  
              <View style={styles.card}>
              <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around', marginTop:10}}>
                  <Image 
                  style={{height:100, width:90}} 
                  resizeMode="contain" 
                  source={require("../../../assets/mestre-geografia.png")} 
                  />
                  <View style={{flexDirection: 'column', justifyContent:'space-around'}}>
                      <View>
                      <Text style={{fontSize:20, fontWeight:'bold', color:'#30ba35'}}>Mestre em Geografia</Text>
                      </View>
                      <View>
                          <Text style={{color:'gray', fontSize:14, marginTop:10}}>
                          Veja as aulas de geografia
                          </Text>
                      </View>
                      <View style={{width: '100%',
                      height: 20,
                      borderRadius: 20, marginTop:20}}>
                      <Animated.View style={[{
                          height: 20,
                          borderRadius: 20,
                          backgroundColor:'#30ba35', alignItems:'center'
                          },{
                              width: progressAnim
                          }]}>
                          <Text style={{color:"#fff"}}>100%</Text>
                      </Animated.View>
                      </View>
              </View>
              </View>
              </View>
  
  
              <View style={styles.card}>
              <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around', marginTop:10, }}>
                  <Image 
                  style={{height:100, width:90}} 
                  resizeMode="contain" 
                  source={require("../../../assets/filosofo.png")} 
                  />
                  <View style={{flexDirection: 'column', justifyContent:'space-around'}}>
                      <View>
                      <Text style={{fontSize:20, fontWeight:'bold', color:'#0e88c9'}}>Filósofo</Text>
                      </View>
                      <View>
                          <Text style={{color:'gray', fontSize:14, marginTop:10}}>
                            Faça 10 atividades de Filosofia
                          </Text>
                      </View>
                      <View style={{width: '100%',
                      height: 20,
                      borderRadius: 20, marginTop:20}}>
                      <Animated.View style={[{
                          height: 20,
                          borderRadius: 20,
                          backgroundColor:'#0e88c9', alignItems:'center'
                          },{
                              width: progressAnim
                          }]}>
                          <Text style={{color:"#fff"}}>100%</Text>
                      </Animated.View>
                      </View>
              </View>
              </View>
              </View>
  
  
              <View style={styles.card}>
              <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around', marginTop:10}}>
                  <Image 
                  style={{height:100, width:90}} 
                  resizeMode="contain" 
                  source={require("../../../assets/rubi.png")} 
                  />
                  <View style={{flexDirection: 'column', justifyContent:'space-around', width:'60%'}}>
                      <View>
                      <Text style={{fontSize:20, fontWeight:'bold', color:'#c90e0e'}}>Rubi</Text>
                      </View>
                      <View>
                          <Text style={{color:'gray', fontSize:14, marginTop:10}}>
                          Alcance a divisão Rubi
                          </Text>
                      </View>
                      <View style={{width: '100%',
                      height: 20,
                      borderRadius: 20, marginTop:20}}>
                      <Animated.View style={[{
                          height: 20,
                          borderRadius: 20,
                          backgroundColor:'#c90e0e', alignItems:'center'
                          },{
                              width: progressAnim
                          }]}>
                          <Text style={{color:"#fff"}}>100%</Text>
                      </Animated.View>
                      </View>
              </View>
              </View>
              </View>
  
                
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
    card: {
        flexWrap:'wrap',
        width:"90%",
        paddingHorizontal: 10,
        height: 130,
        backgroundColor: "white",
        marginBottom: 15,
        borderRadius: 10,
        elevation:5
      },
      text: {
        margin: 10,
        fontSize: 15,
      },
})