import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, Text, View } from "react-native";
import styles from "./Messages.style"
import FloatingButton from "../../components/FloatingButton/FloatingButton";
import ContentInputModal from "../../components/ContentInputModal/ContentInputModal";
import database from "@react-native-firebase/database"
import auth from "@react-native-firebase/auth"
import parseContentData from "../../utils/parseContentData";
import MessageCard from "../../components/MessageCard/MessageCard";

const Messages = ({ route, navigation }) => {

    const [inputModalVisible, setInputModalVisible] = React.useState(false)
    const [contentList, setContentList] = useState([])

    const { room } = route.params

    useEffect(() => {
        database()
            .ref(`messages/${room}`)
            .on('value',snapshot => {
                const contentData = snapshot.val();

                const parsedData = parseContentData(contentData || {})
                setContentList(parsedData)
            })
    },[])

    useEffect(() => {
        navigation.setOptions({ headerTitle: room })
    }, [navigation])

    function handleInputToggle() {
        setInputModalVisible(!inputModalVisible)
    }

    function handleInputToggle(){
        setInputModalVisible(!inputModalVisible)
    }

    function handleSendContent(content){
        handleInputToggle()
        sendContent(content)
    }

    function sendContent(content){
        const userMail = auth().currentUser.email
        
        const contentObject = {
            room: room,
            text: content,
            username: userMail.split('@')[0],
            date: new Date().toISOString(),
            dislike: 0
        }

        database().ref(`messages/${room}`).push(contentObject)
    }

    const renderContent = ({item}) => <MessageCard message={item} />

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.title_container}>
                <Text style={styles.text}>{room} odası kuruldu</Text>
            </View>
            <FlatList
                data={contentList}
                renderItem={renderContent}
                />
            <FloatingButton icon="plus" onPress={handleInputToggle} />
            <ContentInputModal
                visible={inputModalVisible}
                onClose={handleInputToggle}
                onSend={handleSendContent}
                placeholder="Mesajın..."
                buttonText="Gönder"
            />
        </SafeAreaView>
    )

}

export default Messages