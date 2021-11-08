import React, {useEffect, useState} from "react";
import {Header} from "../../Components/Header/Header";
import {UserPageCnt} from "./userPage.style";
import {renderTabFactory} from "./UserPageTabFactory";
import {structureMenu} from "../../Components/Header/structureMenu";
import CryptoStore from "../../store/cryptocurrency/crypto.store";
import {toJS} from "mobx";

export const UserPage = () => {
    const crypto_storeUserPage = toJS(CryptoStore.cryptoStore)

    const [userViewType, setUserViewType] = useState('Top Chart')

    const handleViewOpen = (labelBtn) => {
        setUserViewType(labelBtn)
    }

    useEffect(() => {
        ( async () => {
            try {
                await CryptoStore.pingCrypto()
            } catch (err) {
                console.log(err)
            }
        })()

    }, [crypto_storeUserPage])

    const render = renderTabFactory({key: userViewType === structureMenu.logout ? structureMenu.topChart : userViewType})

    return (
        <UserPageCnt>
            <Header
                viewClick={handleViewOpen}
                viewContent={userViewType}
            />
            {render}
        </UserPageCnt>
    )
}