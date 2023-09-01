import React, { useState } from "react";
import { Text, SafeAreaView } from "react-native";
import styles from "./Login.style"
import { Formik } from "formik";
import Input from "../../components/Input";
import Button from "../../components/Button";
import auth from "@react-native-firebase/auth"
import authErrorMessageParser from "../../utils/authErrorMessageParser";
import { showMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";

const initialFormValues = {
    usermail: '',
    password: ''
}

const Login = ({ navigation }) => {
    const [loading, setLoading] = useState(false)

    function handleSignUp() {
        navigation.navigate('Sign')
    }

    async function handleFormSubmit(formValues) {
        try {
            setLoading(true)
            if (formValues.usermail === '') {
                showMessage({
                    message: "Mail boş girilemez",
                    type: 'danger'
                })
                setLoading(false)
                return
            }
            if (formValues.password === '') {
                showMessage({
                    message: "Şifre boş girilemez",
                    type: 'danger'
                })
                setLoading(false)
                return
            }
            await auth().signInWithEmailAndPassword(
                formValues.usermail,
                formValues.password
            );
            navigation.navigate("Rooms")
            setLoading(false)
        }
        catch (error) {
            showMessage({
                message: authErrorMessageParser(error.code),
                type: 'danger'
            })
            setLoading(false)
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <FlashMessage position="top" />
            <Text style={styles.text}>codetalks</Text>
            <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
                {({ values, handleChange, handleSubmit }) => (
                    <>
                        <Input
                            onType={handleChange('usermail')}
                            value={values.usermail}
                            placeholder="e-postanızı giriniz.."
                        />
                        <Input
                            onType={handleChange('password')}
                            value={values.password}
                            placeholder="şifrenizi giriniz.."
                            isSecure={true}
                        />
                        <Button text="Giriş Yap" onPress={handleSubmit} loading={loading} />
                    </>
                )}
            </Formik>
            <Button text="Kayıt Ol" theme="secondary" onPress={handleSignUp} loading={loading} />
        </SafeAreaView>
    )
}

export default Login