import React, { useEffect, useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { AppHeader2 } from "../../components/AppHeader2";
import { TabsFavoritos } from "../../components/tabsFavoritos/tabsFavoritos";
import { Video } from "expo-av";
import { Image as Image1 } from "react-native-expo-image-cache";
import { useFonts } from "expo-font";
import api from "../../api/api";

export const VideoAulas = ({ route }) => {
  let [fontsLoaded] = useFonts({
    Medium: require("../../../assets/fonts/Poppins-Medium.ttf"),
    Regular: require("../../../assets/fonts/Poppins-Regular.ttf"),
    Bold: require("../../../assets/fonts/Poppins-Bold.ttf"),
  });
  //id do conteudo favoritado
  let id = route.params.id;
  //id do video favoritado
  let file = route.params.file;
  //titulo do video favoritado e de ultimas aulas
  let title = route.params.title;

  const navigation = useNavigation();
  const [videos, setVideos] = useState([]);
  const [videoAula, setVideoAula] = useState("");
  const [status, setStatus] = useState({});
  const [firstAula, setFirstAula] = useState("");
  const [corId, setCorId] = useState("");
  const [name, setName] = useState();
  const [nameConteudo, setNameConteudo] = useState("");
  const [idAula, setIdAula] = useState();
  const v = React.useRef(null);
  const { userInfo } = useContext(AuthContext);
  const [idBimestre, setIdBimestre] = useState();
  const [posicaoVideo, setPosicaoVideo] = useState();
  const [favo, setFavo] = useState(false);
  const [idProfessor, setIdProfessor] = useState();
  const [nomeVideo, setNomeVideo] = useState();
  const [nomeProfessor, setNomeProfessor] = useState();
  const [firstVideoTitle, setFirstVideoTitle] = useState("");
  const limite = 50;
  const limiteConteudo = 30;


  //get nos conteudos do vídeo/atividades/materiais
  useEffect(() => {
    if (id) {
      const getVideosContent = async () => {
        const response = await api.get(
          `/conteudos/${id}/${userInfo.user.id}`
        );
        setFirstAula(response.data.conteudo["first_aula"]);
        setVideos(response.data.conteudo.array_conteudos);
        setName(response.data["conteudo"]["disciplina"].name);
        setNameConteudo(response.data["conteudo"].name);
        setIdBimestre(response.data["conteudo"].id_bimestre);
        setIdProfessor(response.data["conteudo"].created_by);
        setNomeProfessor(response.data["conteudo"].professor);
        setFirstVideoTitle(response.data.conteudo["first_aula"].title);
        console.log(response.data.conteudo["first_aula"].title)
      };
      getVideosContent();
    }
  }, [favo]);

  const pauseVideo = (tudo) => {
    if (v) {
      v.current.pauseAsync();
      navigation.navigate("AtividadeInicio", {
        id: `${tudo.atividade.id}`,
        title: `${tudo.atividade.title}`,
      });
    }
  };

  // função para alterar entre vídeos
  const videoRodando = (tudo) => {
    setFirstAula("");
    setVideoAula(tudo.aula.file);
    setIdAula(tudo.aula.id);
    setCorId(tudo.aula.id);
    setPosicaoVideo(tudo.aula.progress);
    setFavo(tudo.aula.favorite);
    setNomeVideo(tudo.aula.title);
    
  };

  //renderização de video aulas
  const aulas = (tudo) => {
    return (
      <View style={{}}>
        <TouchableOpacity key={tudo.aula.id} onPress={() => videoRodando(tudo)}>
          <View style={corId == tudo.aula.id ? styles.videos2 : styles.videos}>
            <View style={{ height: 45, width: 80 }}>
              <Image1
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: 10,
                  marginVertical: 5,
                }}
                resizeMode="contain"
                uri={`${tudo.aula.thumb}`}
              />
            </View>
            <View style={{ marginLeft: 10, width: 220 }}>
              <Text style={styles.title}>
                {tudo.aula.title.length > limite
                  ? tudo.aula.title.substring(0, limite) + "..."
                  : tudo.aula.title}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  //renderização de atividades
  const atividade = (tudo) => {
    return (
      <View style={{}}>
        <TouchableOpacity
          key={tudo.atividade.id}
          onPress={() => pauseVideo(tudo)}
        >
          <View style={styles.videos}>
            <View style={{ height: 45, width: 80 }}>
              <Image
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: 10,
                  marginVertical: 5,
                }}
                resizeMode="contain"
                source={require("../../../assets/atividade.png")}
              />
            </View>
            <View style={{ width: 220, marginLeft: 10 }}>
              <Text style={styles.title}>{tudo.atividade.title}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  //função de post do progresso das aulas
  const postProgresso = async () => {
    try {
      const res = await api.post(`/progressos`, {
        id_aluno: `${userInfo.user.id}`,
        id_aula: idAula != "" ? firstAula.id : idAula,
        progress: status.positionMillis,
        id_bimestre: idBimestre,
      });
      if (res.status === 201) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  //post acontece quando o video esta parado ou pausado
  if (status.isPlaying == false) {
    postProgresso();
  }

  return (
    <View style={styles.Container}>
      <AppHeader2 />
      <View style={{ height: "30%", backgroundColor: "black", width: "100%" }}>
        {/* player do video */}
        <Video
          style={{ width: "100%", height: "100%" }}
          ref={v}
          shouldPlay={true}
          source={{
            uri: videoAula == "" ? file || firstAula?.file : videoAula,
          }}
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          useNativeControls
          positionMillis={
            firstAula.progress != 0 ? firstAula.progress : posicaoVideo
          }
          resizeMode="contain"
        />
      </View>

      {/* renderizando videos e atividades na pagina */}
      <ScrollView>
        <View style={{ backgroundColor: "#fff", paddingTop: 10 }}>
          <View style={{ marginHorizontal: 20 }}>
            <Text
              style={{ color: "#4264EB", fontFamily: "Medium", fontSize: 18 }}
            >
              {
                nomeVideo === undefined ? title || firstVideoTitle : nomeVideo
              }
            </Text>
          </View>
          <View style={{ marginHorizontal: 20, }}>
            <Text
              style={{ color: "#343434", fontFamily: "Regular", fontSize: 14 }}
            >
              {nameConteudo.length > limiteConteudo
                ? nameConteudo.substring(0, limite) + "..."
                : nameConteudo}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
              marginHorizontal: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 50,
                  marginRight: 5,
                }}
              >
                <Image
                  style={{ height: "100%", width: "100%" }}
                  resizeMode="contain"
                  source={require("../../../assets/avatar.png")}
                />
              </View>
              <Text style={{ color: "#343434", fontFamily: "Regular" }}>
                {nomeProfessor}
              </Text>
            </View>
          </View>

          {/* Componente de chat/favoritos/anotações  */}
          <View style={{justifyContent:'center', alignItems:'center'}}>
          <TabsFavoritos
          idProfessor={idProfessor}
          first_idAula={firstAula.id}
          first_Favo={firstAula.favorite}
          id_bimestre={idBimestre}
          id_aula={idAula}
          favorite={favo}
          setFavo={setFavo}
          name={name}
        />
          </View>
        </View>
        {videos.map((tudo, index) => (
          <View key={index} style={{ alignItems: "flex-start" }}>
            {tudo.atividade ? atividade(tudo) : aulas(tudo)}
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
  videos: {
    width: "100%",
    height: 55,
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 5,
    marginHorizontal: 20,
  },
  videos2: {
    width: "150%",
    height: 60,
    paddingVertical:2.5,
    flexDirection: "row",
    alignItems: "flex-start",
    
    paddingHorizontal: 20,
    backgroundColor: "#D1DEFE",
  },
  title: {
    paddingVertical: 5,
    textAlignVertical: "top",
    color: "#343A40",
    fontFamily: "Regular",
    fontSize: 13,
  },
});
