import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useForm, Controller } from 'react-hook-form';

type FormData = {
    matricula: string;
    password: string;
}

export const Form = () => {
    const { control, handleSubmit } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
    }
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/logo.png')} style={styles.image}/>
            <View style={styles.wrapper}>
                <Controller
                    name="matricula"
                    control={control}
                    render={({ field: { value, onChange}}) => (
                        <TextInput
                        value={value}
                        style={styles.Input}
                        placeholder="matricula"
                        onChangeText={onChange}/>
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    render={({ field: { value, onChange}}) => (
                        <TextInput
                        value={value}
                        style={styles.Input}
                        placeholder="Senha"
                        secureTextEntry
                        onChangeText={onChange}/>
                    )}
                />
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.text}>Entrar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.smallText}>Esqueci a senha.</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        paddingHorizontal: 0,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#364FC7',
      },
    footer: {
        flexDirection: 'row',
    }
})