import axios from "axios";
import {SERVER_URL} from "../../variable.environment"

export const POST = async (route, payloadRequest) => {
    try{
        return await axios.post(`${SERVER_URL}${route}`, payloadRequest)
    } catch (err) {
        console.log(err)
    }
}

export const GET = async (route, payloadRequest) => {
    try{
        return await axios.get(`${SERVER_URL}${route}`, payloadRequest)
    } catch (err) {
        console.log(err)
    }
}