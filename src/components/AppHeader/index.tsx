import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, StyleSheet, Text, Image} from 'react-native';
import { Surface } from "react-native-paper";
import  Icon  from 'react-native-vector-icons/FontAwesome5';
import  Icon2  from 'react-native-vector-icons/MaterialIcons';

export const AppHeader = () => {
    return (
        <Surface style={styles.header}>
            <View style={styles.boxLogo}>
                <Image style={styles.logo} resizeMode='contain' source={require('../../../assets/logo.png')} />
            </View>
            <View style={styles.icon}> 
                <Icon2
                        name='notifications-none'
                        size={25}
                        color='#fff'
                        style={{marginRight:10}}
                    />
                <Icon2
                    name='person'
                    size={25}
                    color='#fff'
                />
            </View>
        </Surface>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingTop:20,
        height: 100,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#4263EB',
    },
    view: {
        flex: 1,
        margin: 10
    },
    logo: {
        width: 120,
    },
    boxLogo:{
        marginLeft: 10,
    },
    icon:{
        marginRight:10,
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
})