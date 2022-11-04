import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import { TabsFavoritos } from "../../components/tabsFavoritos/tabsFavoritos";
import { RenderListVideos } from "../../components/RenderListVideos";
import { RenderTabs } from "../../components/RenderTabs";
import { AppHeader2 } from "../../components/AppHeader2";


export const Player = ({ route }) => {
  let id = route.params.id;
  const posicaoFav = route.params.position;
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
  const [ progresso, setProgresso ] = useState(false);
  const [status, setStatus] = useState({});
  const [idBimestre, setIdBimestre] = useState();
  const [idProfessor, setIdProfessor] = useState('');
  


  useEffect(() => {
    const getVideosContent = async () => {
      const response = await axios.get(
        `http://192.168.6.20:3010/conteudos/${id}/${userInfo.user.id}`
      );
      setVideos(response.data.conteudo.Aula);
      setAtv(response.data["conteudo"]["atividade"]);
      setName(response.data["conteudo"]["disciplina"].name);
      setIdBimestre(response.data["conteudo"].id_bimestre);
      setIdProfessor(response.data["conteudo"].created_by);
    };
    getVideosContent();

  }, [favo]);
  

  const handleClick = (id) => {
    setClicked(id)
  }

  const renderListAtividades = () => {
    return (
      <View >
        {
          atv.map((atvs)=>(
            <View style={{marginLeft: 20,
              marginRight:20,
              justifyContent: "flex-start",
              backgroundColor: "#EDF2FF",
              marginTop: 10,
              flexWrap: "wrap",}} key={atvs.id}>
            <TouchableOpacity
              onPress={
                () => navigation.navigate('AtividadeInicio', {id: `${atvs.id}`, title: `${atvs.title}`})
              }>
              <View style={{width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"}}>
              <Image
              style={{height: 45, width: 80}}
              resizeMode="contain" 
              source={require("../../../assets/ATIVIDADE.png")} 
              />
              <View style={{width: "80%",paddingRight: 5, alignItems: 'flex-start', alignSelf:'flex-start', paddingTop:7}}>
                <Text style={{fontSize:14,
                  color:'#868E96',
                  fontSize: 14,
                  textAlign: 'justify',
                  marginLeft:20}}>{atvs.title}</Text>
              </View>
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
  
  const postProgresso = async() => {
   try {
    const res = await axios.post(`http://192.168.6.20:3010/progressos`, {
        "id_aluno": `${userInfo.user.id}`,
        "id_aula": videos[position].id,
        "progress": status.positionMillis,
        "id_bimestre": idBimestre
      })
      if(res.status === 201){
        console.log(res)        
      }
   } catch (error) {
    console.log(error)
   }
  }


  if (status.isPlaying == false) {
    postProgresso()
  }

  
  return (
    <View>
      <AppHeader2 setProgresso={setProgresso} progresso={progresso}/>
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
            source={{ uri: posicaoFav != null ? videos[posicaoFav]?.file :videos[position]?.file }}
            shouldPlay={true}
            onPlaybackStatusUpdate={status => setStatus(() => status)}
            useNativeControls
            positionMillis={videos[position]?.progress}
            resizeMode="contain"/>


             
            <TabsFavoritos
            position={position}
            id_aula={videos[position]?.id} 
            favorite={videos[position]?.favorite}
            setFavo={setFavo}
            name={name}
            id_professor={idProfessor}
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