import React from "react";
import styles from "./RoomCard.style"
import { TouchableOpacity, Text } from "react-native";

const RoomCard = ({name, onPress}) => {
    return(
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.text}>{name}</Text>
        </TouchableOpacity>
    )
}

export default RoomCard