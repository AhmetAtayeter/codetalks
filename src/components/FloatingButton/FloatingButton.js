import React from "react";
import { TouchableOpacity } from "react-native";
import styles from "./FloatingButton.style"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const FloatingButton = ({onPress, icon}) => {
    return(
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Icon name={icon} color="white" size={30} />
        </TouchableOpacity>
    )
}

export default FloatingButton