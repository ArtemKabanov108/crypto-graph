import {makeAutoObservable, toJS} from "mobx";

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
            toJS(this.globalStorageForAuth)
        } catch (err) {
            console.log(err)
        }
    }

     clearGlobalStore() {
        this.globalStorageForAuth = {}
    }

}

export default new GlobalStore()