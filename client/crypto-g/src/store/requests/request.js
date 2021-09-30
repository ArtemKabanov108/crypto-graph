import axios from "axios";
import {SERVER_URL} from "../../serverRouting/switch";

export const POST = async (route, payloadRequest, options) => {
    try{
        return await axios.post(`${SERVER_URL}${route}`, payloadRequest, {
            withCredentials: true,
            headers: {authorization: options?.jwt
        }})
    } catch (err) {
        console.log(err)
    }
}

export const GET = async (route, payloadForConfigGET) => {
    try{
        return await axios.get(`${SERVER_URL}${route}`, {
            withCredentials: true,
            headers: {authorization: payloadForConfigGET?.jwt
            }
        })

    } catch (err) {
        console.log(err)
    }
}