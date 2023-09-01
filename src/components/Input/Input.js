import React from "react";
import { SafeAreaView, TextInput } from "react-native";
import styles from "./Input.style"

const Input = ({placeholder, value, onType, isSecure}) => {
    return(
        <SafeAreaView style={styles.container}>
            <TextInput 
                autoCapitalize="none"
                placeholder={placeholder}
                style={styles.input}
                value={value}
                onChangeText={onType}
                secureTextEntry={isSecure}
                placeholderTextColor= {styles.placeholder.color}
            />
        </SafeAreaView>
    )
}

export default Input