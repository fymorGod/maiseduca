import React, { useEffect }  from "react";
import { TouchableWithoutFeedback, Keyboard} from "react-native";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useForm, Controller } from 'react-hook-form';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type FormData = {
    matricula: string;
    password: string;
}

export type NavigationProps = {
    Home: {
        name: string 
    }
    Login: undefined
} 


export const Login = ({ navigation }) => {
    const { control, handleSubmit, formState: {errors}} = useForm<FormData>();

    useEffect(()=> {
        console.log('Email errors: ', errors?.matricula)
        },
     [errors?.matricula]
    );

    const onSubmit = (data: FormData) => {
        // console.log(data.matricula)
        // console.log(data.password)
        navigation.navigate('home')
    }
    return (
        <View style={styles.Container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <>
                <Image source={require('../../../assets/logo.png')} style={styles.image}/>
                <View style={styles.wrapper}>
                    <Controller
                            control={control}
                            name="matricula"
                            rules={{
                                required: "Email obrigatório"
                            }}
                            render={({ field: { value, onChange}}) => (
                                <TextInput
                                value={value}
                                style={styles.Input}
                                placeholder="matricula"
                                onChangeText={onChange}
                                autoCapitalize="none"
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: "Senha obrigatória"
                            }}
                            render={({ field: { value, onChange}}) => (
                                <TextInput
                                value={value}
                                style={styles.Input}
                                placeholder="Senha"
                                secureTextEntry
                                onChangeText={onChange}/>
                            )}
                        />
                </View>
                    <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                        <Text style={styles.text}>Entrar</Text>
                    </TouchableOpacity>

                <View style={styles.footer}>
                    <TouchableOpacity >
                        <Text style={styles.smallText}>Esqueci a senha.</Text>
                    </TouchableOpacity>
            </View>
              </>
            </TouchableWithoutFeedback>
        </View>
    );
}
export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4263EB'
    },
    wrapper: { 
        width: '80%',
    },
    Input: {
        width: '100%',
        height: 50,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 8,
        paddingHorizontal: 14,
        backgroundColor: '#fff'
    },
    text: {
        color: "#fff",
    },
    smallText: {
        color: "#fff",
        marginTop: 10
    },
    image: {
        marginBottom: 20,
        marginTop: 20
    },
    button: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#364FC7',
      },
    footer: {
        justifyContent: 'center',
        flexDirection: 'row',
    }
})