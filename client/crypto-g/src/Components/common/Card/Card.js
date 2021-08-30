import React, {useState} from "react";
import {
    CardCnt,
    CardGraph, CryptoName,
    HeaderCard,
    StarContainer
} from './card.style';

export const Card = ({children, cryptoName, width, height}) => {
    const [favoriteToggle, setFavoriteToggle] = useState(false)
    const handleFavoriteOnOff = () => favoriteToggle ? (setFavoriteToggle(false)) : (setFavoriteToggle(true))
    return (
        <CardCnt
            widthCard={width}
        >
            <HeaderCard>
                <div/>
                <CryptoName>{cryptoName}</CryptoName>
                <StarContainer
                    title="Add to favorite"
                    onClick={handleFavoriteOnOff}
                    favoriteAdd={favoriteToggle}
                />
            </HeaderCard>
            <CardGraph
                heightCard={height}
            >
                {children}
            </CardGraph>
        </CardCnt>
    )
}