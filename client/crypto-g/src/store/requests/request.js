import axios from "axios";
import {SERVER_DEV_URL} from "../../serverRouting/switch";
//!Attention, this URL need for deployment to Heroku.
// const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

export const POST = async (route, payloadRequest, options) => {
    try{
        return await axios.post(`${SERVER_DEV_URL}${route}`, payloadRequest, {
            withCredentials: true,
            headers: {authorization: options?.jwt
            }})
    } catch (err) {
        console.error(err)
    }
}

export const GET = async (route, payloadForConfigGET) => {
    try{
        return await axios.get(`${SERVER_DEV_URL}${route}`, {
            withCredentials: true,
            headers: {
                authorization: payloadForConfigGET?.jwt,
            }
        })
    } catch (err) {
        console.error(err)
    }
}


export const PUT = async (route, options) => {
    try {
        return await axios.put(`${SERVER_DEV_URL}${route}`, {}, {
            withCredentials: true,
            headers: {authorization: options?.jwt
            }})
    } catch (err) {
        console.error(err)
    }
}

export const DELETE = async  (route, deletePayload, options) => {
    try {
        return await axios.delete(`${SERVER_DEV_URL}${route}`, {
            withCredentials: true,
            headers: {
                authorization: options?.jwt,
            },
            data: deletePayload,
        })
    } catch (err) {
        console.error(err)
    }
}