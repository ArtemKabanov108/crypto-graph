import React, {useEffect } from "react";
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
import ModalStore from "../../store/modalWindow/modal.store"

export const Header = observer(({viewClick, viewContent}) => {

    useEffect(() => {
        (viewContent === structureMenu.logout) && AuthStore.handleLogOutUser();
    }, [viewContent])

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
                                handleClick={ModalStore.openModal}
                                fontSize={'1.2'}
                            />
                            <ModalWindow
                                toggle={ModalStore.toggleState}
                                closeModal={ModalStore.closeModal}
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