import {makeAutoObservable} from "mobx";

class ModalStore {

    //Login/Registration store
    toggleState = false;
    //--------------------------

    constructor() {
        makeAutoObservable(this)
    }

    openModal = () => {
        this.toggleState = true
    }

    closeModal = () => {
        this.toggleState = false
    }

}

export default new ModalStore()