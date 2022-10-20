import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity,  Dimensions, RefreshControl } from 'react-native';
import { AppHeader } from "../../components/AppHeader";
import { FAB } from 'react-native-paper';
import {Agenda} from "../../components/Agenda";
import RBSheet from "react-native-raw-bottom-sheet";
import MaskInput from 'react-native-mask-input';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import  Icon2  from 'react-native-vector-icons/Octicons';
import { ScrollView } from "native-base";
import ToastManager, { Toast } from 'toastify-react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height; 

export const Calendario = () => {
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [date, setDate] = useState('')
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');
  const [lembretes, setLembretes] = useState([]);
  const { userInfo } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false)
  const horaMask = [/\d/, /\d/, ':', /\d/, /\d/];

  useEffect(() => {
    getLembrete();
}, []);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = useCallback(()=>{
    setRefreshing(true);
    wait(2000).then(()=>
    getLembrete(),
    setRefreshing(false)
    )
  }, []);

  const postLembrete = async() =>{
    try {
      const res = await axios.post(`http://192.168.6.20:3010/lembretes`, {
        "title": titulo,
        "description": descricao,
        "data": date,
        "start": `${date} ${inicio}`,
        "end": `${date} ${fim}`,
        "id_aluno": `${userInfo.user.id}`
      })
      if(res.status === 201){
        showToasts()
        setTimeout(() => {
          refRBSheet.current.close()
          onRefresh()
        }, 1000);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getLembrete = async() =>{
    try {
      const res = await axios.get(`http://192.168.6.20:3010/lembretesByAluno/${userInfo.user.id}`)
      setLembretes(res.data["lembretes"]);
    } catch (error) {
      console.log(error)
    }
  }
  
  const delLembretes = async(id) =>{
    try {
      const res = await axios.delete(`http://192.168.6.20:3010/lembretes/${id}`)
      if(res.status === 204){
        showToastDel()
        setTimeout(() => {
          onRefresh()
        }, 3000);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const showToasts = () => {
    Toast.success("Lembrete criado  ")
  }

  const showToastDel = () => {
    Toast.success("Lembrete deletado ")
  }

    return (
      <View style={styles.Container}>
        <AppHeader/>
        <ToastManager />
        <View style={[styles.shadowProp, styles.calendar]}>
        <Agenda setDate={setDate}/>
        </View>
       
        
        {/* Cards Lembretes */}
        <ScrollView
        refreshControl={<RefreshControl
          refreshing={refreshing}
          onRefresh={getLembrete}
          />}
        >
        <View style={styles.cards}>
          {lembretes.map((avisos)=>(
            <View style={styles.card} key={avisos.id}>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
            <Text style={styles.text}>{avisos.title}</Text>
            <TouchableOpacity
            onPress={() => delLembretes(avisos.id)}
            >
              <Icon2
              name='trash'
              size={25}
              color='red'
              />
            </TouchableOpacity>
            </View>
            <View style={{flexDirection:'column'}}>
              <Text style={{color:'#495057', marginLeft:10}}>{avisos.description}</Text>
              <Text style={{color:'#3B5BDB', marginLeft:10, marginTop:20}}>{avisos.start + ' - ' + avisos.end}</Text>
            </View>
          </View> 
          ))}
        </View>
        </ScrollView>
        <View>

        {/* BottomSheet */}
        <RBSheet
          ref={refRBSheet}
          height={600}
          openDuration={250}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            container:{backgroundColor:'#F1F3F5', borderTopLeftRadius:28, borderTopRightRadius:28, elevation:30},
            wrapper: {
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: "#000"
            }
          }}>
            <ScrollView>
              <View style={{paddingHorizontal:20, paddingVertical:30}}>
              {/* Titulo */}
              <Text style={{color:'#403B91', fontSize:18}}>Título</Text>
              <View style={{marginTop:10, marginBottom:10}}>
                <TextInput
                style={styles.Input}
                value={titulo}
                placeholder="Digite um título"
                onChangeText={text => setTitulo(text)}
                />
              </View>
              {/* Descrcao */}
              <Text style={{color:'#403B91', fontSize:18}}>Descrição</Text>
              <View style={{marginTop:10, marginBottom:10}}>
                <TextInput
                maxLength={30}
                style={styles.Input}
                value={descricao}
                placeholder="Digite uma descrição"
                onChangeText={text => setDescricao(text)}
                />
              </View>
              {/* data */}
              <Text style={{color:'#403B91', fontSize:18}}>Data</Text>
              <View style={{marginTop:10}}>
                <TextInput
                maxLength={10}
                keyboardType="number-pad"
                style={styles.Input}
                value={date}
                onChangeText={text => setDate(text)}
                />
              </View>

              {/* Inicio e fim */}
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{color:'#403B91', fontSize:18}}>Início</Text>
                <View style={{marginRight:153}}>
                <Text style={{color:'#403B91', fontSize:18}}>Fim</Text>
                </View>
              </View>
              <View style={{marginTop:10, flexDirection:'row', justifyContent:'flex-start', marginRight:20}}>
              <MaskInput
                style={styles.Input2}
                value={inicio}
                mask={horaMask}
                onChangeText={(masked, unmasked, obfuscated) => {
                  setInicio(masked);}}
              />
              <MaskInput
                style={styles.Input3}
                value={fim}
                mask={horaMask}
                onChangeText={(masked, unmasked, obfuscated) => {
                  setFim(masked);}}
              />
              </View>

            {/* Buttons */}
            <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems:'flex-start' }}>
                <TouchableOpacity
                  style={{
                    width: "47%",
                    alignItems: "center",
                    marginRight:5,
                    marginTop: 20,
                    paddingVertical: 10,
                    borderRadius: 28,
                    elevation: 0,
                    backgroundColor: "#BAC8FF",
                  }}
                  onPress={()=>refRBSheet.current.close()}
                >
                  <Text style={{ color: "#4263EB" }}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=>postLembrete()}
                  style={{
                    width: "47%",
                    alignItems: "center",
                    marginTop: 20,
                    paddingVertical: 10,
                    borderRadius: 28,
                    elevation: 0,
                    backgroundColor: "#4263EB",
                  }}
                >
                  <Text style={{ color: "#fff" }}>Confirmar</Text>
                </TouchableOpacity>
            </View>
              </View>
            </ScrollView>
        </RBSheet>
        </View>

        <FAB
        icon="plus"
        color="white"
        style={styles.fab}
        onPress={()=>refRBSheet.current.open()}
        />
      </View>
    )
}

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#EDF2FF'
    },
    fab: {
        backgroundColor: "#4263EB",
        borderRadius: 50,
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
    Input: {
      width: "95%",
      height: 50,
      marginBottom: 12,
      borderRadius: 8,
      paddingHorizontal: 14,
      backgroundColor: "#fff",
    },
    Input2: {
      width: "46%",
      height: 50,
      marginBottom: 12,
      borderRadius: 8,
      backgroundColor: "#fff",
      marginRight:20
    },
    Input3: {
      width: "46%",
      height: 50,
      marginBottom: 12,
      borderRadius: 8,
      backgroundColor: "#fff",
    },
    card: {
      width:'90%',
      marginTop:20,
      marginBottom:20,
      paddingHorizontal: 10,
      height: 120,
      backgroundColor: "white",
      marginBottom: 15,
      borderRadius: 10,
      elevation:2
    },
    text: {
      color:'#748FFC',
      margin: 10,
      fontSize: 16,
      fontWeight:'bold'
    },
    calendar:{
      height: 380, 
      backgroundColor:"#4263EB", 
      borderBottomLeftRadius:28, 
      borderBottomRightRadius:28, 
      shadowColor: "#000",
      elevation:2
    },
    shadowProp: {
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    cards:{
      alignItems:'center',
       height: windowHeight 
    }

})