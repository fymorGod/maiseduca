import {
    getDatabase,
    get,
    ref,
  } from 'firebase/database';

export const findUser = async name => {
    const database = getDatabase();

    const mySnapshot = await get(ref(database, `users/${name}`));

    return mySnapshot.val();
  };