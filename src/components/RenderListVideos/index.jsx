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
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={{ uri: `${video.thumb}` }}
                  resizeMode="contain"
                  style={{height: 60, width: 80}}
                />
                <View
                  style={{ width: "80%",paddingRight: 5, alignItems: 'center'}}
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
      marginLeft: 20,
      marginRight:20,
      justifyContent: "flex-start",
      backgroundColor: "#EDF2FF",
      marginTop: 10,
      flexWrap: "wrap",
    },
    title: {
      fontSize:14,
      color:'#868E96',
      marginTop: 10,
      fontSize: 12,
      textAlign: 'center',
     
    }
  });
  
export {RenderListVideos}