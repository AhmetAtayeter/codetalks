import React, { useState } from "react";
import { SafeAreaView, Text } from "react-native";
import styles from './Sign.style'
import { Formik } from "formik";
import Input from "../../components/Input";
import Button from "../../components/Button";
import auth from "@react-native-firebase/auth"
import authErrorMessageParser from "../../utils/authErrorMessageParser";
import { showMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";

const initialFormValues = {
    usermail: '',
    password: '',
    repassword: ''
}

const Sign = ({ navigation }) => {
    const [loading, setLoading] = useState(false)

    function handleLogin() {
        navigation.goBack()
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
            if (formValues.repassword === '') {
                showMessage({
                    message: "Şifre tekrarı boş girilemez",
                    type: 'danger'
                })
                setLoading(false)
                return
            }
            if (formValues.password !== formValues.repassword) {
                showMessage({
                    message: "Şifreler uyuşmuyor",
                    type: "danger"
                })
                return;
            }

            await auth().createUserWithEmailAndPassword(
                formValues.usermail,
                formValues.password
            )
            showMessage({
                message: "Kullanıcı oluşturuldu",
                type: "success"
            })
            navigation.navigate("Login")
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
                            placeholder={"e-postanızı giriniz.."}
                            value={values.usermail}
                            onType={handleChange('usermail')}
                        />
                        <Input
                            placeholder={"şifrenizi giriniz.."}
                            value={values.password}
                            onType={handleChange('password')}
                            isSecure={true}
                        />
                        <Input
                            placeholder={"şifrenizi tekrar giriniz.."}
                            value={values.repassword}
                            onType={handleChange('repassword')}
                            isSecure={true}
                        />
                        <Button text="Kayıt Ol" loading={loading} onPress={handleSubmit} />
                    </>
                )}
            </Formik>
            <Button text="Geri" theme="secondary" onPress={handleLogin} loading={loading} />
        </SafeAreaView>
    )
}

export default Sign