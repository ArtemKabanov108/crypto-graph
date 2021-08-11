import React from "react";
import {Modal, ModalContent} from "./modal.style";
import {LoginForm} from "../Forms/LoginForm/LoginForm";
import {observer} from "mobx-react-lite";
import modalToggle from '../../store-states/modal-store/modal.store'


export const ModalWindow = observer(
    () => {
        console.log("ModalWindow", modalToggle.toggle)
        return (
            <Modal
                onClick={() => modalToggle.handleCloseModal}
                active={modalToggle.toggle}
            >
                <ModalContent
                    onClick={e => e.stopPropagation()}
                    active={modalToggle.toggle}
                >
                    <LoginForm/>
                </ModalContent>
            </Modal>
        )
    }
)