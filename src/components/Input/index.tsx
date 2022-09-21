import React from "react";

import { Feather } from "@expo/vector-icons";
import { Icon, IInputProps, Input as DefaultInput } from 'native-base';


type InputProps = IInputProps & {
    icon: string;
}

export const Input = ({ icon, ...rest}: InputProps) => {
    return (
        <DefaultInput 
            InputLeftElement={<Icon as={Feather} name={icon} size="lg" marginLeft={4} color="gray.500"/>}
            backgroundColor="primary.400"
            borderWidth="0"
            height="12"
            fontSize="lg"
            placeholderTextColor="gray.500"
            color="gray.200"
            {...rest}
        />
    )
}
