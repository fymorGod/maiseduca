import {
  Alert,
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { Navigation } from "../../../../components/Navigation";
import { Container, Left, Avatar, Info, Name, CardUser, List } from "../styles";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await AppRegistry.get(`user/page/${page}`);

        if (response) {
          setCount(response.data.usersCount);
          const cont = response.data.usersCount / 10;
          if (response.data.users && response.data.users.length > 0) {
            if (page > 1) {
              if (10 * page > users.length && page < cont) {
                const userMerged = [...users, ...response.data.users];
                const mapa = new Map();
                for (const x of userMerged) {
                  mapa.set(x.id, x);
                }
                const final = [...mapa.values()];
                setUsers(final);
              }
            } else if (users.length === 0) {
              setUsers(response.data.users);
            }
          }
        }
      } catch (error) {
        Alert.alert("", "Erro ao carregar os usuários");
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, [page, count, users]);

  async function verificaPage(nextPage) {
    const limit = count / 10;
    if (10 * page >= users.length && page < limit) {
      setPage(nextPage);
    }
  }

  async function refresh() {
    setPage(1), setUsers([]);
  }

  async function chamaNoChat(item) {
    try {
      const response = await api.post(`chat`, { userDest: item._id });
      if (response.data) {
        const { _id: chatId } = response.data;
        Navigation.push("ChatDetails", { chatId, destinatario: item });
      }
    } catch (error) {
      Alert.alert("", "Erro ao criar o chat");
    } finally {
      refresh();
    }
  }

  return (
    <Background>
      <Container>
        <List
          data={users}
          onEndReached={() => verificaPage(page + 1)}
          onEndReachedThreshold={0.1}
          refreshing={refreshing}
          onRefresh={() => refresh()}
          keyExtractor={(item) => String(item._id)}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => chamaNoChat(item)}>
              <CardUser>
                <Left>
                  <Avatar
                    source={{
                      uri: item.photo_url,
                    }}
                  />
                  <Info>
                    <Name>{item.nome}</Name>
                  </Info>
                </Left>
              </CardUser>
            </TouchableOpacity>
          )}
        ></List>
      </Container>
    </Background>
  );
};

export default Users;
