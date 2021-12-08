import {makeAutoObservable} from "mobx";
import {GET, POST} from "../requests/request";
import {ACCESS_ROUTE, REFRESH_TOKEN_ROUT} from "../../serverRouting/switch";
import GlobalStore from "../GlobalStore/global.store"
import {getLocalStorage, setLocalStorage} from "../../helpers/helpersFoo";

class JwtCheckingStore {

    constructor() {
        makeAutoObservable(this)
    }

    async reauthorise(payloadJwtCatch) {
        try {
            const {data} = await GET( REFRESH_TOKEN_ROUT, payloadJwtCatch.jwt)
            const resReauthorise = await POST( ACCESS_ROUTE, data, data)
            setLocalStorage({nickName: resReauthorise.data.nickName, jwt: resReauthorise.data.jwt}, 'rememberMe')
            await GlobalStore.addResponseToGlobalStore({nickName: resReauthorise.data.nickName, jwt: resReauthorise.data.jwt})
        } catch (err) {
            console.log(err)
        }
    }

    async addResponseToJwtCheckingStore() {
        try {
            const {jwt} = getLocalStorage('rememberMe')
            if (jwt) {
                const res = await POST( ACCESS_ROUTE, {jwt}, {jwt})

                if(res === undefined) await this.reauthorise(jwt)

                if(res.data?.jwt) await GlobalStore.addResponseToGlobalStore({nickName: res.data.nickName, jwt: res.data.jwt})
            }
        } catch (err) {
            console.log(err)
        }
    }

}

export default new JwtCheckingStore()