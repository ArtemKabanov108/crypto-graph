import React from "react";
import {Modal, ModalContent} from "./modal.style";


export const ModalWindow = ({children, toggle, closeModal}) => {
        console.log("ModalWindow", toggle)
        return (
            <Modal
                onClick={() => closeModal()}
                active={toggle}
            >
                <ModalContent
                    onClick={e => e.stopPropagation()}
                    active={toggle}
                >
                    {children}
                </ModalContent>
            </Modal>
        )
    }