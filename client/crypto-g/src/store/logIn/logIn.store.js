import {makeAutoObservable} from "mobx";
import {post} from "../requests/request"
import {LOGIN_ROUTE} from "../../variable.environment"

class LogInStore {

    serverResponse = {}

    constructor() {
        makeAutoObservable(this)
    }

    async handleAddCredoLogin(payload) {
        try {
            this.serverResponse = await post( LOGIN_ROUTE, payload)
        } catch (e) {
            console.log(e)
        }

    }

}
export default new LogInStore()

