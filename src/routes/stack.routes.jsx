import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, Text, Platform, StyleSheet } from "react-native";
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
          options={{ headerTransparent: true, headerShown: false, title: "" }}
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
