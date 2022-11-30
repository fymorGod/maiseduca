import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import {
  Text,
  View,
  BackHandler,
  TouchableOpacity,
  Modal,
  Animated,
  ScrollView,
  StatusBar,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import api from "../../api/api";

export const Atividade = ({ route }) => {
  const navigation = useNavigation();
  let id = route.params.id;
  const { userInfo } = useContext(AuthContext);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  //contador do tempo da atividade
  useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  //inicio do tempo da atividade
  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  //fim do tempo da atividade
  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };


  Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
  };

  //get do inicio da atividade e do timer da pagina
  useEffect(() => {
    const getAtv = async () => {
      const response = await api.get(
        `/atividadeQuestoes/${id}`
      );
      setAtv(response.data["questoes"]);
    };
    BackHandler.addEventListener('hardwareBackPress', () =>{
      return true
    })
    getAtv();
    handleStart();
  }, []);



  const [atv, setAtv] = useState([]);
  const allQuestions = atv;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [pontos, setPontos] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);

  //função para envio da atividade
  const enviarNota = async () => {
    try {
      const response = await axios.post(
        `http://35.199.114.75:3010/aluno_responde_atividade`,
        {
          nota: pontos,
          id_aluno: `${userInfo.user.id}`,
          id_atividade: `${id}`,
          time: time
        }
      );
      if (response.status == 201) {
        navigation.popToTop();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //validação das alternativas
  const validateAnswer = (selectedOption) => {
    let correct_option = allQuestions[currentQuestionIndex]["correct_option"];
    setCurrentOptionSelected(selectedOption);
    setIsOptionsDisabled(true);
    if (selectedOption == correct_option) {
      // Set Score
      setCorrectOption(correct_option);
      setScore(score + 1);
      setPontos(pontos + allQuestions[currentQuestionIndex]["grade"]);
    }
    // Show Next Button
    setShowNextButton(true);
  };

  //proxima questão
  const handleNext = () => {
    if (currentQuestionIndex == allQuestions.length - 1) {
      // Last Question
      // Show Score Modal
      setShowScoreModal(true);
      setIsPaused(true)
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  //renderizando proxima questão
  const renderQuestion = () => {
    return (
      <View
        style={{
          marginVertical: 40,
        }}
      >
        {/* Question Counter */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 20,
              opacity: 0.6,
              marginRight: 2,
            }}
          >
            {currentQuestionIndex + 1}
          </Text>
          <Text style={{ color: "#FFFFFF", fontSize: 18, opacity: 0.6 }}>
            / {allQuestions.length}
          </Text>
        </View>

        {/* Question */}
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 20,
          }}
        >
          {allQuestions[currentQuestionIndex]?.title}
        </Text>
      </View>
    );
  };

  //random das questoes
  var alternativas = allQuestions[currentQuestionIndex]?.opcoes.sort((a, b) =>
    a > b ? 1 : -1
  );

  //renderizando as questoes
  const renderOptions = () => {
    return (
      <View>
        {allQuestions[currentQuestionIndex]?.opcoes.map((option) => (
          <TouchableOpacity
            onPress={() => validateAnswer(option)}
            disabled={isOptionsDisabled}
            key={option}
            style={{
              borderWidth: 3,
              borderColor:
                option == correctOption
                  ? "#00C851"
                  : option == currentOptionSelected
                  ? "red"
                  : "#92A7FD",
              backgroundColor:
                option == correctOption
                  ? "#00C851" + "20"
                  : option == currentOptionSelected
                  ? "#92A7FD"
                  : "#92A7FD",
              height: 100,
              borderRadius: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              marginVertical: 5,
            }}
          >
            <Text style={{ fontSize: 16, color: "#FFF", fontWeight: "bold" }}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  //botão de proxima questão
  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <TouchableOpacity
          onPress={handleNext}
          style={{
            marginTop: 20,
            width: "100%",
            backgroundColor: "#403B91",
            padding: 15,
            borderRadius: 50,
          }}
        >
          <Text style={{ fontSize: 20, color: "#FFFFFF", textAlign: "center" }}>
            Próxima Questão
          </Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  //variaveis da barra de progresso 
  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestions.length],
    outputRange: ["0%", "100%"],
  });

  //barra de progresso
  const renderProgressBar = () => {
    return (
      <View
        style={{
          width: "100%",
          height: 20,
          borderRadius: 20,
          backgroundColor: "#00000020",
        }}
      >
        <Animated.View
          style={[
            {
              height: 20,
              borderRadius: 20,
              backgroundColor: "#00B7B7",
            },
            {
              width: progressAnim,
            },
          ]}
        ></Animated.View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
    <ImageBackground source={require("../../../assets/BG.png")} resizeMode="cover" style={{flex:1, justifyContent:'center'}}>
    <View
    style={{
      flex: 1,
      paddingTop: 40,
      paddingBottom: 5,
      paddingHorizontal: 16,
      position: "relative",
    }}
  >
    {/* ProgressBar */}
    {renderProgressBar()}

    <ScrollView>
      {/* Question */}
      {renderQuestion()}

      {/* Options */}
      {renderOptions()}

      {/* Next Button */}
      {renderNextButton()}
    </ScrollView>

    {/* Score Modal */}
    <Modal
      animationType="slide"
      transparent={true}
      visible={showScoreModal}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "#252c4a",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            width: "90%",
            borderRadius: 20,
            padding: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>
            {score > allQuestions.length / 2 ? "Parabéns!" : "Quase lá!"}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                color:
                  score > allQuestions.length / 2 ? "#00C851" : "#ff4444",
              }}
            >
              {score}
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "#171717",
              }}
            >
              / {allQuestions.length}
            </Text>
          </View>

          {/* Enviar Pontuação - Buttom*/}
          <TouchableOpacity
            onPress={() => enviarNota()}
            style={{
              backgroundColor: "#3498db",
              padding: 20,
              width: "100%",
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: 20,
              }}
            >
              Voltar ao início
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  </View>
      </ImageBackground>
    </View>
  );
};
