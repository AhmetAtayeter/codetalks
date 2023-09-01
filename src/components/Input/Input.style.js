import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
    container: {
        padding: 10,
        margin: 10,
        flexDirection: 'row',
        width: '90%',
        borderBottomWidth: 1,
        borderColor: 'white',
        height: Platform.OS === 'ios' ? 50 : 60
    },
    input:{
        color: 'white',
        fontSize: 17,
        paddingHorizontal: 10
    },
    placeholder: {
        color: 'white'
    }
})