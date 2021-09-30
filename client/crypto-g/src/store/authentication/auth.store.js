import {makeAutoObservable} from "mobx";
import {POST} from "../requests/request";
import {LOGIN_ROUTE, REGISTER_ROUTE} from "../../serverRouting/switch";
import GlobalStore from "../GlobalStore/global.store";


class AuthStore {

    constructor() {
        makeAutoObservable(this)
    }

    async handleAddCredoLogin(payloadLogin) {
        try {
            console.log(payloadLogin)
            const {data} = await POST( LOGIN_ROUTE, payloadLogin)
            const dataToStringLogin = JSON.stringify(data)
            localStorage.setItem('rememberMe', dataToStringLogin);
            await GlobalStore.addResponseToGlobalStore(data)
        } catch (e) {
            console.log(e)
        }
    }

    async handleAddCredoRegister(payloadRegister) {
        const options = {
            withCredentials: true
        }
        try {
            const {data} = await POST( REGISTER_ROUTE, payloadRegister, options)
            const dataToStringRegister = JSON.stringify(data)
            localStorage.setItem('rememberMe', dataToStringRegister);
            await GlobalStore.addResponseToGlobalStore(data)
        } catch (e) {
            console.log(e)
        }
    }

}
export default new AuthStore()