import React, {useEffect, useState} from "react";
import {Glassbtn} from "../common/Buttons/Glassbutton/Glassbutton";
import {Logo} from "../common/Logo/Logo";
import {BtnCtnr, HeaderContainer} from "./header.style";
import {colors} from "../../styles-common/common.style";
import {ModalWindow} from "../Modal/Modal";
import {ToggleFormTemplate} from "../ToggleFormTemplate/ToggleFormTemplate";
import {structureMenu} from "./structureMenu"
import {ButtonsGroup} from "../common/Buttons/ButtonsGrup/ButtonsGroup";
import LogInStore from "../../store/logIn/logIn.store"
import RegistrationStore from "../../store/register/registration.store"
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
        LogInStore.serverResponse.email && setToggle(false)
    }, [LogInStore.serverResponse.email])

    console.log(LogInStore.serverResponse.email)

    return (
        <HeaderContainer>
            <Logo/>
            <BtnCtnr>
                {(!LogInStore.serverResponse.email) ?
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