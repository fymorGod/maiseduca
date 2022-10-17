import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
  } from "react-native";

function RenderListVideos({ videos, setPosition }) {
  return (
    <View>
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
      </View>
  )
}
export const styles = StyleSheet.create({

    infoDetailsVideo: {
      marginLeft:20,
      marginRight:20,
      justifyContent: "flex-start",
      backgroundColor: "#e2e2e2",
      marginTop: 10,
      flexWrap: "wrap",
    },
    title: {
      marginTop: 10,
      color: "#181818",
    }
  });
  
export {RenderListVideos}