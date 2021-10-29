import {Card} from "../../common/Card/Card";
import {MyResponsiveBump} from "../../Charts/ChartNivoBamp/Bamp";
import {arr} from "../../../pages/mainPage/mainPage";
import {Surface} from "../../common/Surfaces/OrderingSurface/OrderingSurface";
import React, {useEffect, useState} from "react";
import UserRequestStore from "../../../store/userRequest/userReques.store"

export const FavoriteTab = ({tabType}) => {

    const [favoriteList, setFavoriteList] = useState({})

    useEffect(() => {
        UserRequestStore.getFavoritesList().then(data=> setFavoriteList(data))
        // setFavoriteList(listFavorites)
        console.log("ALERT!!!")

    }, [tabType])
    console.log(favoriteList)
    return (
        <Surface
            wrapping={true}
        >
            {favoriteList.watchlist?.length && favoriteList.watchlist.map( name => (
                <Card
                cryptoName={name}
                >
                <MyResponsiveBump data={arr}/>
                </Card>
            ) ) }

        </Surface>
    )

}