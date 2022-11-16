import React, { useEffect, useState } from 'react';
import CalendarPicker from 'react-native-calendar-picker';

  //calendário renderizado na pagin a de calendário

function Agenda(props) {
  const limite = 10;

  return (
  <CalendarPicker
  weekdays={['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']}
  months={['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']}
  startFromMonday={true}
  todayBackgroundColor="#22C1C1"
  onDateChange={day => {
    props.setDate(day.toISOString())
  }}
  selectedDayTextColor="#FFFFFF"
  selectedDayColor='#22C1C1'
  textStyle={{
    color: '#f2f2f2',
  }}
  nextTitle='Próximo'
  previousTitle='Anterior'
  />

  )
}


export  { Agenda }