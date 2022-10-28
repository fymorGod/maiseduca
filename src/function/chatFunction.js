import React, {useState} from 'react';
import { onAddFriend } from './onAddFriend';
import { onClickUser } from './onClickUser';
import { onLogin } from './onLogin';
import { AuthContext } from "../context/AuthContext";



export function ChatFunction(idProfessor) {
    const [users, setUsers] = useState([]);
    const [userToAdd, setUserToAdd] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [myData, setMyData] = useState(null);
    const { userInfo } = useContext(AuthContext);
    const name = userInfo.user.name;
    const idAluno = userInfo.user.id;

    onLogin(setMyData, name, setUsers, idAluno);
    onAddFriend(myData, idProfessor);
    
}