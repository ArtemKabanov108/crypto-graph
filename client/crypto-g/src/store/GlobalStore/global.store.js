import {makeAutoObservable} from "mobx";

class GlobalStore {

    //Login/Registration store
    globalStorageForAuth = {};
    //--------------------------

    constructor() {
        makeAutoObservable(this)
    }

    async addResponseToGlobalStore(payloadAuth) {
        try {
            const {nickName, jwt} = payloadAuth
            this.globalStorageForAuth = {nickName, jwt}
        } catch (e) {
            console.log(e)
        }
    }

}

export default new GlobalStore()