import { NavigationHelpersContext } from '@react-navigation/native';
import {
    getDatabase,
    ref,
    push,
    update,
  } from 'firebase/database';
import { findUser } from './findUser';
import { useNavigation } from "@react-navigation/native";

 export const onAddFriend = async (idProfessor, myData) => {
    const navigation = useNavigation();

    try {
      //find user and add it to my friends and also add me to his friends
      const database = getDatabase();

      const user = await findUser(idProfessor);

      if (user) {
        if (user.username === myData.username) {
          // don't let user add himself
          return;
        }

        if (
          myData.friends &&
          myData.friends.findIndex(f => f.username === user.username) > 0
        ) {
          // don't let user add a user twice
          return;
        }

        // create a chatroom and store the chatroom id

        const newChatroomRef = push(ref(database, 'chatrooms'), {
          firstUser: myData.username,
          secondUser: user.username,
          messages: [],
        });

        const newChatroomId = newChatroomRef.key;

        const userFriends = user.friends || [];
        //join myself to this user friend list
        update(ref(database, `users/${user.username}`), {
          friends: [
            ...userFriends,
            {
              username: myData.username,
              avatar: myData.avatar,
              chatroomId: newChatroomId,
            },
          ],
        });

        const myFriends = myData.friends || [];
        //add this user to my friend list
        update(ref(database, `users/${myData.username}`), {
          friends: [
            ...myFriends,
            {
              username: user.username,
              avatar: user.avatar,
              chatroomId: newChatroomId,
            },
          ],
        });
        navigation.navigate("Chat", {myData: `${myData}`, idProfessor:`${idProfessor}`})
      }
    } catch (error) {
      console.error(error);
    }
  };