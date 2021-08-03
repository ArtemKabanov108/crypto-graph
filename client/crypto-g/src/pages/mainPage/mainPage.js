import React, {useState} from "react";
import {Header} from "../../Components/Header/Header";
import {ModalWindow} from "../../Components/Modal/Modal";

export const MainPage = () => {
    const [modalActive, setModalActive] = useState(true)
    console.log({modalActive})
    return (
        <>
            <Header
                onActive={setModalActive}
            />
            <ModalWindow
                active={modalActive}
                setActive={setModalActive}
            />
        </>
    )
}