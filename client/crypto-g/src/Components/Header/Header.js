import React, {useEffect, useState} from "react";
import {Glassbtn} from "../common/Buttons/Glassbutton/Glassbutton";
import {Logo} from "../common/Logo/Logo";
import {BtnCtnr, HeaderContainer} from "./header.style";
import {colors} from "../../styles-common/common.style";
import {ModalWindow} from "../Modal/Modal";
import {ToggleFormTemplate} from "../ToggleFormTemplate/ToggleFormTemplate";
import {structureMenu, structureMenuValuesList} from "./structureMenu"
import {ButtonsGroup} from "../common/Buttons/ButtonsGrup/ButtonsGroup";
import GlobalStore from "../../store/GlobalStore/global.store"
import AuthStore from "../../store/authentication/auth.store"
import {observer} from "mobx-react-lite";

export const Header = observer(({viewClick, userHandleClick}) => {
    const [toggleState, setToggle] = useState(false)

    const handleOpenModal = () => {
        setToggle(true)
    }

    const handleCloseModal = () => {
        setToggle(false)
    }

    useEffect(() => {
        (userHandleClick?.view === structureMenu.logout) && AuthStore.handleLogOutUser();
    }, [userHandleClick])

    useEffect(() => {
        GlobalStore.globalStorageForAuth.nickName && setToggle(false)
    }, [GlobalStore.globalStorageForAuth.nickName])

    return (
        <HeaderContainer>
            <Logo/>
            <BtnCtnr>
                {(!GlobalStore.globalStorageForAuth.nickName) ?
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
                            labelsList={structureMenuValuesList}
                            menuClick={viewClick}
                        />
                    )
                }

            </BtnCtnr>
        </HeaderContainer>
    )
})