import {
    getDatabase,
    ref,
    set,
    onValue,
  } from 'firebase/database';

export const onLogin = async (setMyData, name, setUsers, idAluno) => {


    try {
      const database = getDatabase();
      //first check if the user registered before

      const user = await findUser(name);

      //create a new user if not registered
      if (user) {
        setMyData(user);
      } else {
        const newUserObj = {
          username: name,
          id_aluno: idAluno,
          avatar: 'https://i.pravatar.cc/150?u=' + Date.now(),
        };

        set(ref(database, `users/${name}`), newUserObj);
        setMyData(newUserObj);
      }

      // set friends list change listener
      const myUserRef = ref(database, `users/${name}`);
      onValue(myUserRef, snapshot => {
        const data = snapshot.val();
        setUsers(data.friends);
        setMyData(prevData => ({
          ...prevData,
          friends: data.friends,
        }));
      });
    } catch (error) {
      console.error(error);
    }
  };