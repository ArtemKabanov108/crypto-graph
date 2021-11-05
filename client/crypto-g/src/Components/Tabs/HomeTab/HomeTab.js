import React from "react";
import {Card} from "../../common/Card/Card";
import {MyResponsiveBump} from "../../Charts/ChartNivoBamp/Bamp";
import {Surface} from "../../common/Surfaces/OrderingSurface/OrderingSurface";
import CryptoStore from "../../../store/cryptocurrency/crypto.store"


export const HomeTab = () => {
const cryptoArrForHome = CryptoStore.cryptoStore
    return (
        <Surface
            wrapping={true}
        >
            {cryptoArrForHome.map((item) => {
                return (
                    <Card
                        cryptoName={item.id}
                        key={item.id}
                    >
                        <MyResponsiveBump data={[item]}/>
                    </Card>
                )
            })}
        </Surface>
    )

}