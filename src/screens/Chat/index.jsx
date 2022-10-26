import React, {useEffect, useState, useCallback} from "react";
import { Text, View, StyleSheet, Image, } from 'react-native';
import { AppHeader2 } from "../../components/AppHeader2";
import { GiftedChat } from 'react-native-gifted-chat';



export const Chat = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
          {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
        ])
      }, [])

    const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])


    return (
        <View style={styles.Container}>
            <AppHeader2/>
            <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{_id: 1,}}
            />
        </View>
    )
}





export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#EDF2FF'
    },
   
})