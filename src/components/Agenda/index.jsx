import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';


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
  

function Agenda(props) {

  const [date, setDate] = useState('')

  const addZero = (a) => {
    if (a < 10 && a > 0) {
      return '0' + a.toString();
    } else {
      return a
    }
  }

  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return year + '-' + addZero(month) + '-' + addZero(date) //yyyy-mm-dd
  }

  const getMinDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return year + '-' + addZero(month) + '-' + addZero(date) //yyyy-mm-dd
  }

  return (
    <View>
    <Calendar
    theme={{
      'stylesheet.calendar.header':{
          week: {
              backgroundColor:'#4263EB',
              color: "#fff",                                                                       marginTop: 5,
              flexDirection: 'row',
              justifyContent: 'space-between'
            },
      },
      todayTextColor:"#fff",
      todayBackgroundColor:'#22C1C1',
      calendarBackground:'#4263EB',
      dayTextColor:"#fff",
      monthTextColor: "#fff",
  }}
  markedDates={{
      '2022-10-05': {dotColor: 'red', marked: true, selectedColor: '#fff'},
      '2022-10-20': {marked: true},
      '2022-10-17': {marked: true, dotColor: 'red', activeOpacity: 0},
      '2022-10-15': {disabled: true, disableTouchEvent: true}
    }}
    current={getCurrentDate().toString()}
    minDate={getMinDate().toString()}
    maxDate={'2050-01-01'}
    monthFormat={'MMMM yyyy'}
    onDayPress={day => {
      console.log("dia selecionado", day)
      setDate(day.dateString)
      props.setDate(date)
    }}
    hideExtraDays={true}
    enableSwipeMonths={true}
    hideArrows={true}
    />
  </View>
  )
}


export  { Agenda }