import React, {useEffect, useState} from "react";
import {Glassbtn} from "../common/Buttons/Glassbutton/Glassbutton";
import {Logo} from "../common/Logo/Logo";
import {BtnCtnr, HeaderContainer} from "./header.style";
import {colors} from "../../styles-common/common.style";
import {ModalWindow} from "../Modal/Modal";
import {ToggleFormTemplate} from "../ToggleFormTemplate/ToggleFormTemplate";
import {structureMenu} from "./structureMenu"
import {ButtonsGroup} from "../common/Buttons/ButtonsGrup/ButtonsGroup";
import AuthStore from "../../store/authentication/auth.store"
import {observer} from "mobx-react-lite";

export const Header = observer(({viewClick}) => {

    const [toggleState, setToggle] = useState(false)

    const handleOpenModal = () => {
        setToggle(true)
    }

    const handleCloseModal = () => {
        setToggle(false)
    }

    useEffect(() => {
        AuthStore.serverResponse.email && setToggle(false)
    }, [AuthStore.serverResponse.email])

    console.log(AuthStore.serverResponse)

    return (
        <HeaderContainer>
            <Logo/>
            <BtnCtnr>
                {(!AuthStore.serverResponse.email) ?
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
                            menuClick={viewClick}
                        />
                    )
                }

            </BtnCtnr>
        </HeaderContainer>
    )
})