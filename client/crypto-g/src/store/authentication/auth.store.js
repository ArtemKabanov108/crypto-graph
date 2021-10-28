import {makeAutoObservable} from "mobx";
import {POST, PUT} from "../requests/request";
import {LOGIN_ROUTE, LOGOUT_ROUT, REGISTER_ROUTE} from "../../serverRouting/switch";
import GlobalStore from "../GlobalStore/global.store";
import {getLocalStorage, setLocalStorage} from "../../helpers/helpersFoo";


class AuthStore {

    constructor() {
        makeAutoObservable(this)
    }

    async handleAddCredoLogin(payloadLogin) {
        try {
            const {data} = await POST( LOGIN_ROUTE, payloadLogin)
            setLocalStorage(data, 'rememberMe')
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
            setLocalStorage(data, 'rememberMe')
            await GlobalStore.addResponseToGlobalStore(data)
        } catch (e) {
            console.log(e)
        }
    }

    async handleLogOutUser() {
        try {
            const jwtAccessFromLocalStorage = getLocalStorage('rememberMe')
            const res = await PUT(LOGOUT_ROUT, jwtAccessFromLocalStorage)
            if (res.status === 200) {
                localStorage.clear()
                GlobalStore.clearGlobalStore()
                // window.location.reload()
            }
        } catch (err) {
            console.log(err)
        }
    }

}
export default new AuthStore()