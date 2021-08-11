import React from "react";
import {Header} from "../../Components/Header/Header";
import {ModalWindow} from "../../Components/Modal/Modal";
import {observer} from "mobx-react-lite";

export const MainPage = observer(
    () => {
        return (
            <>
                <Header />
                <ModalWindow />
            </>
        )
    }
)