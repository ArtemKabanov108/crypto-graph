import React, {useState} from "react";
import {Glassbtn} from "../common/Buttons/Glassbutton";
import {Logo} from "../common/Logo/Logo";
import {BtnCtnr, HeaderContainer} from "./header.style";
import {colors} from "../../styles-common/common.style";
import {ModalWindow} from "../Modal/Modal";
import {LoginForm} from "../Forms/LoginForm/LoginForm";

export const Header = () => {

    const [toggleState, setToggle] = useState(false)

    const handleOpenModal = () => {
        setToggle(true)
    }
    const handleCloseModal = () => {
        setToggle(false)
    }
    return (
        <HeaderContainer>
            <Logo />
            <BtnCtnr>
                <Glassbtn
                    background={colors.transparentBackgroundZero}
                    text={'LogIn'}
                    handleClick={handleOpenModal}
                    fontSize={'1.2'}
                />
            </BtnCtnr>
            <ModalWindow
                toggle={toggleState}
                closeModal={handleCloseModal}
                children={<LoginForm/>}
            />
        </HeaderContainer>
    )
}