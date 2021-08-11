import React from "react";
import {Glassbtn} from "../common/Buttons/Glassbutton";
import {Logo} from "../common/Logo/Logo";
import {BtnCtnr, HeaderContainer} from "./header.style";
import {colors} from "../../styles-common/common.style";
import modalToggle from '../../store-states/modal-store/modal.store'

export const Header = () => {
    return (
        <HeaderContainer>
            <Logo />
            <BtnCtnr>
                <Glassbtn
                    background={colors.transparentBackgroundZero}
                    text={'LogIn'}
                    handleClick={modalToggle.handleOpenModal}
                    fontSize={'1.2'}
                />
            </BtnCtnr>
        </HeaderContainer>
    )
}