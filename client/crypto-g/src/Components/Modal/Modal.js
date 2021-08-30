import React from "react";
import {Modal, ModalContent} from "./modal.style";
import {observer} from "mobx-react-lite";

export const ModalWindow = observer(
    ({children, toggle, closeModal}) => {
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
)