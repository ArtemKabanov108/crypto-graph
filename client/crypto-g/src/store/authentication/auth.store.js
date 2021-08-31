import {makeAutoObservable} from "mobx";
import {POST} from "../requests/request"
import {LOGIN_ROUTE} from "../../variable.environment"
import {REGISTER_ROUTE} from "../../variable.environment";

class AuthStore {

    serverResponse = {}

    constructor() {
        makeAutoObservable(this)
    }

    async handleAddCredoLogin(payloadLogin) {
        try {
            console.log(payloadLogin)
            const {data} = await POST( LOGIN_ROUTE, payloadLogin)
            console.log({data})
            const dataToStringLogin = JSON.stringify(data)
            localStorage.setItem('rememberMe', dataToStringLogin);
            this.serverResponse = data
        } catch (e) {
            console.log(e)
        }
    }

    async handleAddCredoRegister(payloadRegister) {
        try {
            const {data} = await POST( REGISTER_ROUTE, payloadRegister)
            console.log(data)
            const dataToStringRegister = JSON.stringify(data)
            localStorage.setItem('rememberMe', dataToStringRegister);
            this.serverResponse = data

        } catch (e) {
            console.log(e)
        }
    }

}
export default new AuthStore()