// TODO add class for cryptoApi
import {makeAutoObservable} from "mobx";

class RegistrationStore {


    constructor() {

        this.credoRegister = {
            nickname: '',
            email: '',
            password: ''
        };

        makeAutoObservable(this)
    }

    handleAddCredoLogin(payload) {
        this.credoRegister = payload
        console.log("RegistrationStore", this.credoRegister)
    }

}

export default new RegistrationStore()