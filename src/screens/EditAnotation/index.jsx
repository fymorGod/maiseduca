import axios from "axios";
import { useFonts } from "expo-font";
import React, { useContext, useEffect, useState,  useRef, useCallback} from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Tags from "react-native-tags";
import { AppHeader } from "../../components/AppHeader";
import { AuthContext } from "../../context/AuthContext";



export const EditAnotation = ({route}) => {
    const [fontsLoaded] = useFonts({
        Medium: require('../../../assets/fonts/Poppins-Medium.ttf')
    })

    const { userInfo } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState();
    let id = route.params.id;

    const onSubmit = (title) => {
        EditarNota(title)
      };

    const handleOnChangeText = (text, valueFor) => {
        if (valueFor === 'title') setTitle(text);
        if (valueFor === 'taag') setDesc(text);
      };


     useEffect(() => {
         axios.get(`http://192.168.6.20:3010/anotacoes/${id}`)
         .then(res=>{
             setTitle(res.data['anotacao'].descricao);
             setTags(res.data['anotacao'].tags)


         })

       }, [])


       const EditarNota = async() => {
        try {
            const response = await axios
            .put(`https://mais-educacao.herokuapp.com/anotacoes/${id}`, {
                "descricao": title,
                "id_aluno": `${userInfo.user.id}`,
                "array_tags": tags
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <View style={styles.Container}>
        <AppHeader/>
        <View>
            <Text style={{fontFamily: "Medium",
            fontSize: 18,
            color: "#403B91",
            paddingTop: 20,
            paddingLeft: 20,
        }}>Editar anotação</Text>
        </View>
                <TextInput
                style={styles.input}
                value={title}
                placeholder='Title'
                onChangeText={text => handleOnChangeText(text, 'title')}
                />
                <View style={styles.textbox}>
                <Text style={{position:"absolute", fontFamily:"Medium", fontSize: 12, color: '#403B91', paddingTop:1, paddingLeft:20}}>Edite sua tag</Text>
                <Tags
                key={tags}
                initialTags={tags}
                style={{height:150}}
                onChangeTags={tags => setTags(tags)}
                onTagPress={(index, tagLabel, event, deleted) =>
                console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
                }
                containerStyle={{ margin: 10,
                borderRadius: 10,
                backgroundColor: '#FFFFFF',
                justifyContent: 'flex-start', }}
                inputStyle={{  backgroundColor: '#FFFFFF',
                color: '#606060',
                fontWeight: 'bold', }}
                />
                </View>

            <View style={{flexDirection:'row', justifyContent: "space-between", paddingHorizontal: 20}}>
            <Text></Text>
            <TouchableOpacity
            style={styles.button}
            onPress={() => {
                console.log(title);
               onSubmit(title);
            }}
            >

            <Text style={styles.text}>Salvar</Text>
          </TouchableOpacity>


            </View>

    </View>
    )
}

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#EDF2FF'
    },

    input:{
        marginVertical:10,
        marginHorizontal:25,
        paddingLeft:20,
        paddingVertical:20,
        backgroundColor:"white",
        borderRadius: 10,
    },
    button: {
        marginHorizontal: 6,
        width:'45%',
        marginTop: 30,
        paddingVertical: 10,
        borderRadius: 28,
        elevation: 3,
        backgroundColor: "#364FC7",
        },
    text:{
        textAlign:'center',
        color:'white',
    },
    textbox:{
        padding:10
    },

})