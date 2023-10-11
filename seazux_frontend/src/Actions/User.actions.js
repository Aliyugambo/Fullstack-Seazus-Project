import axios from 'axios';

import { backendUrl } from '../utils/util';

export const registerUserEmail = ({username, email, password}) => async (dispatch) => {

    try {

        dispatch({
            type: 'RegisterRequest'
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: 'true'
        }


        const { data } = await axios.post(`${backendUrl}/auth-email/register`, {username, email, password}, config);

        dispatch({
            type: 'RegisterSuccess',
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: 'RegisterFailure',
            payload: error.response.data.message
        })
    }
}

export const loginUserEmail = ({email, password}) => async (dispatch) => {
        try {
    
            dispatch({
                type: 'LoginRequest'
            })
    
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: 'true'
            }
    
            const { data } = await axios.post(`${backendUrl}/auth-email/login`, {email, password}, config);
    
            dispatch({
                type: 'LoginSuccess',
                payload: data
            })
            
        } catch (error) {
            dispatch({
                type: 'LoginFailure',
                payload: error.response.data.message
            })
        }
}

export const loagout = () => async (dispatch) => {
    try {

        dispatch({
            type: 'LogoutRequest'
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: 'true'
        }

        const { data } = await axios.get(`${backendUrl}/auth-email/logout`, config);

        dispatch({
            type: 'LogoutSuccess',
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: 'LogoutFailure',
            payload: error.response.data.message
        })
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: 'LoadUserRequest'
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: 'true'
        }

        const { data } = await axios.get(`${backendUrl}/api/v1/user/profile`, config);

        dispatch({
            type: 'LoadUserSuccess',
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: 'LoadUserFailure',
            // payload: error.response.data.message
        })
    }
}

export const deleteAccount = () => async (dispatch) => {
    try {
        dispatch({
            type: 'DeleteAccountRequest'
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: 'true'
        }

        const { data } = await axios.delete(`${backendUrl}/auth-email/user/deleteAccount`, config);

        dispatch({
            type: 'DeleteAccountSuccess',
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: 'DeleteAccountFailure',
            payload: error.response.data.message
        })
    }
}
