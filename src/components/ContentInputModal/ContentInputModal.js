import React, { useState } from "react";
import { View, TextInput } from "react-native";
import styles from "./ContentInputModal.style"
import Button from "../Button/Button";
import Modal from "react-native-modal";

const ContentInputModal = ({ visible, onClose, onSend, placeholder, buttonText }) => {

    const [text, setText] = useState(null);

    function handleSend() {
        if (!text) {
            return;
        }
        onSend(text);
        setText(null);
    }

    return (
        <Modal
            style={styles.modal}
            isVisible={visible}
            swipeDirection="down"
            onSwipeComplete={onClose}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
        >
            <View style={styles.container}>
                <View style={styles.input_container}>
                    <TextInput
                        placeholder={placeholder}
                        onChangeText={setText}
                        multiline
                    />
                </View>
                <Button text={buttonText} onPress={handleSend} />
            </View>
        </Modal>
    )

}

export default ContentInputModal