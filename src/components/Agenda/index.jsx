import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Calendar, CalendarList, LocaleConfig} from 'react-native-calendars';


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
  const [dateSelected, setDateSelected] = useState({})

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
    <Calendar
    theme={{todayTextColor:"#fff",
    todayBackgroundColor:'#22C1C1',
    calendarBackground:'#4263EB',
    dayTextColor:"#fff",
    monthTextColor: "#fff",
    selectedDayBackgroundColor: "#22C1C1",
    selectedDayTextColor: "red",
    selectedDotColor: '#red',
      'stylesheet.calendar.header':{
          week: {
              backgroundColor:'#4263EB',
              color: "#fff",
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
      },
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
    markedDates={dateSelected}
    hideExtraDays={false}
    enableSwipeMonths={true}
    hideArrows={true}
    
    />
  )
}


export  { Agenda }