import axios from "axios";
import {SERVER_URL} from "../../serverRouting/switch";
//!Attention, this URL need for deployment to Heroku.
// const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

export const POST = async (route, payloadRequest, options) => {
    try{
        return await axios.post(`${SERVER_URL}${route}`, payloadRequest, {
            withCredentials: true,
            headers: {authorization: options?.jwt
            }})
    } catch (err) {
        console.error(err)
    }
}

export const GET = async (route, payloadForConfigGET) => {
    try{
        return await axios.get(`${SERVER_URL}${route}`, {
            withCredentials: true,
            headers: {
                authorization: payloadForConfigGET?.jwt,
                body: {
                    vs_currency: "usd",
                    from: new Date().getDate() - 1,
                    to: Date.now()
                }
            }
        })
    } catch (err) {
        console.error(err)
    }
}


export const PUT = async (route, options) => {
    try {
        return await axios.put(`${SERVER_URL}${route}`, {}, {
            withCredentials: true,
            headers: {authorization: options?.jwt
            }})
    } catch (err) {
        console.error(err)
    }
}