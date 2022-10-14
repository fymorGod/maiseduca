import React, { useState } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { AppHeader } from "../../components/AppHeader";
import { FAB } from 'react-native-paper';
import Agenda from "../../components/Agenda";




export const Calendario = () => {
    const [selectedDay, setselectDay] = useState()

    return (
      <View style={styles.Container}>
        <AppHeader/>
        <View>
          <Agenda/>
        </View>
        <FAB
        icon="plus"
        color="white"
        style={styles.fab}
        onPress={() => navigation.navigate("CreateAnotation")}
        />
      </View>
    )
}

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#EDF2FF'
    },
    fab: {
        backgroundColor: "#4263EB",
        borderRadius: 50,
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
    

})