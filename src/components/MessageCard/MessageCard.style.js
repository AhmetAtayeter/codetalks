import { StyleSheet,Dimensions } from "react-native";

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width 

export default StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        margin: 10,
        borderRadius: 10,
        padding: 5,
        height: height / 13,
        width: width / 1.1,
        // width: "200%"
        justifyContent: 'space-between',
    },
    inner_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // width: "63%"
    },
    user: {
        color: 'black',
        fontSize: 12
    },
    date: {
        color: 'black',
        fontStyle: 'italic',
        fontSize: 12
    },
    title: {
        color: 'black',
        fontSize: 16,
        fontWeight: "bold"
    }
})