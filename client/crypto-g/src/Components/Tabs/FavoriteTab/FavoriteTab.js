import {Card} from "../../common/Card/Card";
import {MyResponsiveBump} from "../../Charts/ChartNivoBamp/Bamp";
import {Surface} from "../../common/Surfaces/OrderingSurface/OrderingSurface";
import React, {useEffect, useState} from "react";
import UserRequestStore from "../../../store/userRequest/userReques.store"
import CryptoStore from "../../../store/cryptocurrency/crypto.store"
import {toJS} from "mobx";
import {WrapperLoader} from "../../common/wrapperLoader/WrapperLoader";

export const FavoriteTab = ({tabType}) => {

    const crypto_store = CryptoStore.cryptoStore

    const [favoriteList, setFavoriteList] = useState([])

    useEffect(() => {

        ( async () => {
            try {
                await UserRequestStore.getFavoritesList()

               const filtratedFavorite = toJS(crypto_store).filter(({id, data}) => {
                    const arr = toJS(UserRequestStore.userStore)
                    if (arr.includes(id)) return {id, data}
                    return false;
                } )
                setFavoriteList(filtratedFavorite)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [tabType])

    console.log("Crypto store", toJS(crypto_store))

    console.log("favoriteListfavoriteList", favoriteList)
    return (
        <Surface
            wrapping={true}
        >
            <WrapperLoader
                data={favoriteList}
                children={
                    favoriteList.map(({id, data}) => {
                        return (
                            <Card
                                cryptoName={id}
                                key={id}
                            >
                                <MyResponsiveBump data={[{id, data}]}/>
                            </Card>
                        )
                    })
                }
            />

        </Surface>
    )

}