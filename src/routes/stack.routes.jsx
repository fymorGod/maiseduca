import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, Text, Platform, StyleSheet, Button } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import { Home } from "../screens/Home";
import { Login } from "../screens/Login";
import { Anotation } from "../screens/Anotation";
import { Aulas } from "../screens/Aulas";
import { Conquistas } from "../screens/Conquistas";
import { Calendario } from "../screens/Calendario";
import { Conteudos } from "../screens/Conteudos";
import { AuthContext } from "../context/AuthContext";
import { EditAnotation } from "../screens/EditAnotation";
import { useContext } from "react";
import { CreateAnotation } from "../screens/CreateAnotation";
import { Perfil } from "../screens/Perfil";
import { Configuracao } from "../screens/Configuracao";
import { TrocarSenha } from "../screens/TrocarSenha";
import { Player } from "../screens/Player";
import { Classificacao } from "../screens/Classificacao";
import { AtividadeInicio } from "../screens/AtividadeInicio";
import { Atividade } from "../screens/Atividade";
import { AnotationAula } from "../screens/AnotationAula";
import { MinhasNotas } from "../screens/MinhasNotas";
import { Chat } from "../screens/Chat";

export function StackRoutes() {
  const { userInfo } = useContext(AuthContext);
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#4263EB",
        },
        headerTitle: () => (
          <Image
            style={{ width: 120, height: 30, marginLeft: -15 }}
            source={require("../../assets/logo.png")}
          />
        ),
      }}
    >

      {userInfo.token ? (
        <Stack.Group>
          <Stack.Screen
            name="home"
            component={ShowBottomTabs}
            options={{ headerTransparent: true, headerShown: false, title: "" }}
          />

          <Stack.Screen
            name='Conteudos'
            component={Conteudos}
            options={{ headerTransparent: true, headerShown: false, title: "" }}
          />

          <Stack.Screen
          name="EditAnotation"
          component={EditAnotation}
          options={{ headerTransparent: true, headerShown: false, title: "",}}
          />

          <Stack.Screen
          name="CreateAnotation"
          component={CreateAnotation}
          options={{ headerTransparent: true, headerShown: false, title: "" }}
          />

          <Stack.Screen
          name="Perfil"
          component={Perfil}
          options={{ headerTransparent: true, headerShown: false, title: "" }}
          />

          <Stack.Screen
          name="MinhasNotas"
          component={MinhasNotas}
          options={{ headerTransparent: true, headerShown: false, title: "" }}
          />

          <Stack.Screen
          name="Configuracao"
          component={Configuracao}
          options={{ headerTransparent: true, headerShown: false, title: "" }}
          />

          <Stack.Screen
          name="TrocarSenha"
          component={TrocarSenha}
          options={{ headerTransparent: true, headerShown: false, title: "" }}
          />

          <Stack.Screen
          name="Player"
          component={Player}
          options={{ headerTransparent: true, headerShown: false, title: "" }}
          />

          <Stack.Screen
          name="Classificacao"
          component={Classificacao}
          options={{ headerTransparent: true, headerShown: false, title: "" }}
          />

          <Stack.Screen
          name="AtividadeInicio"
          component={AtividadeInicio}
          options={{ headerTransparent: true, headerShown: false, title: "" }}
          />

          <Stack.Screen
          name="Atividade"
          component={Atividade}
          options={{ headerTransparent: true, headerShown: false, title: "" }}
          />

          <Stack.Screen
          name="AnotationAula"
          component={AnotationAula}
          options={{ headerTransparent: true, headerShown: false, title: "" }}
          />

          <Stack.Screen
          name="Chat"
          component={Chat}
          options={{ headerTransparent: true, headerShown: false, title: "" }}
          />

        </Stack.Group>
      ) : (
        <>
          <Stack.Screen
            name="login"
            component={Login}
            options={{ headerTransparent: true, headerShown: false, title: "" }}
          />
        </>
      )}

   </Stack.Navigator>

  );
}

export function HomeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{ headerTransparent: true, headerShown: false, title: "" }}
      />
    </Stack.Navigator>
  );
}

export function AnotationNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Anotation"
        component={Anotation}
        options={{ headerTransparent: true, headerShown: false, title: "" }}
      />
    </Stack.Navigator>
  );
}

export function AulasNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Aulas"
        component={Aulas}
        options={{ headerTransparent: true, headerShown: false, title: "" }}
      />
    </Stack.Navigator>
  );
}

export function ConquistasNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Conquistas"
        component={Conquistas}
        options={{ headerTransparent: true, headerShown: false, title: "" }}
      />
    </Stack.Navigator>
  );
}

export function CalendarioNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Calendario"
        component={Calendario}
        options={{ headerTransparent: true, headerShown: false, title: "" }}
      />
    </Stack.Navigator>
  );
}

export const ShowTopTabNavigator = () => {

}

export function ShowBottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        unmountOnBlur: true,
        tabBarStyle: { height: Platform.OS === "ios" ? 100 : 60 },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <Icon
                name="home"
                size={20}
                color={focused ? "#92A7FD" : "#2F598431"}
              />
              <Text style={styles.text}>Home</Text>
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Anotacao"
        component={AnotationNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <Icon
                name="file-signature"
                size={20}
                color={focused ? "#92A7FD" : "#2F598431"}
              />
              <Text style={styles.text}>Anotação</Text>
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Disciplinas"
        component={AulasNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <Icon
                name="book-open"
                size={20}
                color={focused ? "#92A7FD" : "#2F598431"}
              />
              <Text style={styles.text}>Aulas</Text>
            </>
          ),
        }}
      />
      <Tab.Screen
        name="ConquistasTab"
        component={ConquistasNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <Icon
                name="trophy"
                size={20}
                color={focused ? "#92A7FD" : "#2F598431"}
              />
              <Text style={styles.text}>Conquistas</Text>
            </>
          ),
        }}
      />
      <Tab.Screen
        name="CalendarioTab"
        component={CalendarioNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <Icon
                name="calendar-alt"
                size={20}
                color={focused ? "#92A7FD" : "#2F598431"}
              />
              <Text style={styles.text}>Agenda</Text>
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export const styles = StyleSheet.create({
  text: {
    fontSize: 13,
    color: "#ADB5BD",
  },
});