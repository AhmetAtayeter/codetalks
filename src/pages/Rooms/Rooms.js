import React, { useState,useEffect } from "react";
import { SafeAreaView } from "react-native";
import FloatingButton from "../../components/FloatingButton";
import RoomCard from "../../components/RoomCard";
import styles from "./Rooms.style"
import ContentInputModal from "../../components/ContentInputModal/ContentInputModal";
import database from "@react-native-firebase/database"
import parseContentData from "../../utils/parseContentData";
import { FlatList } from "react-native-gesture-handler";

const Rooms = ({navigation}) => {
    const [inputModalVisible, setInputModalVisible] = useState(false)
    const [roomsList, setRoomsList] = useState([])

    useEffect(() => {
        database()
            .ref('Rooms/')
            .on('value',snapshot => {
                const contentData = snapshot.val();
                setRoomsList(contentData)
            })
    }, [])

    function handleInputToggle() {
        setInputModalVisible(!inputModalVisible)
    }
    function handleSendContent(content){
        handleInputToggle()
        sendContent(content)
    }
    function sendContent(content){
        const length = roomsList.length
        const contentObject = {
            name: content
        }
        database().ref('Rooms').child(length.toString()).set(contentObject)

    }

    function onPress(name){
        navigation.navigate('Messages',{room: name})
    }

    const renderContent = ({item}) => <RoomCard 
                                        name={item.name} 
                                        onPress={() => {
                                            navigation.navigate('Messages',{room: item.name})
                                        }} />

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={roomsList}
                renderItem={renderContent}
                style={styles.list}
                numColumns={"2"}
                contentContainerStyle={{flexGrow: 1, alignItems: "center"}}
            />

            <FloatingButton icon="plus" onPress={handleInputToggle} />
            <ContentInputModal
                visible={inputModalVisible}
                onClose={handleInputToggle}
                onSend={handleSendContent}
                placeholder="Oda adı..."
                buttonText="Ekle"
            />
        </SafeAreaView>
    )
}

export default Rooms