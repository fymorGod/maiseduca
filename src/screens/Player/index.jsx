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

const Player = ({ route }) => {
  let id = route.params.id;

  const v = React.useRef(null);
  const { userInfo } = useContext(AuthContext);
  const [ clicked, setClicked ] = useState(0);
  const [videos, setVideos] = useState([]);
  const [position, setPosition] = useState(0);
  const { width, height } = Dimensions.get("screen");

  const detailsTabs = [
    {id: 1, label: 'Aulas'},
    {id: 2, label: 'Atividades'},
    {id: 3, label: 'Material'},
  ]

  useEffect(() => {
    const getVideosContent = async () => {
      const response = await axios.get(
        `http://192.168.6.20:3010/conteudos/${id}/${userInfo.user.id}`
      );
      setVideos(response.data.conteudo.Aula);
      console.log(response.data.conteudo.Aula[position].title);
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
        backgroundColor: '#2F598431'
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
      <View>
        <Text>Lista de Atividades</Text>
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
            backgroundColor: "#fff",
          }}
        >
        {
            <Video
            
            ref={v}
            source={{ uri: videos[position]?.file }}
            useNativeControls
            resizeMode="contain"
            style={styles.video}
          />
        }
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
    justifyContent: "flex-start",
    backgroundColor: "#e2e2e2",
    marginTop: 10,
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
