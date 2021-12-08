import React, {useEffect, useState} from "react";
import {
    CardCnt,
    CardGraph,
    CryptoName,
    HeaderCard,
    StarContainer,
    CurrensyBox
} from './card.style';
import GlobalStore from "../../../store/GlobalStore/global.store"
import ModalStore from "../../../store/modalWindow/modal.store"
import UserRequestStore from "../../../store/userRequest/userReques.store"
import {structureMenu} from "../../Header/structureMenu";

export const Card = ({children, cryptoName, width, pageType, height}) => {

    const arrFavorites = UserRequestStore.userFavoriteStore
    const isLogIn = GlobalStore.globalStorageForAuth.nickName
    const isLogInUser = GlobalStore.globalStorageForAuth
    const [favoriteToggle, setFavoriteToggle] = useState(false)

    useEffect(() => {
        arrFavorites.map(item => (item === cryptoName) && setFavoriteToggle(true))
    }, [pageType])

    useEffect(() => {
        if (!isLogIn) setFavoriteToggle(false)
    }, [isLogIn])

    const handleFavoriteOnOff = async () => {
        if (isLogInUser?.nickName) {
            if (!favoriteToggle) await UserRequestStore.setFavoriteCrypto({cryptoName})
            if (favoriteToggle) await UserRequestStore.deleteFavoriteCrypto({cryptoName})
            favoriteToggle ? setFavoriteToggle(false) : setFavoriteToggle(true)
        } else {
            ModalStore.openModal()
        }
    }

    const isEnableStar = () => {
        switch (pageType) {
            case structureMenu.favor:
                return <StarContainer title="Add to favorite" favoriteAdd={true} />
            case structureMenu.topChart:
                return null
            default:
            return <StarContainer title="Add to favorite" onClick={handleFavoriteOnOff} favoriteAdd={favoriteToggle} />
        }
    }

    return (
        <CardCnt
            widthCard={width}
        >
            <HeaderCard>
                <CurrensyBox>USD</CurrensyBox>
                <CryptoName>{cryptoName}</CryptoName>
                {isEnableStar()}
            </HeaderCard>
            <CardGraph
                heightCard={height}
            >
                {children}
            </CardGraph>
        </CardCnt>
    )
}