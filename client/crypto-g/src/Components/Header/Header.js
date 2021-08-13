import React, {useState} from "react";
import {Glassbtn} from "../common/Buttons/Glassbutton/Glassbutton";
import {Logo} from "../common/Logo/Logo";
import {BtnCtnr, HeaderContainer} from "./header.style";
import {colors} from "../../styles-common/common.style";
import {ModalWindow} from "../Modal/Modal";
import {ToggleFormTemplate} from "../ToggleFormTemplate/ToggleFormTemplate";
import {structureMenu} from "./structureMenu"
import {ButtonsGroup} from "../common/Buttons/ButtonsGrup/ButtonsGroup";

export const Header = () => {

    const [toggleState, setToggle] = useState(false)
    const [tabStepper, setTab] = useState(1)
    const [registerUser, setUserRegister] = useState({
        nickname: 'bdfb',
        avatar: false,
    })

    const handleOpenModal = () => {
        setToggle(true)
    }

    const handleCloseModal = () => {
        setToggle(false)
    }

    const handleMenuClick = (labelBtn) => {
        setTab(labelBtn)
    }

    return (
        <HeaderContainer>
            <Logo/>
            <BtnCtnr>
                {(!registerUser.nickname.length) ?
                    (
                        <>
                            <Glassbtn
                                background={colors.transparentBackgroundZero}
                                text={'LogIn / Registration'}
                                handleClick={handleOpenModal}
                                fontSize={'1.2'}
                            />
                            <ModalWindow
                                toggle={toggleState}
                                closeModal={handleCloseModal}
                                children={<ToggleFormTemplate/>}
                            />
                        </>
                    ) :
                    (<ButtonsGroup
                            structure={structureMenu}
                            menuClick={handleMenuClick}
                        />
                    )
                }

            </BtnCtnr>
        </HeaderContainer>
    )
}