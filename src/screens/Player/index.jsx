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
import { TabsFavoritos } from "../../components/tabsFavoritos/tabsFavoritos";
import { RenderListVideos } from "../../components/RenderListVideos";
import { RenderTabs } from "../../components/RenderTabs";


export const Player = ({ route }) => {
  let id = route.params.id;
  const navigation = useNavigation();
  const v = React.useRef(null);
  const { userInfo } = useContext(AuthContext);
  const [ clicked, setClicked ] = useState(0);
  const [videos, setVideos] = useState([]);
  const [position, setPosition] = useState(0);
  const { width, height } = Dimensions.get("screen");
  const [ atv, setAtv ] = useState([]);
  const [ favo, setFavo ] = useState(false);

  const [name,setName] = useState()

  useEffect(() => {
    const getVideosContent = async () => {
      const response = await axios.get(
        `http://192.168.6.20:3010/conteudos/${id}/${userInfo.user.id}`
      );
      console.log(response.data)
      setVideos(response.data.conteudo.Aula);
      setAtv(response.data["conteudo"]["atividade"])
      setName(response.data["conteudo"]["disciplina"].name)
    };
    getVideosContent();
  }, [favo]);
  
  // console.log(videos[position]?.favorite)
  const handleClick = (id) => {
    setClicked(id)
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
              <View style={{flexDirection: "row", width:"100%",  justifyContent:'space-evenly', alignItems:'center'}}>
              <Image
              style={{height: 50, width: 80,}}
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
            <Video
            style={styles.video} 
            ref={v}
            source={{ uri: videos[position]?.file }}
            useNativeControls
            resizeMode="contain" /> 

            <TabsFavoritos
            position={position}
            id_aula={videos[position]?.id} 
            favorite={videos[position]?.favorite}
            setFavo={setFavo}
            name={name}
            />  
        </View>
          <RenderTabs handleClick={handleClick} clicked={clicked}/>
        {
          clicked === 0 ?
          <RenderListVideos videos={videos} setPosition={setPosition}/> :
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
    height: '100%',
    alignItems: "center",
    backgroundColor: "#EDF2FF"
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
