import React from "react";
import {Modal, ModalContent} from "./modal.style";


export const ModalWindow = ({active, setActive}) => {
    return (
        <Modal
            onClick={() => setActive(false)}
            active={active}
        >
           <ModalContent
               onClick={e => e.stopPropagation()}
               active={active}
           >

           </ModalContent>
        </Modal>
    )
}