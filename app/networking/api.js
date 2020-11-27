import { Constants } from '../constants'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export default class API {
    async setToken(token) {
        try {
            await AsyncStorage.setItem('token', token)
        }
        catch (error) {
            console.log(error);
        }
    }

    async getToken() {
        try {
            let token = await AsyncStorage.getItem('token')
            return token
        }
        catch (error) {
            console.log(error);
        }
    }

    async signUp(data) {
        try {
            let response = axios.post(
                Constants.baseUrl + '/api/auth/sign-up',
                data
            )
                .then((res) => {
                    return res
                })
                .catch((error) => {
                    return error.response
                })
            return response
        }
        catch (error) {
            console.log(error);
        }
    }

    async emailConfirmation(data, token) {
        try {
            let response = axios.post(
                Constants.baseUrl + '/api/auth/email-confirmation',
                data,
                {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                }
            )
                .then((res) => {
                    return res
                })
                .catch((error) => {
                    return error.response
                })
            return response
        }
        catch (error) {
            console.log(error);
        }
    }

    async getUser(token) {
        try {
            let response = axios.get(
                Constants.baseUrl + '/api/users/getInfo',
                {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                }
            )
                .then((res) => {
                    return res
                })
                .catch((error) => {
                    return error.response
                })
            return response
        }
        catch (error) {
            console.log(error);
        }
    }

    async signIn(data) {
        try {
            let response = axios.post(
                Constants.baseUrl + '/api/auth/sign-in',
                data
            )
                .then((res) => {
                    return res
                })
                .catch((error) => {
                    return error.response
                })
            return response
        }
        catch (error) {
            console.log(error);
        }
    }

    async resendCode(token) {
        try {
            let response = axios.get(
                Constants.baseUrl + '/api/auth/resend-code',
                {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                }
            )
                .then((res) => {
                    return res
                })
                .catch((error) => {
                    return error.response
                })
            return response
        }
        catch (error) {
            console.log(error);
        }
    }

    async forgotPassword(email) {
        try {
            let response = axios.get(
                Constants.baseUrl + '/api/auth/password-recovery?email=' + email,
            )
                .then((res) => {
                    return res
                })
                .catch((error) => {
                    return error.response
                })
            return response
        }
        catch (error) {
            console.log(error);
        }
    }

    async sendForgotCode(data) {
        try {
            let response = axios.post(
                Constants.baseUrl + '/api/auth/confirm-recovery-code',
                data
            )
                .then((res) => {
                    return res
                })
                .catch((error) => {
                    return error.response
                })
            return response
        }
        catch (error) {
            console.log(error);
        }
    }

    async sendNewPassword(token, newPassword) {
        try {
            let response = axios.post(
                Constants.baseUrl + '/api/auth/renew-password',
                {
                    newPassword: newPassword
                },
                {
                    headers: {
                        'recovery_token': token
                    }
                }
            )
                .then((res) => {
                    return res
                })
                .catch((error) => {
                    return error.response
                })
            return response
        }
        catch (error) {
            console.log(error);
        }
    }
}