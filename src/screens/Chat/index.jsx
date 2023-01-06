import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AppHeader2 } from "../../components/AppHeader2";
import { GiftedChat } from "react-native-gifted-chat";
import socketServices from "../../util/socketServices";
import { AuthContext } from "../../context/AuthContext";

export const Chat = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const { userInfo } = useContext(AuthContext);
  const [idSala, setIdSala] = useState('')
  const [previousMessages, setPreviousMessages] = useState([]);

  let id_professor = route.params.idProfessor;
  let nomeProfessor = route.params.nomeProfessor;
  let id_aluno = userInfo.user.id;
  let id_alunoSenha = userInfo.user.id_senha;

  //inicializando sala
  useEffect(() => {
    socketServices.emit(
      "select_room",
      {
        "id_connected":id_aluno,
        id_professor,
        id_aluno,
      },
      (res) => {
        setIdSala(res.room_id);
        setPreviousMessages(res.messages);
      }
    );
    onLoadEarlier()
  }, []);

  //carregando mgs antigas
  useEffect(() => {
    setMessages(previousMessages)
  }, [])
  
  //enviar mensagens
  const onSend = (messages = []) => {
    socketServices.emit("send_message", messages, (res) => {
      console.log("Mensagem enviada",res);
    });
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  };


  //carregar mensagens antigas
  //necessário clicar no botão na tela
  const onLoadEarlier = () => {
    setMessages(previousMessages);
  }



  return (
    <View style={{ flex: 1 }}>
      <AppHeader2 
      nomeProfessor={nomeProfessor} />
      <View style={{ flex: 1 }}>
        <GiftedChat
          showUserAvatar={true}
          placeholder="Digite sua mensagem"
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: id_alunoSenha,
            _idSala: idSala,
            avatar:
              "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
          }}
          textInputStyle={{
            backgroundColor: "white",
            borderRadius: 20,
            paddingHorizontal: 12,
            marginTop: 6,
            borderWidth: 0.5,
            borderColor: "#737373",
          }}
          loadEarlier={true}
          onLoadEarlier={onLoadEarlier}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDF2FF",
  },
  input: {
    height: 42,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
  },
});
