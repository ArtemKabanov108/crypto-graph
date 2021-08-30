import axios from "axios";
import {SERVER_URL} from "../../variable.environment"

export const post = async (route, payloadRequest) => {
    console.log(payloadRequest)
    try{
        const {data: {jwt, email}} = await axios.post(`${SERVER_URL}${route}`, payloadRequest)
        console.log(await axios.post(`${SERVER_URL}${route}`, payloadRequest))
        return {jwt, email}
    } catch (err) {
        console.log(err)
    }
}