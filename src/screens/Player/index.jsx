import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
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
  const [status, setStatus] = useState({});
  const { width, height } = Dimensions.get("screen");

  useEffect(() => {
    const getVideosContent = async () => {
      const response = await axios.get(
        `http://192.168.6.20:3010/conteudos/${id}/${userInfo.user.id}`
      );
      setVideos(response.data.conteudo.Aula);
    };
    getVideosContent();
  }, []);

  return (
    <View>
      <AppHeader />
      <View style={styles.PlayerView}>
        {videos.map((video) => {
          return (
            <>
              <View
               key={video.id}
                style={{
                  height: height / 3,
                  width: "100%",
                  backgroundColor: "gray",
                }}
              >
                <Video
                    ref={v}
                    source={{ uri: video.file }}
                    useNativeControls
                    resizeMode="contain"
                    style={styles.video}
                />
              </View>
              <Text>{video.title}</Text>
            </>
          );
        })}
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  PlayerView: {
    flex: 1,
    alignItems: "center",
  },
  videoView: {
    width: "100%",
    backgroundColor: "gray",
  },
  postTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  video: {
    width: "100%",
    height: "100%",
  },
});

export { Player };
