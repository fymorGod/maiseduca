import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  KeyboardAvoidingView,
} from "react-native";
import { AppHeader } from "../../components/AppHeader";
import { FAB } from "react-native-paper";
import { Agenda } from "../../components/Agenda";
import RBSheet from "react-native-raw-bottom-sheet";
import MaskInput from "react-native-mask-input";
import { AuthContext } from "../../context/AuthContext";
import { ScrollView } from "native-base";
import ToastManager, { Toast } from "toastify-react-native";
import { useFonts } from "expo-font";
import { Feather } from "@expo/vector-icons";
import api from "../../api/api";

const windowHeight = Dimensions.get("window").height;

export const Calendario = () => {
  const refRBSheet = useRef();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [date, setDate] = useState();
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [lembretes, setLembretes] = useState([]);
  const [data, setData] = useState("");
  const { userInfo } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);
  const horaMask = [/\d/, /\d/, ":", /\d/, /\d/];
  const dataMask = [/\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/];
  const limite = 10;

  let [fontsLoaded] = useFonts({
    Medium: require("../../../assets/fonts/Poppins-Medium.ttf"),
  });

  useEffect(() => {
    getLembrete();
  }, []);

  // timer da atualização da página
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  // atualizar página
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => getLembrete(), setRefreshing(false));
  }, []);

  // postLembretes
  const postLembrete = async () => {
    DataEnvio(date);
    try {
      const res = await api.post(`/lembretes`, {
        title: titulo,
        description: descricao,
        data: data,
        start: `${data} ${inicio}`,
        end: `${data} ${fim}`,
        id_aluno: `${userInfo.user.id}`,
      });
      if (res.status === 201) {
        showToasts();
        setTimeout(() => {
          refRBSheet.current.close();
          onRefresh();
        }, 1000);
      }
    } catch (error) {
      console.log("titulo", titulo);
      console.log("descricao", descricao);
      console.log("data + inicio", data, inicio);
      console.log("data + fim", data, fim);
      console.log("id aluno", userInfo.user.id);

      console.log(error);
    }
  };

  //  função para alterar a data no formato p/ envio
  function DataEnvio(date) {
    if (date?.length > limite) {
      setData(date.substring(0, limite));
    }
  }

  // getLembretes
  const getLembrete = async () => {
    try {
      const res = await api.get(`/lembretesByAluno/${userInfo.user.id}`);
      setLembretes(res.data["lembretes"]);
    } catch (error) {
      console.log(error);
    }
  };

  // Deletar Lembrete
  const delLembretes = async (id) => {
    try {
      const res = await api.delete(`/lembretes/${id}`);
      if (res.status === 204) {
        showToastDel();
        setTimeout(() => {
          onRefresh();
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // alerta de criação do lembrete
  const showToasts = () => {
    Toast.success("Lembrete criado  ");
  };

  // alerta de sucesso ao deletar lembrete
  const showToastDel = () => {
    Toast.success("Lembrete deletado ");
  };

  const getMinDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return year + "-" + addZero(month) + "-" + addZero(date); //yyyy-mm-dd
  };

  return (
    <View style={styles.Container}>
      <AppHeader />
      <ToastManager />
      <View style={[styles.shadowProp, styles.calendar]}>
        <Agenda setDate={setDate} />
      </View>
      {/* Cards Lembretes */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getLembrete} />
        }
      >
        <View style={styles.cards}>
          {lembretes.map((avisos) => (
            <View style={styles.card} key={avisos.id}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.text}>{avisos.title}</Text>
                <TouchableOpacity onPress={() => delLembretes(avisos.id)}>
                  <Feather name="x" size={25} color="gray" />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={{ color: "#495057", marginLeft: 10 }}>
                  {avisos.description}
                </Text>
                <Text
                  style={{ color: "#3B5BDB", marginLeft: 10, marginTop: 20 }}
                >
                  {avisos.start + " - " + avisos.end}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View>
        {/* BottomSheet */}
        <RBSheet
          ref={refRBSheet}
          height={600}
          openDuration={250}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            container: {
              backgroundColor: "#F1F3F5",
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
              elevation: 30,
            },
            wrapper: {
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: "#000",
            },
          }}
        >
          <KeyboardAvoidingView>
            <View style={{ paddingHorizontal: 20, paddingVertical: 30 }}>
              {/* Titulo */}
              <Text
                style={{ color: "#4264EB", fontSize: 18, fontFamily: "Medium" }}
              >
                Título
              </Text>
              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <TextInput
                  style={styles.Input}
                  value={titulo}
                  placeholder="Digite um título"
                  onChangeText={(text) => setTitulo(text)}
                />
              </View>
              {/* Descricao */}
              <Text
                style={{ color: "#4264EB", fontSize: 18, fontFamily: "Medium" }}
              >
                Descrição
              </Text>
              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <TextInput
                  maxLength={30}
                  style={styles.Input}
                  value={descricao}
                  placeholder="Digite uma descrição"
                  onChangeText={(text) => setDescricao(text)}
                />
              </View>
              {/* data */}
              <Text
                style={{ color: "#4264EB", fontSize: 18, fontFamily: "Medium" }}
              >
                Data
              </Text>
              <View style={{ marginTop: 10 }}>
                <MaskInput
                  placeholder="Data do evento"
                  mask={dataMask}
                  keyboardType="decimal-pad"
                  style={styles.InputData}
                  value={date}
                  onChangeText={(text) => setDate(text)}
                />
              </View>

              {/* Inicio e fim */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: "#4264EB",
                    fontSize: 18,
                    fontFamily: "Medium",
                  }}
                >
                  Início
                </Text>
                <View>
                  <Text
                    style={{
                      color: "#4264EB",
                      fontSize: 18,
                      fontFamily: "Medium",
                    }}
                  >
                    Fim
                  </Text>
                </View>
                <Text></Text>
              </View>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  marginRight: 20,
                }}
              >
                <MaskInput
                  keyboardType="decimal-pad"
                  placeholder="Inicio do evento"
                  style={styles.Input2}
                  value={inicio}
                  mask={horaMask}
                  enablesReturnKeyAutomatically
                  onChangeText={(masked) => {
                    setInicio(masked);
                  }}
                />
                <MaskInput
                  keyboardType="decimal-pad"
                  placeholder="Fim do evento"
                  style={styles.Input3}
                  value={fim}
                  mask={horaMask}
                  enablesReturnKeyAutomatically
                  onChangeText={(masked) => {
                    setFim(masked);
                  }}
                />
              </View>

              {/* Buttons */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "48%",
                    alignItems: "center",
                    marginRight: 5,
                    marginTop: 20,
                    paddingVertical: 10,
                    borderRadius: 12,
                    elevation: 0,
                    backgroundColor: "#D1DEFE",
                  }}
                  onPress={() => refRBSheet.current.close()}
                >
                  <Text
                    style={{
                      color: "#343A40",
                      fontSize: 16,
                      fontFamily: "Medium",
                    }}
                  >
                    Cancelar
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => postLembrete()}
                  style={{
                    width: "48%",
                    alignItems: "center",
                    marginTop: 20,
                    paddingVertical: 10,
                    borderRadius: 12,
                    elevation: 0,
                    backgroundColor: "#4264EB",
                  }}
                >
                  <Text
                    style={{
                      color: "#f2f2f2",
                      fontSize: 16,
                      fontFamily: "Medium",
                    }}
                  >
                    Confirmar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </RBSheet>
      </View>

      <FAB
        icon="plus"
        color="white"
        style={styles.fab}
        onPress={() => refRBSheet.current.open()}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#EDF2FF",
  },
  fab: {
    backgroundColor: "#4263EB",
    borderRadius: 50,
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  Input: {
    width: "95%",
    height: 50,
    marginBottom: 12,
    borderRadius: 8,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
  },
  InputData: {
    width: "50%",
    height: 50,
    marginBottom: 12,
    borderRadius: 8,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
  },
  Input2: {
    width: "50%",
    height: 50,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginRight: 20,
    paddingLeft: 10,
  },
  Input3: {
    width: "50%",
    height: 50,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    paddingLeft: 10,
  },
  card: {
    width: "90%",
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
    height: 120,
    backgroundColor: "white",
    marginBottom: 15,
    borderRadius: 10,
    elevation: 2,
  },
  text: {
    color: "#748FFC",
    margin: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  calendar: {
    height: 380,
    backgroundColor: "#4263EB",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: "#000",
    elevation: 2,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cards: {
    alignItems: "center",
    height: windowHeight,
  },
});
