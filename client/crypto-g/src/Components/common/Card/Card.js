import React, {useState} from "react";
import {
    CardCnt,
    CardGraph,
    CryptoName,
    HeaderCard,
    StarContainer
} from './card.style';
import GlobalStore from "../../../store/GlobalStore/global.store"
import ModalStore from "../../../store/modalWindow/modal.store"
import UserStore from "../../../store/userRequest/userReques.store"

export const Card = ({children, cryptoName, cryptoId, width, height}) => {

    const isLogInUser = GlobalStore.globalStorageForAuth

    const [favoriteToggle, setFavoriteToggle] = useState(false)

    const handleFavoriteOnOff = async () => {
        if (isLogInUser?.nickName) {
            await UserStore.setFavorite({cryptoName, cryptoId})
            favoriteToggle ? (setFavoriteToggle(false)) : (setFavoriteToggle(true))
        } else {
            ModalStore.openModal()
        }
    }

    return (
        <CardCnt
            widthCard={width}
        >
            <HeaderCard>
                <div/>
                <CryptoName>{cryptoName}</CryptoName>
                {cryptoName &&
                    <StarContainer
                        title="Add to favorite"
                        onClick={handleFavoriteOnOff}
                        favoriteAdd={favoriteToggle}
                    />
                }

            </HeaderCard>
            <CardGraph
                heightCard={height}
            >
                {children}
            </CardGraph>
        </CardCnt>
    )
}