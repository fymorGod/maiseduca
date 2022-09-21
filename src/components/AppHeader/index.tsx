import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { Surface } from "react-native-paper";

export const AppHeader = () => {
    return (
        <Surface style={styles.header}>
            <View>
                <TouchableOpacity>
                    <Feather name='menu' size={24} color="white"/>
                </TouchableOpacity>
            </View>
            <View>
                <Text>Salve</Text>
            </View>
            <View>

            </View>
        </Surface>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 50,
        elevation: 2,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#4263EB'
    },
    view: {
        flex: 1,
        backgroundColor: 'red',
        margin: 10
    }
})