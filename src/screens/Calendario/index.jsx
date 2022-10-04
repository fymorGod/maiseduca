import React, { useState } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from "react-native-calendars";
import { AppHeader } from "../../components/AppHeader";
import { FAB } from 'react-native-paper';


LocaleConfig.locales['br'] = {
    monthNames: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ],
    monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dec'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'],
    today: "Hoje"
  };

LocaleConfig.defaultLocale = 'br'


export const Calendario = () => {
    const [selectedDay, setselectDay] = useState()

    return (
        <View style={styles.Container}>
        <AppHeader/>
        <View style={{}}>                
            <Calendar
            theme={{
                'stylesheet.calendar.header':{
                    week: {
                        color: "#fff",
                        marginTop: 5,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                      }
                },
                todayBackgroundColor:'#22C1C1',
                calendarBackground:'#4263EB',
                dayTextColor:"#fff",
                monthTextColor: "#fff"
                
            }}
            style={{elevation: 5}}
            markedDates={{
                '2022-10-05': {dotColor: 'red', marked: true, selectedColor: '#22C1C1'},
                '2022-10-20': {marked: true},
                '2022-10-17': {marked: true, dotColor: 'red', activeOpacity: 0},
                '2022-10-15': {disabled: true, disableTouchEvent: true}
              }}
            minDate={'1990-01-01'}
            hideExtraDays={true}
            enableSwipeMonths={true}
            hideArrows={true}
            onDayPress={day=>{console.log('dia selecionado', day);}}
            />
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