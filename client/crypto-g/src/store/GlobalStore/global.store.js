import {makeAutoObservable} from "mobx";
import {POST} from "../requests/request";
import {REGISTER_ROUTE} from "../../variable.environment";

class GlobalStore {

    //Login/Registration store
    serverResponse = {};
    //--------------------------

    constructor() {
        makeAutoObservable(this)
    }

    async addResponseToGlobalStore(payloadRegister) {
        try {
            const {data} = await POST( REGISTER_ROUTE, payloadRegister)
            this.serverResponse = {data}
        } catch (e) {
            console.log(e)
        }
    }

}

export default new GlobalStore()