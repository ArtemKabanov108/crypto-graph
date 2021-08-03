import React from "react";
import {Glassbtn} from "../common/Buttons/Glassbutton";
import {Logo} from "../common/Logo/Logo";
import {BtnCtnr, HeaderContainer} from "./header.style";

export const Header = ({onActive: handleOpenModal}) => {
    return (
        <HeaderContainer>
            <Logo />
            <BtnCtnr>
                <Glassbtn
                    text={'LogIn'}
                    onClick={ () => handleOpenModal(true)}
                />
            </BtnCtnr>
        </HeaderContainer>
    )
}