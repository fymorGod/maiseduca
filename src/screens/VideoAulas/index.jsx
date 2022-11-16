import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { AppHeader2 } from "../../components/AppHeader2";
import { TabsFavoritos } from "../../components/tabsFavoritos/tabsFavoritos";
import { Video } from "expo-av";
import {Image as Image1}  from 'react-native-expo-image-cache';

export const VideoAulas = ({ route }) => {
  //id do conteudo favoritado
  let id = route.params.id;
  //id do video favoritado
  let file = route.params.file;

  const navigation = useNavigation();
  const [videos, setVideos] = useState([]);
  const [ videoAula, setVideoAula] = useState('')
  const [status, setStatus] = useState({});
  const [firstAula, setFirstAula] = useState('');
  const [corId, setCorId] = useState('');
  const [name,setName] = useState();
  const [idAula, setIdAula] = useState()
  const v = React.useRef(null);
  const { userInfo } = useContext(AuthContext);
  const [idBimestre, setIdBimestre] = useState();
  const [posicaoVideo, setPosicaoVideo] = useState()
  const [favo, setFavo] = useState(false);
  const limite = 28;

  //get nos conteudos do vídeo/atividades/materiais
  useEffect(() => {
      if(id){
      const getVideosContent = async () => {
        const response = await axios.get(
          `http://192.168.6.20:3010/conteudos/${id}/${userInfo.user.id}`
        );
        setFirstAula(response.data.conteudo["first_aula"]);
        setVideos(response.data.conteudo.array_conteudos);
        setName(response.data["conteudo"]["disciplina"].name);
        setIdBimestre(response.data["conteudo"].id_bimestre); 
      };
      getVideosContent();
    }  
    }, [favo]);
 
  // função para alterar entre vídeos
  const videoRodando = (tudo) => {
    setFirstAula('')
    setVideoAula(tudo.aula.file)
    setIdAula(tudo.aula.id)
    setCorId(tudo.aula.id)
    setPosicaoVideo(tudo.aula.progress)
    setFavo(tudo.aula.favorite)
  }

  //renderização de video aulas
  const aulas = (tudo) => {
    return (
      <View>
        <TouchableOpacity 
        key={tudo.aula.id}
        onPress={() => videoRodando(tudo)}>

        <View style={corId== tudo.aula.id ? styles.videos2 : styles.videos }>
          <Image1
          style={{height: 45, width: 80, borderRadius:10}}
          resizeMode="contain" 
          uri={`${tudo.aula.thumb}` }
          />
          
         <View style={{width: 220, marginLeft:10}}>
          <Text style={styles.title}>
            {tudo.aula.title}
          </Text>
      
         </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  //renderização de atividades
  const atividade = (tudo) => {
    return (
      <View>
        <TouchableOpacity
        key={tudo.atividade.id}
        onPress={
            () => navigation.navigate('AtividadeInicio', {id: `${tudo.atividade.id}`, title: `${tudo.atividade.title}`})
          }
        >
        <View style={styles.videos}>
        <Image
        style={{height: 45, width: 80}}
        resizeMode="contain" 
        source={require("../../../assets/ATIVIDADE.png")}
        />
        <View style={{width: 220, marginLeft:10}}>
        <Text style={styles.title}>
          {tudo.atividade.title}
        </Text>
    
       </View>
        </View>
        </TouchableOpacity>
      </View>
    )
  }
  
  //função de post do progresso das aulas
  const postProgresso = async() => {
    try {
      const res = await axios.post(`http://192.168.6.20:3010/progressos`, {
        "id_aluno": `${userInfo.user.id}`,
        "id_aula": idAula != "" ? firstAula.id : idAula,
        "progress": status.positionMillis,
        "id_bimestre": idBimestre
      })
      if(res.status === 201){
        console.log('Deu certo')        
      }
    } catch (error) {
      console.log(error)
    }
  }

  //post acontece quando o video esta parado
  if (status.isPlaying == false) {
    postProgresso()
  }

  return (
      <View style={styles.Container}>
      <AppHeader2 />
        <View style={{height:'30%', backgroundColor:'black', width:'100%' }}>
          {/* player do video */}
          <Video
            style={{ width: "100%",
            height: "100%",}}
            ref={v}
            shouldPlay={true}
            source={{uri: videoAula == ''? file || firstAula?.file : videoAula}}
            onPlaybackStatusUpdate={status => setStatus(() => status)}
            useNativeControls
            positionMillis={firstAula.progress != 0 ? firstAula.progress : posicaoVideo}
            resizeMode="contain"
          />
        </View>
      <View>
      {/* Componente de chat/favoritos/anotações  */}
      <TabsFavoritos
      first_idAula={firstAula.id}
      first_Favo={firstAula.favorite}
      id_bimestre={idBimestre}
      id_aula={idAula}
      favorite={favo}
      setFavo={setFavo}
      name={name}
      />
      </View>

      {/* renderizando videos e atividades na pagina */}
        <ScrollView>
        {videos.map((tudo, index)=>(

          <View key={index} style={{justifyContent:'space-between', alignItems:'flex-start'}}>
              <Text> {tudo.atividade? atividade(tudo) : aulas(tudo)}</Text>
          </View>
      ))}
        </ScrollView>
    </View>
  );
};

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#EDF2FF",
  },
  videos:{
    width:'100%',
    height: 60,
    flexDirection:'row',
    alignItems:'center',
    marginTop:10,
    marginHorizontal:10
  },
  videos2:{
    width:'100%',
    height: 60,
    backgroundColor: "EDF2FF"+30,
    flexDirection:'row',
    alignItems:'center',
    marginTop:10,
    marginHorizontal:10
  },
  title:{
    color:'#868E96',
    textAlign: 'justify',
  }
});
