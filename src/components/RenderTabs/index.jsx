import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
  } from "react-native";

export function RenderTabs ({handleClick, clicked}) {
    const detailsTabs = [
        {id: 1, label: 'Aulas'},
        {id: 2, label: 'Atividades'},
        {id: 3, label: 'Material'},
      ]

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
export const styles = StyleSheet.create({
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
  });
  