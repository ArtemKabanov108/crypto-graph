import {makeAutoObservable} from "mobx";

class ModalToggle {
    toggle = false;
    constructor() {
        makeAutoObservable(this)
    }

    handleOpenModal() {
        ModalToggle.toggle = true
        console.log("ModalToggle", ModalToggle.toggle)
    }
    handleCloseModal() {
        this.toggle = false
    }
}

export default new ModalToggle()