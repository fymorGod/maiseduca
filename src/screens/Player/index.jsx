import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { AppHeader } from "../../components/AppHeader";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Video } from "expo-av";

const Player = ({ route }) => {
  const v = React.useRef(null);
  const { userInfo } = useContext(AuthContext);
  let id = route.params.id;
  // console.log(id);
  const [videos, setVideos] = useState([]);
  const [position, setPosition] = useState(0);
  const { width, height } = Dimensions.get("screen");


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

  return (
    <View>
      <AppHeader />
      <View style={styles.PlayerView}>
        <View
          style={{
            height: height / 3,
            width: "100%",
            backgroundColor: "gray",
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
        })}
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  PlayerView: {
    alignItems: "center",
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
