import React, { useEffect, useState } from 'react';
import {Calendar} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';

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
  monthNamesShort: ['Jan', 'Fev.', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set', 'Out.', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Quin.', 'Sex.', 'Sab.'],
  today: "Hoje"
};
LocaleConfig.defaultLocale = 'br';

function Agenda(props) {
  const limite = 10;

  const workout = {key: 'workout', color: 'cyan'};


  let markedDay = {};

  props['lembretes'].map((item)=>{
    markedDay[item.data_masked] = {
      dots:[{key: `${item.title}`, color: 'cyan'}]
    };
  })
  return (
  <Calendar
    theme={{
      calendarBackground: "#4263EB",
      selectedDayTextColor: '#22C1C1',
      arrowColor: '#FFF',
      monthTextColor: '#FFF',
      todayTextColor:"#fff",
      todayBackgroundColor:'#22C1C1',
      selectedDayBackgroundColor:'#22C1C1',
      textDayStyle:{
        color:'#FFF'
      }
    }}
    onDayPress={
      day => {
       props.setDate(day.dateString)
      }
    }
    markingType={'multi-dot'}
    markedDates={markedDay}
  />

  )
}


export  { Agenda }