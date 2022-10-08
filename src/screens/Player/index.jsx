import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { AppHeader } from "../../components/AppHeader";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";
<<<<<<< HEAD
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import  Icon2  from 'react-native-vector-icons/Ionicons';
import  Icon3  from 'react-native-vector-icons/MaterialIcons';
=======
>>>>>>> 761afca11dd9561429928107262286623b647d2f


const Player = ({ route }) => {
  let id = route.params.id;
  const navigation = useNavigation();
  const v = React.useRef(null);
  const { userInfo } = useContext(AuthContext);
  const [ clicked, setClicked ] = useState(0);
  const [videos, setVideos] = useState([]);
  const [position, setPosition] = useState(0);
  const { width, height } = Dimensions.get("screen");
  const [ atv, setAtv ] = useState([]);

  const detailsTabs = [
    {id: 1, label: 'Aulas'},
    {id: 2, label: 'Atividades'},
    {id: 3, label: 'Material'},
  ]

  useEffect(() => {
    const getVideosContent = async () => {
      const response = await axios.get(
        `https://mais-educacao.herokuapp.com/conteudos/${id}/${userInfo.user.id}`
      );
      setVideos(response.data.conteudo.Aula);
      setAtv(response.data["conteudo"]["atividade"])
<<<<<<< HEAD
      console.log(response.data["conteudo"])
=======
      console.log(response.data["conteudo"]["atividade"])
>>>>>>> 761afca11dd9561429928107262286623b647d2f
    };
    getVideosContent();
  }, []);

  const handleClick = (id) => {
    setClicked(id)
  }
  const renderTabs = () => {
    return (
      <View style={{
        width: '100%',
        borderRadius: 8,
        flexDirection:'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: '#2F598431',
        marginTop:60
      }}>
        {
          detailsTabs.map((item, index) => {
            return (
              <TouchableOpacity 
              key={index}
              onPress={(item) => handleClick(index)}
              style={
                [ index === clicked ? styles.buttonTabsActive: styles.buttonTabs]          
              }
              >
                <Text>{item.label}</Text>
              </TouchableOpacity>
            );
          })
        }
      </View>
    );
  } 

  const renderListVideos = (videos) => {
    return (
      <>
        {videos.map((video, index) => {
        return (
          <View key={index} style={styles.infoDetailsVideo}>
            <TouchableOpacity onPress={() => setPosition(index)}>
              <View
                style={{
                  width: "100%",
                  margin: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Image
                  source={{ uri: `${video.thumb}` }}
                  resizeMode="contain"
                  style={{ width: 100, height: 60 }}
                />
                <View
                  style={{ width: "80%", paddingLeft: 5, paddingRight: 5 }}
                >
                  <Text style={styles.title}>{video.title}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      })
      }
      </>
    );
  }
  
  const renderListAtividades = () => {
    return (
      <View >
        {
          atv.map((atvs)=>(
            <View style={{flexDirection: "column", marginTop: 10}} key={atvs.id}>
            <TouchableOpacity
              onPress={
                () => navigation.navigate('AtividadeInicio', {id: `${atvs.id}`})
              }>
              <View style={{flexDirection: "row", width:"100%", padding:10, justifyContent:'space-evenly', alignItems:'center'}}>
              <Image
              style={{height: 40, width: 60}}
              resizeMode="contain" 
              source={require("../../../assets/atividade.png")} 
              />
              <Text style={{fontSize:14, color:'#868E96' }}>{atvs.title}</Text>
              </View>
            </TouchableOpacity>
            </View>
          ))
        }
      </View>
    );
  }
  
  const renderMaterialComplementar = () => {
    return (
      <View>
        <Text>
          Lista de Materiais Complementares
        </Text>
      </View>
    );
  }
  
  return (
    <View>
      <AppHeader />
      <View style={styles.PlayerView}>
        <View
          style={{
            height: height / 4,
            width: "100%",
            backgroundColor: "black",
          }}
        >
        {
          <View>
            <Video
            ref={v}
            source={{ uri: videos[position]?.file }}
            useNativeControls
            resizeMode="contain"
            style={styles.video}
          />

          </View>
        }
                  <View style={{backgroundColor:'#fff', width:'100%', alignItems:'center', height:'10%', marginBottom:10}}>
          <View style={{backgroundColor:'#fff', flexDirection:'row', width:"90%", borderRadius:30, margin:10, alignItems:'center', justifyContent:'space-between', height:40}}>
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginRight: 5, marginLeft:3}}>
            <Icon
                name='sticker-text-outline'
                size={25}
                color='#4263EB'
                style={{ alignItems: "center",marginRight:3}}
                />
            <Text style={{color:'#4263EB',fontWeight:'bold'}}>Tira-Dúvidas</Text>
          </View>

         <View style={{flexDirection:'row', alignItems:'center', marginRight:5}}>
         <Icon2
            name='newspaper-outline'
            size={25}
            color='#4263EB'
            style={{ alignItems: "center",marginRight:3}}
            />
          <Text style={{color:'#4263EB', fontWeight:'bold'}}>Anotações</Text>

         </View>

          <View style={{flexDirection:'row', alignItems:'center', marginRight:5}}>
          <Icon3
            name='star-outline'
            size={25}
            color='#4263EB'
            style={{ alignItems: "center",marginRight:3}}
            />
          
          <Text style={{color:'#4263EB', fontWeight:'bold'}}>Favoritos</Text>

          </View>
        
          </View>
        </View>
        </View>

        {
        renderTabs()
        }

        {
          clicked === 0 ?
          renderListVideos(videos) :
          clicked === 1 ? renderListAtividades() :
          clicked === 2 ? renderMaterialComplementar() : 
          '' 
        }       
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  PlayerView: {
    alignItems: "center",
  },
  buttonTabsActive: {
    flexDirection:'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#4162EB'
  }, 
  buttonTabs: {
    flexDirection:'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2F598431'
  },
  infoDetailsVideo: {
    marginLeft:20,
    marginRight:20,
    justifyContent: "flex-start",
    backgroundColor: "#e2e2e2",
    marginTop: 10,
    flexWrap: "wrap",
  },
  videoView: {
    width: "100%",
    backgroundColor: "gray",
  },
  postTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  title: {
    marginTop: 10,
    color: "#181818",
  },
  video: {
    width: "100%",
    height: "100%",
  },
});

export { Player };