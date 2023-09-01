import { StyleSheet } from "react-native";

const base_style = StyleSheet.create({
    container: {
        padding: 10,
        margin: 10,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#F8A040',
        width: '90%'
    },
    button_container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 17,
        color: 'white'
    }
})

export default StyleSheet.create({
    primary: {
        ...base_style,
        container: {
            ...base_style.container,
            backgroundColor: '#F8A040'
        },
        title: {
            ...base_style.title,
            color: 'white'
        }
    },
    secondary: {
        ...base_style,
        container:{
            ...base_style.container,
            backgroundColor: 'white'
        },
        title: {
            ...base_style.title,
            color: '#F8A040'
        }
    }
})