// TODO add class for cryptoApi
import {makeAutoObservable} from "mobx";
import {GET} from "../requests/request";
import {ACCESS_ROUTE} from "../../variable.environment";

class JwtCheckingStore {

    //Login/Registration store
    serverResponseJWT = {};
    //--------------------------

    constructor() {
        makeAutoObservable(this)
    }

    async addResponseToJwtCheckingStore(payloadRegister) {
        try {
            const {data} = await GET( ACCESS_ROUTE, payloadRegister)
            this.serverResponseJWT = {data}
        } catch (e) {
            console.log(e)
        }
    }

}

export default new JwtCheckingStore()